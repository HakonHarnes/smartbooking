//import ReservationService from '../../../services/ReservationService';
import { RESERVATIONS } from '../../../data/dummy-data';

export default {
    createReservation({ commit }, payload) {
        commit('createReservation', payload.reservation);
    },
    deleteReservation({ commit }, payload) {
        commit('deleteReservation', payload.resId);
    },
    getReservations: async ({ commit }) => {
        commit('setLoading', true, { root: true });

        const res = {
            data: RESERVATIONS
        };
        commit('setLoading', false, { root: true });
        return res;
    },
    async getMyReservations({ commit }) {
        commit('setLoading', true, { root: true });
        const res = {
            data: RESERVATIONS
        };
        //await ReservationService.getUserReservations(3);
        const reservations = res.data.map(reservation => {
            return { ...reservation, start: new Date(reservation.start_time), end: new Date(reservation.end_time) };
        });
        commit('setReservations', reservations);
        console.log(res);
        commit('setLoading', false, { root: true });
    }
};
