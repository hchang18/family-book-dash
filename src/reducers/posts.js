import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes';
/* eslint-disable import/no-anonymous-default-export */

// function reducer takes in state and action
// state always has to be assigned something
// that is why we put posts = [] in place of state
// just export default the function
// since we don't have to use it here
export default (state = [], action) => {
    switch (action.type) {
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
        case CREATE:
            return [...state, action.payload];
        case UPDATE:
            // if post id is the same as payload id, return updated post,
            // else just return the original
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case LIKE:
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return state.filter((post) => post._id !== action.payload)
        default:
            return state;
    } 
}