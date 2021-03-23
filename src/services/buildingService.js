import axios from './axios';
import catchAsync from '../utils/catchAsync';

class buildingsService {
    getById = catchAsync(async id => {
        const response = await axios.get('/buildings/' + id);
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

export default new buildingsService();
