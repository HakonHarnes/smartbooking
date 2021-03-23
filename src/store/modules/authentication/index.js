import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    state() {
        return {
            isInitialized: false,
            isAuthenticated: false,
            role: ''
        };
    },
    mutations,
    actions,
    getters
};
