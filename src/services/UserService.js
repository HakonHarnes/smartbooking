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

    deleteUser = async id => {
        const response = await axios.delete(`/users/${id}`);
        return response.data;
    };

    getUsersByCustomer = async id => {
        const response = await axios.get(`/users?customer_id=${id}`);
        return response.data;
    };

    updateUser = async user => {
        const response = await axios.put(`/users/${user.user_id}`, {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            isActive: user.is_active
        });
        return response.data;
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
