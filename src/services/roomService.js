import axios from './axios';
import catchAsync from '../utils/catchAsync';

class RoomService {
    getById = catchAsync(async id => {
        const response = await axios.get('/rooms/' + id);
        return response.data;
    });

    getAvaliableRooms = catchAsync(async (start, end) => {
        const response = await axios.get('/rooms/search?start=' + start + '&end=' + end);
        return response.data;
    });

    getAvaliableRoomsGivenBuilding = catchAsync(async (start, end, buildingId) => {
        const response = await axios.get('/rooms/search?start=' + start + '&end=' + end + '&buildingId=' + buildingId);
        return response.data;
    });

    getRoomsCustomer = catchAsync(async id => {
        const response = await axios.get('/rooms?customerId=' + id);
        return response.data;
    });

    create = catchAsync(async (name, size, isActive, userId, buildingId) => {
        const response = await axios.post('/rooms', {
            data: { name, size, isActive, userId, buildingId }
        });
        return response.data;
    });

    update = catchAsync(async (name, size, isActive, userId, buildingId, id) => {
        const response = await axios.put('/rooms', {
            data: { name, size, isActive, userId, buildingId, id }
        });
        return response.data;
    });

    delete = catchAsync(async id => {
        const response = await axios.delete('/rooms/' + id);
        return response.data;
    });
}

export default new RoomService();
