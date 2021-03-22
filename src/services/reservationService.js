import axios from './axios';

class reservationService {
    getById = async id => {
        const response = await axios.get('/reservations/' + id);
        return response.data;
    };

    getReservationUser = async id => {
        const response = await axios.get('/reservations?userId=' + id);
        return response.data;
    };

    getReservationRoom = async id => {
        const response = await axios.get('/reservations?roomId=' + id);
        return response.data;
    };

    create = async (startTime, endTime, roomId, userId) => {
        const response = await axios.post('/reservations', {
            data: { startTime, endTime, userId, roomId }
        });
        return response.data;
    };

    update = async (startTime, endTime, roomId, userId, resId) => {
        const response = await axios.put('/reservations', {
            data: { startTime, endTime, userId, roomId, resId }
        });
        return response.data;
    };

    delete = async id => {
        const response = await axios.delete('/reservations/' + id);
        return response.data;
    };
}

export default new reservationService();
