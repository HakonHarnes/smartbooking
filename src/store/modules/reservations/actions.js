//import ReservationService from '../../../services/ReservationService';

const tempData = [
    {
        id: 0,
        room_name: '201',
        building: 'Dokken',
        seats: 6,
        start_time: new Date('2021-04-05T09:30:00.000Z'),
        end_time: new Date('2021-04-05T14:30:00.000Z')
    },
    {
        id: 1,
        room_name: '301',
        building: 'Ivar Aasens',
        seats: 8,
        start_time: new Date('2021-04-06T09:30:00.000Z'),
        end_time: new Date('2021-04-06T10:30:00.000Z')
    },
    {
        id: 2,
        room_name: '402',
        building: 'Dokken',
        seats: 12,
        start_time: new Date('2021-04-07T09:30:00.000Z'),
        end_time: new Date('2021-04-07T10:00:00.000Z')
    },
    {
        id: 3,
        room_name: '402',
        building: 'Dokken',
        seats: 12,
        start_time: new Date('2021-04-08T09:30:00.000Z'),
        end_time: new Date('2021-04-08T10:00:00.000Z')
    },
    {
        id: 4,
        room_name: '402',
        building: 'Dokken',
        seats: 12,
        start_time: new Date('2021-04-09T09:30:00.000Z'),
        end_time: new Date('2021-04-09T10:00:00.000Z')
    }
];

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
            data: tempData
        };
        commit('setLoading', false, { root: true });
        return res;
    },
    async getMyReservations({ commit }) {
        commit('setLoading', true, { root: true });
        const res = {
            data: tempData
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
