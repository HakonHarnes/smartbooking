import axios from './axios';
import catchAsync from '../utils/catchAsync';

class reservationService {
    getById = catchAsync(async id => {
        const response = await axios.get('/reservations/' + id);
        return response.data;
    });

    getReservationUser = catchAsync(async id => {
        const response = await axios.get('/reservations?userId=' + id);
        return response.data;
    });

    getReservationRoom = catchAsync(async id => {
        const response = await axios.get('/reservations?roomId=' + id);
        return response.data;
    });

    create = catchAsync(async (startTime, endTime, roomId, userId) => {
        const response = await axios.post('/reservations', {
            data: { startTime, endTime, userId, roomId }
        });
        return response.data;
    });

    update = catchAsync(async (startTime, endTime, roomId, userId, resId) => {
        const response = await axios.put('/reservations', {
            data: { startTime, endTime, userId, roomId, resId }
        });
        return response.data;
    });

    delete = catchAsync(async id => {
        const response = await axios.delete('/reservations/' + id);
        return response.data;
    });
}

export default new reservationService();
