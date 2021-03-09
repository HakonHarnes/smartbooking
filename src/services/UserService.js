import axios from './axios';
import User from '../classes/User';

class UserService {
    login = async (email, password) => {
        const user = new User(email, password);

        const response = await axios.post('/users/login', {
            data: user
        });

        return response;
    };

    register = async (email, password, firstName, lastName, isActive, role) => {
        const user = new User(email, password, firstName, lastName, isActive, role);

        const response = await axios.post('/users', {
            data: user
        });

        return response;
    };
}

export default new UserService();
