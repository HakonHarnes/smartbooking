export default {
    isAuthenticated(state) {
        return state.isAuthenticated;
    },
    role(state) {
        return state.role;
    },
    isUser(_, getters) {
        return getters.role === 'user';
    },
    isCustomer(_, getters) {
        return getters.role === 'customer';
    },
    customerId(state) {
        return state.customerId;
    }
};
