import PolicyService from '../../../services/PolicyService';
import BuildingService from '../../../services/BuildingService';

export default {
    async getPolicy({ commit, rootState }) {
        commit('setLoading', true, { root: true });
        const response = await PolicyService.getPolicy(rootState.auth.user.customer_id);
        if (response.data) {
            commit('setPolicy', response.data);
        }
        commit('setLoading', false, { root: true });
    },
    async updatePolicy({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const newPolicy = { ...payload };
        const response = await PolicyService.updatePolicy(newPolicy);
        commit('setLoading', false, { root: true });
        if (response.data.changedRows > 0) {
            commit('setPolicy', newPolicy);
            return true;
        } else {
            return false;
        }
    },
    async getBuildingPolicy(_, payload) {
        //commit('setLoading', true, { root: true });
        const { building_id } = payload;
        const response = await BuildingService.getBuildingPolicy(building_id);
        if (response.data) {
            return response.data;
        }
        //commit('setLoading', false, { root: true });
    },
    async updateBuildingPolicy(_, payload) {
        const { times } = payload;
        const response = await BuildingService.updateBuildingPolicy(times.building_id, times);
        if (response.data) {
            return response.data.affectedRows > 0;
        }
    }
};
