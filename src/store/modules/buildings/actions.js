import BuildingService from '../../../services/BuildingService';

export default {
    async getBuildings({ rootState }) {
        const buildings = await BuildingService.getBuilding(rootState.authentication.customerId);
        return buildings;
    }
};
