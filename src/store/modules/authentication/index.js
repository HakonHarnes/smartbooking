import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    state() {
        return {
            isPartiallyAuthenticated: false,
            isAuthenticated: true,
            isInitialized: false,
            customer_id: 2,
            user_id: 2,
            role: 'customer'
        };
    },
    mutations,
    actions,
    getters
};
