import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            reservations: [
                { id: 0, roomName: '201', seats: 6, description: 'Grupperom', start: new Date(), end: new Date() },
                { id: 1, roomName: '301', seats: 8, description: 'Møterom', start: new Date(), end: new Date() },
                { id: 2, roomName: '402', seats: 12, description: 'Grupperom', start: new Date(), end: new Date() }
            ]
        };
    },
    mutations,
    actions,
    getters
};
