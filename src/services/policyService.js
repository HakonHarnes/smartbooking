import axios from './axios';

class policyService {
    getById = async id => {
        const response = await axios.get('/policies/' + id);
        return response.data;
    };

    create = async (maxTimePerReservation, maxDaysLookup, lengthPeriod, reservationsPerPeriod, buildingId) => {
        const response = await axios.post('/policies', {
            data: { maxTimePerReservation, maxDaysLookup, lengthPeriod, reservationsPerPeriod, buildingId }
        });
        return response.data;
    };

    update = async (maxTimePerReservation, maxDaysLookup, lengthPeriod, reservationsPerPeriod, buildingId) => {
        const response = await axios.put('/policies', {
            data: { maxTimePerReservation, maxDaysLookup, lengthPeriod, reservationsPerPeriod, buildingId }
        });
        return response.data;
    };

    delete = async id => {
        const response = await axios.delete('/policies/' + id);
        return response.data;
    };
}

export default new policyService();
