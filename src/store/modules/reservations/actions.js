import ReservationService from '../../../services/ReservationService';

export default {
    async createReservation({ commit, rootState }, payload) {
        commit('setLoading', true, { root: true });
        await ReservationService.createReservation({
            ...payload.reservation,
            user_id: rootState.authentication.user_id
        });
        commit('setLoading', false, { root: true });
    },
    async deleteReservation({ commit, dispatch }, payload) {
        commit('setLoading', true, { root: true });
        await ReservationService.deleteReservation(payload.reservation_id);
        dispatch('getMyReservations');
    },
    async getReservationsByRoom({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const { room_id, from, to } = payload;
        console.log(to);
        const response = await ReservationService.getReservationsByRoomAndTime(room_id, from, to);
        const reservations = response.data?.map(res => {
            return {
                ...res,
                start: new Date(res.start),
                end: new Date(res.end)
            };
        });
        commit('setReservations', { reservations });
        commit('setLoading', false, { root: true });
    },
    async getMyReservations({ commit, rootState }) {
        commit('setLoading', true, { root: true });
        const { user_id } = rootState.authentication;
        const response = await ReservationService.getReservationsByUserId(user_id);

        const reservations = response.data?.map(res => {
            return {
                ...res,
                start: new Date(res.start),
                end: new Date(res.end)
            };
        });
        if (reservations) {
            commit('setReservations', { reservations });
        }
        commit('setLoading', false, { root: true });
    }
};
