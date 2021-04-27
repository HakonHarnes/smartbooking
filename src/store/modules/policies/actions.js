import PolicyService from '../../../services/PolicyService';

export default {
    async getPolicy({ commit, rootState }) {
        commit('setLoading', true, { root: true });
        const response = await PolicyService.getPolicy(rootState.authentication.customer_id);
        console.log(response);
        if (response.data) {
            console.log('setting');
            commit('setPolicy', response.data);
        }
        commit('setLoading', false, { root: true });
    },
    async updatePolicy({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const newPolicy = { ...payload };
        console.log(payload);
        const response = await PolicyService.updatePolicy(newPolicy);
        console.log(response);
        if (response.data) {
            console.log('OK');
        }
        commit('setLoading', false, { root: true });
    }
};
