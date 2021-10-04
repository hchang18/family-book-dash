import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';


import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    console.log(post);
    const classes = useStyles();
    const [comments, setComments] = useState([1, 2, 3, 4]);
    // keep track of the value in the textfield so
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('user')); // populate the current user from localStorage
    const dispatch = useDispatch(); 


    const handleClick = () => {
        const finalComment = `${user.result.name}: ${comment}`;
        // keep track of who wrote it and whom it belongs top
        // that's why we pass in two params (finalComments and post._id)
        dispatchEvent(commentPost(finalComment, post._id));
    }


    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {/* c for comment and i for index */}
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            comment {i}
                        </Typography>
                    ))}
                </div>
                <div style={{width: '70%'}}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        variant="outlined"
                        label="Comment"
                        multipline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={ handleClick} >
                        Comment
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;