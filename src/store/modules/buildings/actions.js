import BuildingService from '../../../services/BuildingService';

export default {
    async getBuildings({ commit, rootState }) {
        commit('setLoading', true, { root: true });
        const response = await BuildingService.getBuildings(rootState.authentication.customer_id);
        commit('setBuildings', { buildings: response.data });
        commit('setLoading', false, { root: true });
    }
};
