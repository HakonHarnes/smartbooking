export default {
    setAuthentication(state, payload) {
        state.isAuthenticated = payload.isAuthenticated;
        state.role = payload.role;
    }
};
