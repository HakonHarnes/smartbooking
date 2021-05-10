import BuildingService from '../../../services/BuildingService';

export default {
    async getBuildings({ commit, rootState }) {
        commit('setLoading', true, { root: true });
        const response = await BuildingService.getBuildings(rootState.auth.user.organization_id);
        commit('setBuildings', { buildings: response.data });
        commit('setLoading', false, { root: true });
    },
    async updateBuilding({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const { building } = payload;
        console.log(building);
        const response = await BuildingService.updateBuilding(building);
        console.log(response);
        if (response.data) {
            commit('updateBuilding', building);
        }
        commit('setLoading', false, { root: true });
    }
};
