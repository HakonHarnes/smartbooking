import OrganizationService from '../../../services/OrganizationService';

export default {
    async getOrganizations({ commit }) {
        commit('setLoading', true, { root: true });
        const response = await OrganizationService.getOrganizations();
        if (response.data) {
            commit('setOrganizations', { organizations: response.data });
        }
        commit('setLoading', false, { root: true });
    },
    async createOrganization({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const response = await OrganizationService.createOrganization(payload);
        commit('setLoading', false, { root: true });
        if (response.data) {
            commit('addOrganization', {
                ...payload,
                organization_id: response.data.insertId
            });
            return true;
        } else {
            return false;
        }
    },
    async updateOrganization({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const { organization } = payload;
        const response = await OrganizationService.updateOrganization(organization);
        commit('setLoading', false, { root: true });
        if (response.data?.changedRows === 1) {
            commit('updateOrganization', organization);
            return true;
        }
        return false;
    }
};
