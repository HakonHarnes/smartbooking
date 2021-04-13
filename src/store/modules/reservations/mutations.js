export default {
    createReservation(state, reservation) {
        const id = Math.random();
        console.log(reservation);
        state.reservations.unshift({ ...reservation, id });
    },
    deleteReservation(state, resId) {
        const index = state.reservations.map(({ id }) => id).indexOf(resId);
        state.reservations.splice(index, 1);
    },
    setReservations(state, reservations) {
        state.reservations = reservations;
    }
};
