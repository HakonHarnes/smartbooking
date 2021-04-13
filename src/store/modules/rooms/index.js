import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            rooms: [{ id: 1, roomName: '301', seats: 8, description: 'Møterom', building: 'Bygg 3D', active: true }]
        };
    },
    mutations,
    actions,
    getters
};
