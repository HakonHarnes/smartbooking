import BuildingService from '../../../services/BuildingService';

export default {
    async getBuildings({ rootState }) {
        const response = await BuildingService.getById(rootState.authentication.customerId);
        return response.data;
    }
};
