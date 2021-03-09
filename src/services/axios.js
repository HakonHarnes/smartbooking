import axios from 'axios';

const url = 'https://smartbooking-api.herokuapp.com';
const api = '/api';

export default axios.create({
    baseURL: `${url}${api}`
});
