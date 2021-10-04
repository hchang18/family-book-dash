import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes';
/* eslint-disable import/no-anonymous-default-export */

// function reducer takes in state and action
// state always has to be assigned something
// that is why we put posts = [] in place of state
// just export default the function
// since we don't have to use it here
export default (state = { isLoading: true, posts: []}, action) => {
    switch (action.type) {

        case START_LOADING:
            return { ...state, isLoading: true }; 
        case END_LOADING:
            return { ...state, isLoading: false };
        // state is no longer just an array
        // state should contain both isLoading and posts
        
        case FETCH_ALL:
            // return action.payload;
            // now it returns object instead of payload
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        
        case FETCH_POST:
            return { ...state, post: action.payload };
        
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            // if post id is the same as payload id, return updated post,
            // else just return the original
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        
        case COMMENT:
            return {
                ...state, posts: state.posts.map((post) => {
                // for each post in posts, 
                // change the post that just received a comment...
                    if (post._id === action.payload._id) {
                        return action.payload; // changed post
                    }
                // return all the other posts normally
                    return post; 
            })};
        
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    } 
}