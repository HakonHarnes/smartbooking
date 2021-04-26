export default {
    setAuthentication(state, payload) {
        state.isAuthenticated = payload.isAuthenticated;
        state.role = payload.role;
    },
    setPartialAuthentication(state, payload) {
        state.isPartiallyAuthenticated = payload.isPartiallyAuthenticated;
    },
    setInitialized(state, payload) {
        state.isInitialized = payload.isInitialized;
    }
};
