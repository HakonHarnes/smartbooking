import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            users: [
                { name: 'Steig', email: 'steig@live.no', active: true },
                { name: 'Gaute', email: 'gaute@live.no', active: true },
                { name: 'Vetle', email: 'vetle@live.no', active: false },
                { name: 'Vetle', email: 'vetle@live.no', active: false },
                { name: 'Vetle', email: 'vetle@live.no', active: false }
            ]
        };
    },
    mutations,
    actions,
    getters
};
