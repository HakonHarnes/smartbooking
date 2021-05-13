import axios from './axios';
import catchAsync from '../utils/catchAsync';

import { ROOMS } from '../data/dummy-data';

class RoomService {
    getRoom = catchAsync(async id => {
        const response = await axios.get(`/rooms/${id}`);
        return response.data;
    });

    getAvaliableRooms = catchAsync(async (organization_id, start, end, building_id) => {
        const buildingQuery = building_id ? `&building_id=${building_id}` : '';
        const response = await axios.get(
            `/rooms/search?organization_id=${organization_id}&start=${start}&end=${end}${buildingQuery}`
        );
        return response.data;
    });

    getRooms = catchAsync(async id => {
        const response = await axios.get(`/rooms?organization_id=${id}`);
        return response.data;
    });

    getRoomsInBuilding = catchAsync(async id => {
        //const response = await axios.get(`/rooms?building_id=${id}`);
        console.log(id);
        const response = { data: ROOMS };
        return response.data;
    });

    createRoom = catchAsync(async ({ room_name, size, is_active, organization_id, building_id }) => {
        const response = await axios.post('/rooms', {
            name: room_name,
            size,
            is_active,
            organization_id,
            building_id
        });
        return response.data;
    });

    createRooms = catchAsync(async values => {
        console.log(values);
        const response = await axios.post('/rooms', {
            values
        });
        return response.data;
    });

    updateRoom = catchAsync(async ({ room_name, building_id, size, is_active, user_id, room_id }) => {
        const response = await axios.put(`/rooms/${room_id}`, {
            name: room_name,
            size,
            is_active,
            user_id,
            building_id
        });
        return response.data;
    });

    deleteRoom = catchAsync(async id => {
        const response = await axios.delete(`/rooms/${id}`);
        return response.data;
    });
}

export default new RoomService();
