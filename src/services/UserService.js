import axios from './axios';

class UserService {
    getUsers = async token => {
        const response = await axios.get('/users', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response;
    };

    getUser = async token => {
        const response = await axios.get('/users/:id', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response;
    };
}

export default new UserService();
