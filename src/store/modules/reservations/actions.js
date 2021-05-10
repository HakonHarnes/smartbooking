import ReservationService from '../../../services/ReservationService';

export default {
    async createReservation({ commit, rootState }, payload) {
        commit('setLoading', true, { root: true });
        const { user_id, organization_id } = rootState.auth.user;
        const response = await ReservationService.createReservation({
            ...payload.reservation,
            user_id,
            organization_id
        });
        commit('setLoading', false, { root: true });
        return !response.data?.error;
    },
    async deleteReservation({ commit, dispatch }, payload) {
        commit('setLoading', true, { root: true });
        await ReservationService.deleteReservation(payload.reservation_id);
        dispatch('getMyReservations');
    },
    async getReservationsByRoom({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const { room_id, from, to } = payload;
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

        const { user_id } = rootState.auth.user;
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
