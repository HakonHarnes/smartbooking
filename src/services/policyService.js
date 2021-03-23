import axios from './axios';
import catchAsync from '../utils/catchAsync';

class policyService {
    getById = catchAsync(async id => {
        const response = await axios.get('/policies/' + id);
        return response.data;
    });

    create = catchAsync(
        async (maxTimePerReservation, maxDaysLookup, lengthPeriod, reservationsPerPeriod, buildingId) => {
            const response = await axios.post('/policies', {
                data: { maxTimePerReservation, maxDaysLookup, lengthPeriod, reservationsPerPeriod, buildingId }
            });
            return response.data;
        }
    );

    update = catchAsync(
        async (maxTimePerReservation, maxDaysLookup, lengthPeriod, reservationsPerPeriod, buildingId) => {
            const response = await axios.put('/policies', {
                data: { maxTimePerReservation, maxDaysLookup, lengthPeriod, reservationsPerPeriod, buildingId }
            });
            return response.data;
        }
    );

    delete = catchAsync(async id => {
        const response = await axios.delete('/policies/' + id);
        return response.data;
    });
}

export default new policyService();
