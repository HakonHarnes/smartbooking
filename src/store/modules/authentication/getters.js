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
    customer_id(state) {
        return state.customer_id;
    },
    user_id(state) {
        return state.user_id;
    }
};
