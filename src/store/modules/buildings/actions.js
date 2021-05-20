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
        const response = await BuildingService.updateBuilding(building);
        commit('setLoading', false, { root: true });
        if (response.data) {
            commit('updateBuilding', building);
            return true;
        }
        return false;
    },
    async addBuilding({ commit, rootState }, payload) {
        commit('setLoading', true, { root: true });
        const newBuilding = {
            ...payload,
            organization_id: rootState.auth.user.organization_id
        };
        const response = await BuildingService.createBuilding(newBuilding);
        commit('setLoading', false, { root: true });
        if (response.data) {
            commit('addBuilding', { ...newBuilding, building_id: response.data.insertId, building_is_active: 1 });
            return true;
        }
        return false;
    },
    async deleteBuilding({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const { building_id } = payload;
        const response = await BuildingService.deleteBuilding(building_id);
        commit('setLoading', false, { root: true });
        console.log(response);
        if (response.data) {
            commit('deleteBuilding', building_id);
            return true;
        }
        return false;
    }
};
