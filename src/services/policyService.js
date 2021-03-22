import axios from './axios';

class policyService {
    getById = async id => {
        const response = await axios.get('/policies/' + id);
        return response;
    };

    create = async (maxTimePerReservation, maxDaysLookup, lengthPeriod, reservationsPerPeriod, buildingId) => {
        const response = await axios.post('/policies', {
            data: {maxTimePerReservation, maxDaysLookup, lengthPeriod, reservationsPerPeriod, buildingId }
        });
        return response;
    };

    update = async (maxTimePerReservation, maxDaysLookup, lengthPeriod, reservationsPerPeriod, buildingId) => {
        const response = await axios.put('/policies', {
            data: { maxTimePerReservation, maxDaysLookup, lengthPeriod, reservationsPerPeriod, buildingId }
        });
        return response;
    };

    delete = async id => {
        const response = await axios.delete('/policies/' + id);
        return response;
    };
}

export default new policyService();
