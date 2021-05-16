import catchAsync from '../utils/catchAsync';
import store from '../store';
import axios from './axios';

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
