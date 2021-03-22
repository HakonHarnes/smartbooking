import axios from './axios';
import catchAsync from '../utils/catchAsync';

class UserService {
    login = catchAsync(async (email, password) => {
        const user = { email, password };

        const response = await axios.post('/users/login', {
            data: user
        });

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
