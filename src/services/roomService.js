import axios from './axios';
import catchAsync from '../utils/catchAsync';

import { ROOMS } from '../data/dummy-data';

class RoomService {
    getById = catchAsync(async id => {
        const response = await axios.get('/rooms/' + id);
        return response.data;
    });

    getAvaliableRooms = catchAsync(async (start, end) => {
        const response = await axios.get(`/rooms/search?start=${start}&end=${end}`);
        return response.data;
    });

    getAvaliableRoomsGivenBuilding = catchAsync(async (start, end, building_id) => {
        const response = await axios.get(
            '/rooms/search?start=' + start + '&end=' + end + '&building_id=' + building_id
        );
        return response.data;
    });

    getRooms = catchAsync(async id => {
        const response = await axios.get(`/rooms?customer_id=${id}`);
        return response.data;
    });

    getRoomsInBuilding = catchAsync(async id => {
        console.log(id);
        //const response = await axios.get(`/rooms?building_id=${id}`);
        const response = { data: ROOMS };
        return response.data;
    });

    create = catchAsync(async (name, size, isActive, user_id, building_id) => {
        const response = await axios.post('/rooms', {
            data: { name, size, isActive, user_id, building_id }
        });
        return response.data;
    });

    update = catchAsync(async (name, size, isActive, user_id, building_id, id) => {
        const response = await axios.put('/rooms', {
            data: { name, size, isActive, user_id, building_id, id }
        });
        return response.data;
    });

    delete = catchAsync(async id => {
        const response = await axios.delete('/rooms/' + id);
        return response.data;
    });
}

export default new RoomService();
