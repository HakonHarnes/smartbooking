import axios from './axios';
import catchAsync from '../utils/catchAsync';

class OrganizationService {
    getOrganizations = catchAsync(async () => {
        const response = await axios.get(`/organizations`);
        return response.data;
    });

    createOrganization = catchAsync(
        async ({
            organization_name,
            organization_number,
            organization_address,
            postal_code,
            postal_zone,
            contact_name
        }) => {
            const response = await axios.post('/organizations', {
                name: organization_name,
                number: organization_number,
                address: organization_address,
                postalCode: postal_code,
                postalZone: postal_zone,
                contactName: contact_name
            });
            return response.data;
        }
    );

    updateOrganization = catchAsync(
        async ({
            organization_name,
            organization_number,
            organization_address,
            postal_code,
            postal_zone,
            organization_id,
            contact_name
        }) => {
            const response = await axios.put(`/organizations/${organization_id}`, {
                name: organization_name,
                number: organization_number,
                contactName: contact_name,
                address: organization_address,
                postalCode: postal_code,
                postalZone: postal_zone
            });
            return response.data;
        }
    );

    delete = catchAsync(async id => {
        const response = await axios.delete('/customers/' + id);
        return response.data;
    });
}

export default new OrganizationService();
