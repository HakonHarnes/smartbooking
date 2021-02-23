export default {
    logout(context) {
        context.commit('setAuthentication', { isAuthenticated: false, role: null });
    },
    login(context) {
        context.commit('setAuthentication', { isAuthenticated: true, role: 'user' });
    }
};
