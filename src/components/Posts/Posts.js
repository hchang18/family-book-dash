import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
// have to fetch the data from global redux store
// use selector

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {

    // as a parameter of the call-back fucntion inside useSelector
    // you have access to whole global redux store or state
    // immediately return state.posts
    // how do you know it's .posts? 
    // go to reducer -> index.js -> we have combineReducers {{ posts }}

    // const posts = useSelector((state) => state.posts);

    // before we simply have array of posts, but now we have an object 
    // where we have property called posts inside the object that

    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();
    
    // console.log(posts);

    if (!posts.length && !isLoading) return 'No posts';

    return (
        
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={ 3 }>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                        <Post post={post} setCurrentId={ setCurrentId }/>
                    </Grid>
                ))}
            </Grid>
        )

        // if there is no posts, cirdular loading
        // else, display posts
        // !posts?.length ? <CircularProgress /> : (
        //     <Grid className={classes.container} container alignItems="stretch" spacing={ 3 }>
        //         {posts.map((post) => (
        //             <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
        //                 <Post post={post} setCurrentId={ setCurrentId }/>
        //             </Grid>
        //         ))}
        //     </Grid>
        // )
    );
}

export default Posts;