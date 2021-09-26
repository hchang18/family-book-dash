import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Avatar} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import shell from '../../images/shell.jpg'; //https://www.123rf.com/photo_89105310_flat-design-simple-icon-snail-shell-vector-illustration.html
import familybookText from '../../images/familybookText.png'; //https://www.coolgenerator.com/png-text-generator

const Navbar = () => {

    const classes = useStyles(); 
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation(); 

    // even after logout, profile info still resides in localStorage
    // have to implement additional code in dispatch
    // how? go to reducer, go to case 'LOGOUT' and clear the local storage
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    };

    // when location changes, refresh the page 
    useEffect(() => {
        
        const token = user?.token;
        // check for JWT
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={ classes.brandContainer}>
                {/* <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Familybook</Typography> */}
                <img src={familybookText} alt="icon" align="bottom" height="70px" />
                <img src={shell} alt="icon" height="60px"/>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={ classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}></Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={ logout }>Logout</Button>
                    </div>
                ): (
                    <Button component={ Link } to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
