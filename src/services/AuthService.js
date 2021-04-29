import axios from './axios';
import catchAsync from '../utils/catchAsync';

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
}

export default new AuthService();
