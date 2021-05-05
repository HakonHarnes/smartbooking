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

    getUsersByOrganization = catchAsync(async id => {
        const response = await axios.get(`/users?organization_id=${id}`);
        return response.data;
    });

    updateUser = catchAsync(async ({ first_name, last_name, email, is_active, user_id }) => {
        const response = await axios.put(`/users/${user_id}`, {
            firstName: first_name,
            lastName: last_name,
            email,
            isActive: is_active
        });
        return response.data;
    });

    register = catchAsync(async ({ first_name, last_name, email, role = 'user', organization_id }) => {
        const response = await axios.post('/register', {
            data: {
                firstName: first_name,
                lastName: last_name,
                email,
                role,
                organization_id
            }
        });

        return response.data;
    });

    forgotPassword = catchAsync(async email => {
        const response = await axios.post('/forgotPassword', {
            data: { email }
        });

        return response;
    });

    resetPassword = catchAsync(async (password, token) => {
        const response = await axios.patch(`/resetPassword/${token}`, {
            data: { password }
        });

        return response;
    });
}

export default new UserService();
