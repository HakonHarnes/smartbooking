import axios from './axios';

class buildingsService {
    getById = async id => {
        const response = await axios.get('/buildings/' + id);
        return response.data;
    };

    create = async (buildingName, userId) => {
        const response = await axios.post('/buildings', {
            data: { buildingName, userId }
        });
        return response.data;
    };

    update = async (buildingName, userId, buildingId) => {
        const response = await axios.put('/buildings', {
            data: { buildingName, userId, buildingId }
        });
        return response.data;
    };

    delete = async id => {
        const response = await axios.delete('/buildings/' + id);
        return response.data;
    };
}

export default new buildingsService();
