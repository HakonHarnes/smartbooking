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

    register = catchAsync(async (email, password, firstName, lastName, isActive, role) => {
        const user = { email, password, firstName, lastName, isActive, role };

        const response = await axios.post('/users', {
            data: user
        });

        return response;
    });
}

export default new UserService();
