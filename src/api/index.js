import axios from 'axios';

// local development
// const API = axios.create({ baseURL: 'http://localhost:5000' });

const API = axios.create({ baseURL: 'https://family-book-app.herokuapp.com/' });

// adding something specific to each one of the request
// it happens before all the things below
// we are sending token to middleware in the backend that checks if the person is logged in
// refer to middleware > auth.js in backend
API.interceptors.request.use((req) => {
    // with this, our backend will be able to get this specific header
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req; 
});

// after deployment
// const url = 'https://family-book-app.herokuapp.com/posts';

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);