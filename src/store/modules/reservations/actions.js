export default {
    deleteReservation({ commit }, payload) {
        const resId = payload.resId;
        commit('deleteReservation', resId);
    }
};
