import axios from './axios';
import catchAsync from '../utils/catchAsync';

class BuildingsService {
    getBuildings = catchAsync(async id => {
        const response = await axios.get(`/buildings?organization_id=${id}`);
        return response.data;
    });

    getBuildingPolicy = catchAsync(async id => {
        const response = await axios.get(`/policy-times?building_id=${id}`);
        return response.data;
    });

    createBuilding = catchAsync(async ({ building_name, organization_id }) => {
        const response = await axios.post('/buildings', {
            buildingName: building_name,
            organization_id
        });
        return response.data;
    });

    updateBuildingPolicy = catchAsync(async (id, times) => {
        const response = await axios.put(`/policy-times?building_id=${id}`, {
            ...times
        });
        return response.data;
    });

    updateBuilding = catchAsync(async ({ building_name, building_is_active, organization_id, building_id }) => {
        const response = await axios.put(`/buildings/${building_id}`, {
            buildingName: building_name,
            building_is_active,
            organization_id
        });
        return response.data;
    });

    deleteBuilding = catchAsync(async id => {
        const response = await axios.delete(`/buildings/${id}`);
        return response.data;
    });
}

export default new BuildingsService();
