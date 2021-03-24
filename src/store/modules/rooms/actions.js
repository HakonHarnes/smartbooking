export default {
    addRoom({ commit }, payload) {
        const newRoom = {
            ...payload,
            active: true
        };
        commit('addRoom', newRoom);
    },
    async findAvailableRooms({ commit }) {
        commit('setLoading', true, { root: true });
        const res = [
            {
                id: 0,
                roomName: '201',
                building: 'Dokken',
                seats: 6,
                description: 'Grupperom',
                start: new Date(),
                end: new Date()
            },
            {
                id: 1,
                roomName: '301',
                building: 'Ivar Aasens',
                seats: 8,
                description: 'Møterom',
                start: new Date(),
                end: new Date()
            }
        ];
        commit('setLoading', false, { root: true });
        return res;
    }
};
