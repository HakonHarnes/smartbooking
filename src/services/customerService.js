import axios from './axios';

class customerService {
    getById = async id => {
        const response = await axios.get('/customers/' + id);
        return response;
    };

    create = async (customerId, orgName, orgNumber, contactName, orgAdd, postalCode, postalZone) => {
        const response = await axios.post('/customers', {
            data: { customerId, orgName, orgNumber, contactName, orgAdd, postalCode, postalZone }
        });
        return response;
    };

    update = async (customerId, orgName, orgNumber, contactName, orgAdd, postalCode, postalZone) => {
        const response = await axios.put('/customers', {
            data: { customerId, orgName, orgNumber, contactName, orgAdd, postalCode, postalZone }
        });
        return response;
    };

    delete = async id => {
        const response = await axios.delete('/customers/' + id);
        return response;
    };
}

export default new customerService();