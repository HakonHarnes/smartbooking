import axios from './axios';
import catchAsync from '../utils/catchAsync';

// import { BUILDINGS } from '../data/dummy-data';

class BuildingsService {
    getBuildings = catchAsync(async id => {
        const response = await axios.get(`/buildings?customer_id=${id}`);
        console.log(response);
        return response.data;
    });

    create = catchAsync(async (buildingName, user_id) => {
        const response = await axios.post('/buildings', {
            data: { buildingName, user_id }
        });
        return response.data;
    });

    update = catchAsync(async (buildingName, user_id, building_id) => {
        const response = await axios.put('/buildings', {
            data: { buildingName, user_id, building_id }
        });
        return response.data;
    });

    delete = catchAsync(async id => {
        const response = await axios.delete('/buildings/' + id);
        return response.data;
    });
}

export default new BuildingsService();
