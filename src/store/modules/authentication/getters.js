export default {
    isInitialized(state) {
        return state.isInitialized;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    },
    role(state) {
        return state.role;
    },
    isUser(state, getters) {
        return getters.role === 'user';
    },
    isCustomer(state, getters) {
        return getters.role === 'customer';
    }
};
