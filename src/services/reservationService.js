import axios from './axios';
import catchAsync from '../utils/catchAsync';

class ReservationService {
    getById = catchAsync(async id => {
        const response = await axios.get('/reservations/' + id);
        return response.data;
    });

    getReservationsByUserId = catchAsync(async id => {
        const response = await axios.get('/reservations?user_id=' + id);
        console.log(response);
        return response.data;
    });

    getReservationsByRoomAndTime = catchAsync(async (id, start, end) => {
        const response = await axios.get(`/reservations?room_id=${id}&start=${start}&end=${end}`);
        return response.data;
    });

    createReservation = catchAsync(async ({ start, end, room_id, user_id }) => {
        const response = await axios.post('/reservations', {
            data: { start, end, user_id, room_id }
        });
        return response.data;
    });

    update = catchAsync(async (start, end, room_id, user_id, reservation_id) => {
        const response = await axios.put('/reservations', {
            data: { start, end, user_id, room_id, reservation_id }
        });
        return response.data;
    });

    deleteReservation = catchAsync(async id => {
        const response = await axios.delete(`/reservations/${id}`);
        return response.data;
    });
}

export default new ReservationService();
