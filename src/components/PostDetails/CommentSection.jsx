import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';


import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    console.log(post);
    const classes = useStyles();
    // const [comments, setComments] = useState([1, 2, 3, 4]);
    const [comments, setComments] = useState(post?.comments);
    // keep track of the value in the textfield so
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile')); // populate the current user from localStorage
    const dispatch = useDispatch(); 
    const commentsRef = useRef(); // create specific reference that we will going to hook on specific element


    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        // keep track of who wrote it and whom it belongs top
        // that's why we pass in two params (finalComments and post._id)
        // dispatch(commentPost(finalComment, post._id));
        
        // since commentPost in actions returns data.comments
        // we can make use of it to immediately update the post
        // change it to async function
        const newComments = await dispatch(commentPost(finalComment, post._id));
        // update comment section with newest comments
        setComments(newComments);
        // clear out the comment section
        setComment('');

        // functionality to scroll down so that we see the
        // latest comment
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }


    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {/* c for comment and i for index */}
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}</strong>
                            { c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={ commentsRef }/> 
                </div>
                {/* if not logged in don't show this part at all
                to avoid the error of null user */}
                { /* ? does not let the program throw an arrow if it's null */}
                { user?.result?.name && (
                    <div style={{ width: '70%' }}>
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
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick} >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;