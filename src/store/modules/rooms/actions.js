export default {
    addRoom({ commit }, payload) {
        const newRoom = {
            ...payload,
            active: true
        };
        commit('addRoom', newRoom);
    },
    findRooms({ commit }) {
        commit('setLoading', true, { root: true });
    }
};
