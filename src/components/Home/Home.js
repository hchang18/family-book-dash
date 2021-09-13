import React, { useState, useEffect } from 'react';
import { Grow, Container, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts } from '../../actions/posts';

const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch(); // we have to find out where to dispatch the action

    // clearing the input means changing currentId in Form.js
    // upon any change in currentId, it's going to dispatch getPosts in action
    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={ setCurrentId }/>
                    </Grid>
                    <Grid item xs={12} sm={ 4 }>
                        <Form currentId={currentId} setCurrentId={ setCurrentId }/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
