import axios from './axios';

class reservationService {
    getById = async id => {
        const response = await axios.get('/rooms/' + id);
        return response.data;
    };

    getRoomsCustomer = async id => {
        const response = await axios.get('/rooms?customerId=' + id);
        return response.data;
    };

    create = async (name, size, isActive, userId, buildingId) => {
        const response = await axios.post('/rooms', {
            data: { name, size, isActive, userId, buildingId }
        });
        return response.data;
    };

    update = async (name, size, isActive, userId, buildingId, id) => {
        const response = await axios.put('/rooms', {
            data: { name, size, isActive, userId, buildingId, id }
        });
        return response.data;
    };

    delete = async id => {
        const response = await axios.delete('/rooms/' + id);
        return response.data;
    };
}

export default new reservationService();
