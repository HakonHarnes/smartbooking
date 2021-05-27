import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from '../store';

import router from '../router';

// const url = 'https://smartbooking-api.herokuapp.com';
// const url = 'http://localhost:3000';
const url = process.env.VUE_APP_SERVER_LINK;
const api = '/api';

const axiosInstance = axios.create({
    baseURL: `${url}${api}`
});

// Checks if access token has expired before making a request.
// If it has, try to get a new access token with the refresh token
axiosInstance.interceptors.request.use(async config => {
    if (config.headers.Authorization) return config;

    let accessToken = store.getters['auth/accessToken'];

    if (accessToken && !config.url.includes('refresh')) {
        const payload = jwt_decode(accessToken);
        if (Date.now() > payload.exp * 1000) await store.dispatch('auth/refresh');

        accessToken = store.getters['auth/accessToken'];

        if (!accessToken) router.push('/login');
        else config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

export default axiosInstance;
