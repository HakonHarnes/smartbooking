import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            /* users: [
                { id: 1, name: 'Steig', email: 'steig@live.no', active: true },
                { id: 2, name: 'Gaute', email: 'gaute@live.no', active: true },
                { id: 3, name: 'Vetle', email: 'vetle@live.no', active: false },
                { id: 4, name: 'Vetle', email: 'vetle@live.no', active: false },
                { id: 5, name: 'Vetle', email: 'vetle@live.no', active: false }
            ] */
            users: []
        };
    },
    mutations,
    actions,
    getters
};
