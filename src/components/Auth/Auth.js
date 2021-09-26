import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { signin, signup } from '../../actions/auth';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmedPassword: '',
}

const Auth = () => {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch(); // hook
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        // check if we have access to all the values 
        // console.log(formData);

        if (isSignup) {
            // dispatch signup action and pass in formData and 
            // history (we can navigate once something happens)
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => {
        // make sure to spread all the other properties,
        // but only update the one you are currently on.
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)   

    const googleSuccess = (res) => {
        const result = res?.profileObj; // ?. optional chaining operator: special operator that does not throw an error even if we don't have access to res object, it will just say undefined
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            history.push('/'); // redirect to homepage 

        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try again later');
    };


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={ 3 }>
                <Avatar className={ classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign Up' : 'Sign In'} </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />                                
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={ handleChange } type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={ handleShowPassword }  />
                        {isSignup && <Input name="confirmedPassword" label="Repeat Password" handleChange={ handleChange} type="password" />}
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <GoogleLogin
                        clientId="369327495430-41m8t3md0q2t9kc0q8tmrrkqidn4s966.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"

                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={ switchMode } >
                                { isSignup ? 'Already have an account? Sign In': "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Auth;
