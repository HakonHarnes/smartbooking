import axios from './axios';
import catchAsync from '../utils/catchAsync';

import { BUILDINGS } from '../data/dummy-data';

class BuildingsService {
    getBuilding = catchAsync(async id => {
        //const response = await axios.get(`/buildings/${id}`);
        console.log(id);
        const response = { data: BUILDINGS };
        return response.data;
    });

    create = catchAsync(async (buildingName, userId) => {
        const response = await axios.post('/buildings', {
            data: { buildingName, userId }
        });
        return response.data;
    });

    update = catchAsync(async (buildingName, userId, buildingId) => {
        const response = await axios.put('/buildings', {
            data: { buildingName, userId, buildingId }
        });
        return response.data;
    });

    delete = catchAsync(async id => {
        const response = await axios.delete('/buildings/' + id);
        return response.data;
    });
}

export default new BuildingsService();
