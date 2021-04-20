import axios from './axios';
import catchAsync from '../utils/catchAsync';

class BuildingsService {
    getBuildings = catchAsync(async id => {
        const response = await axios.get(`/buildings?customer_id=${id}`);
        return response.data;
    });

    createBuilding = catchAsync(async (buildingName, user_id) => {
        const response = await axios.post('/buildings', {
            buildingName,
            user_id
        });
        return response.data;
    });

    update = catchAsync(async (building_name, user_id, building_id) => {
        const response = await axios.put('/buildings', {
            data: { building_name, user_id, building_id }
        });
        return response.data;
    });

    delete = catchAsync(async id => {
        const response = await axios.delete('/buildings/' + id);
        return response.data;
    });
}

export default new BuildingsService();
