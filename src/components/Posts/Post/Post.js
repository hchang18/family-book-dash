import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom'; // used to navigate to some place

import { deletePost, likePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(post?.likes);

    // simplify the code and make it more readable
    // by creating commonly used variable or replace long line with variable
    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = likes.find((like) => like === userId);

    // why would it be faster likes on front end?
    // updating database is asynchronous, and it takes time
    const handleLike = async () => {
        dispatch(likePost(post._id));

        // did the current user like the post?
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
        }
    };
    
    // 1 like, 2 likes
    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };
    
    const openPost = () => {
        // navigate to specific URL
        history.push(`posts/${post._id}`);
    };

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase component="span" className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile} title={ post.title}/>
                <div className={ classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{ moment(post.createdAt).fromNow()}</Typography>
                </div>
           
                <div className={ classes.details}>
                    <Typography variant="body2" color="textSecondary">
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                {/* like button */}
                <Button size="small" color="primary" disabled={ !user?.result } onClick={handleLike }>
                    <Likes />
                </Button>

                {/* edit button */}
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        {/* 
                        keep track of the current id of the post for edit, 
                        to do that, we have to go back up to Posts and to App 
                        because we have to share that state of current id with Form and Posts
                        App is the only component where Form and Posts exist together
                        */}
                        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
                            <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>
                )}

                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id, history)) }>
                        <DeleteIcon fontSize="small" /> Delete
                    </Button>
                )}

            </CardActions>
        </Card>
    );
}

export default Post;