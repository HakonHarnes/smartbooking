export default {
    deleteReservation(state, resId) {
        console.log(resId);
        const index = state.reservations.map(({ id }) => id).indexOf(resId);
        state.reservations.splice(index, 1);
    }
};
