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

    sendVerificationToken = catchAsync(async () => {
        const response = await axios.get('/users/sendVerification', { withCredentials: true });

        return response;
    });

    verifyVerificationToken = catchAsync(async token => {
        const response = await axios.post(
            '/users/verify',
            {
                data: { token }
            },
            { withCredentials: true }
        );

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

    deleteUser = catchAsync(async id => {
        const response = await axios.delete(`/users/${id}`);
        return response.data;
    });

    getUsersByCustomer = catchAsync(async id => {
        const response = await axios.get(`/users?customer_id=${id}`);
        return response.data;
    });

    updateUser = catchAsync(async user => {
        const response = await axios.put(`/users/${user.user_id}`, {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            isActive: user.is_active
        });
        return response.data;
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
