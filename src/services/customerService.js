import axios from './axios';
import catchAsync from '../utils/catchAsync';

class CustomerService {
    getById = catchAsync(async id => {
        const response = await axios.get('/customers/' + id);
        return response.data;
    });

    create = catchAsync(async (customerId, orgName, orgNumber, contactName, orgAdd, postalCode, postalZone) => {
        const response = await axios.post('/customers', {
            data: { customerId, orgName, orgNumber, contactName, orgAdd, postalCode, postalZone }
        });
        return response.data;
    });

    update = catchAsync(async (customerId, orgName, orgNumber, contactName, orgAdd, postalCode, postalZone) => {
        const response = await axios.put('/customers', {
            data: { customerId, orgName, orgNumber, contactName, orgAdd, postalCode, postalZone }
        });
        return response.data;
    });

    delete = catchAsync(async id => {
        const response = await axios.delete('/customers/' + id);
        return response.data;
    });
}

export default new CustomerService();
