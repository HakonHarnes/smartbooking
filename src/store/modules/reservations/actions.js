export default {
    deleteReservation({ commit }, payload) {
        commit('deleteReservation', payload.resId);
    },
    createReservation({ commit }, payload) {
        commit('createReservation', payload.reservation);
    }
};
