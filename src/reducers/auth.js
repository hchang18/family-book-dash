import { AUTH, LOGOUT } from '../constants/actionTypes';
/* eslint-disable import/no-anonymous-default-export */


/**
 * authReducer accepts state and action 
 * switch case looks for action.type like AUTH or LOGOUT
 * we get all the details in action.data from Auth.js 
 * we always have to return something, so return state 
 * right now, state is not defined, authData is set to null
 * 
 * when we sign in, it is going to return some data
 * we should save it in the local storage so that browser 
 * still knows that you logged in.
 */
const authReducer = (state = { authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            // console.log(action?.data);
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            // we are going to use this profile somewhere
            // and the best place is Navbar user
            return { ...state, authData: action.data };
        
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;