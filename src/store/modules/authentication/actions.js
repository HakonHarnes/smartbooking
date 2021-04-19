export default {
    logout(context) {
        context.commit('setAuthentication', { isAuthenticated: false, role: '' });
    },
    login(context, payload) {
        context.commit('setAuthentication', { isAuthenticated: true, role: payload.role });
    },
    partiallyAuthenticate(context, payload) {
        context.commit('setPartialAuthentication', { isPartiallyAuthenticated: payload.isPartiallyAuthenticated });
    },
    setInitialized(context, payload) {
        context.commit('setInitialized', { isInitialized: payload.isInitialized });
    }
};
