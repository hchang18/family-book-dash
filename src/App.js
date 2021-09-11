import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';
import familybook from './images/familybook.png';

const App = () => {

    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch(); // we have to find out where to dispatch the action

    // clearing the input means changing currentId in Form.js
    // upon any change in currentId, it's going to dispatch getPosts in action
    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    
    return (
        <Container maxwidth="lg">
            <AppBar className={ classes.appBar} position="static" color="inherit">
                <Typography variant="h2" align="center">Family
                    <img className={classes.image} src={ familybook } alt="Family Book" height="60" />
                </Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={ classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={ setCurrentId }/>
                        </Grid>
                        <Grid item xs={12} sm={ 4 }>
                            <Form currentId={currentId} setCurrentId={ setCurrentId }/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;