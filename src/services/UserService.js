import axios from './axios';
import catchAsync from '../utils/catchAsync';

class UserService {
    login = catchAsync(async (email, password) => {
        const response = await axios.post(
            '/users/login',
            {
                data: { email, password }
            },
            { withCredentials: true }
        );

        return response;
    });

    logout = catchAsync(async () => {
        const response = await axios.get('/users/logout', { withCredentials: true });

        return response;
    });

    getLoggedInUser = catchAsync(async () => {
        const response = await axios.get('/users/loggedin', { withCredentials: true });

        return response;
    });

    getUserFromResetToken = catchAsync(async resetToken => {
        const response = await axios.get(`/users?resetToken=${resetToken}`);

        return response;
    });

    register = catchAsync(async (email, password, firstName, lastName, isActive, role) => {
        const user = { email, password, firstName, lastName, isActive, role };

        const response = await axios.post('/users', {
            data: user
        });

        return response;
    });

    forgotPassword = catchAsync(async email => {
        const response = await axios.post('/users/forgotPassword', {
            data: { email }
        });

        return response;
    });

    resetPassword = catchAsync(async (password, token) => {
        const response = await axios.patch(`/users/resetPassword/${token}`, {
            data: { password }
        });

        return response;
    });
}

export default new UserService();
