import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';


// GET THE CURRENT ID
// once we click the three dot buttons on the card, 
// we need to passover the id of that specific post to the form. 

const Form = ({ currentId, setCurrentId}) => {

    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })
    // fetch the data from redux
    // as a parameter of the call-back fucntion inside useSelector
    // you have access to whole global redux store or state
    // immediately return state.posts
    // how do you know it's .posts? 
    // go to reducer -> index.js -> we have combineReducers {{ posts }}
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch(); 

    // use useEffect to populate relevant post to update
    // parameters: callback function, dependency array
    // dependency arry: on what changes should callback function runs
    // e.g. when post value changes from nothing to actual post, then we want to run this function
    useEffect(() => {
        if (post) setPostData(post);
    }, [post])




    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }

        clear();

    }

    const clear = () => {
        setCurrentId(null); // set current id to null
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={ handleSubmit }>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    // it would overwrite everything and simply have creator
                    // spread the post data -> how you do it? ...postData
                    // ...postData means all the data will persist, only the relevant field would change
                    onChange={(e) => setPostData({...postData, creator: e.target.value})}
                />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={ clear } fullWidth>Clear</Button>
            </form>

        </Paper>
    );
}

export default Form;