import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    state() {
        return {
            isPartiallyAuthenticated: false,
            isAuthenticated: false,
            isInitialized: false,
            customer_id: 2,
            user_id: 2,
            role: ''
        };
    },
    mutations,
    actions,
    getters
};
