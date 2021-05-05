import catchAsync from '../utils/catchAsync';
import jwt_decode from 'jwt-decode';
import router from '../router';
import store from '../store';
import axios from './axios';

// Checks if access token has expired before making a request.
// If it has, try to get a new access token with the refresh token
axios.interceptors.request.use(async config => {
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

class AuthService {
    refresh = catchAsync(async () => {
        return await axios.post('/refresh', {}, { withCredentials: true });
    });

    login = catchAsync(async (email, password) => {
        return await axios.post(
            '/login',
            {
                data: { email, password }
            },
            { withCredentials: true }
        );
    });

    logout = catchAsync(async () => {
        return await axios.get('/logout', { withCredentials: true });
    });

    forgotPassword = catchAsync(async email => {
        return await axios.post('/forgot-password', {
            data: { email }
        });
    });

    resetPassword = catchAsync(async (newPassword, resetToken) => {
        return await axios.patch(`/reset-password/${resetToken}`, {
            data: { newPassword }
        });
    });

    updatePassword = catchAsync(async (oldPassword, newPassword) => {
        return await axios.patch(
            '/update-password',
            {
                data: { oldPassword, newPassword }
            },
            { withCredentials: true }
        );
    });

    verify = catchAsync(async code => {
        return await axios.post(
            '/verify',
            {
                data: { code }
            },
            {
                withCredentials: true,
                headers: { Authorization: `Bearer ${store.getters['auth/verificationToken']}` }
            }
        );
    });

    enableTwoFactorAuth = catchAsync(async twoFactorMethod => {
        return await axios.patch('/enable-two-factor', {
            data: { twoFactorMethod }
        });
    });

    disableTwoFactorAuth = catchAsync(async () => {
        return await axios.patch('/disable-two-factor');
    });
}

export default new AuthService();
