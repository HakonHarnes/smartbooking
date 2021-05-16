export default {
    setOrganizations(state, payload) {
        state.organizations = payload.organizations;
    },
    addOrganization(state, payload) {
        state.organizations.push(payload);
    },
    updateOrganization(state, payload) {
        const index = state.organizations
            .map(({ organization_id }) => organization_id)
            .indexOf(payload.organization_id);
        state.organizations[index] = { ...payload };
    }
};
