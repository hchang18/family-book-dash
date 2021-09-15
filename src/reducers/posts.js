import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes';
/* eslint-disable import/no-anonymous-default-export */

// function reducer takes in state and action
// state always has to be assigned something
// that is why we put posts = [] in place of state
// just export default the function
// since we don't have to use it here
export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
            // if post id is the same as payload id, return updated post,
            // else just return the original
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return posts.filter((post) => post._id !== action.payload)
        default:
            return posts;
    } 
}