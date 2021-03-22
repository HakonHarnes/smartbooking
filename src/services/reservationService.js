import axios from './axios';

class reservationService {
    getById = async id => {
        const response = await axios.get('/reservations/' + id);
        return response;
    };

    getReservationUser = async id => {
        const response = await axios.get('/reservations?userId=' + id);
        return response;
    };

    getReservationRoom = async id => {
        const response = await axios.get('/reservations?roomId=' + id);
        return response;
    };

    create = async (startTime, endTime, roomId, userId) => {
        const response = await axios.post('/reservations', {
            data: { startTime, endTime, userId, roomId }
        });
        return response;
    };

    update = async (startTime, endTime, roomId, userId, resId) => {
        const response = await axios.put('/reservations', {
            data: { startTime, endTime, userId, roomId, resId }
        });
        return response;
    };

    delete = async id => {
        const response = await axios.delete('/reservations/' + id);
        return response;
    };
}

export default new reservationService();
