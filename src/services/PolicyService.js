import axios from './axios';
import catchAsync from '../utils/catchAsync';

class PolicyService {
    getPolicy = catchAsync(async id => {
        const response = await axios.get(`/policies?organization_id=` + id);
        return response.data;
    });

    create = catchAsync(async policy => {
        const response = await axios.post('/policies', {
            ...policy
        });
        return response.data;
    });

    updatePolicy = catchAsync(async policy => {
        const response = await axios.put(`/policies/${policy.policy_id}`, {
            ...policy
        });
        return response.data;
    });

    delete = catchAsync(async id => {
        const response = await axios.delete('/policies/' + id);
        return response.data;
    });
}

export default new PolicyService();
