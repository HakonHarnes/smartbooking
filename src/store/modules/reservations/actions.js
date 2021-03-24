//import ReservationService from '../../../services/ReservationService';

export default {
    createReservation({ commit }, payload) {
        commit('createReservation', payload.reservation);
    },
    deleteReservation({ commit }, payload) {
        commit('deleteReservation', payload.resId);
    },
    async getMyReservations({ commit }) {
        commit('setLoading', true, { root: true });
        const res = {
            data: [
                {
                    id: 0,
                    room_name: '201',
                    building: 'Dokken',
                    seats: 6,
                    start_time: new Date(),
                    end_time: new Date()
                },
                {
                    id: 1,
                    room_name: '301',
                    building: 'Ivar Aasens',
                    seats: 8,
                    start_time: new Date(),
                    end_time: new Date()
                },
                {
                    id: 2,
                    room_name: '402',
                    building: 'Dokken',
                    seats: 12,
                    start_time: new Date(),
                    end_time: new Date()
                }
            ]
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
