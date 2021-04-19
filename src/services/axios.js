import axios from 'axios';

// const url = 'https://smartbooking-api.herokuapp.com';
const url = 'http://localhost:3000';
const api = '/api';

export default axios.create({
    baseURL: `${url}${api}`
});
