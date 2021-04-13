import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    state() {
        return {
            customer_id: 2,
            isAuthenticated: true,
            user_id: 2,
            role: 'user'
        };
    },
    mutations,
    actions,
    getters
};
