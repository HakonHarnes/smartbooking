export default {
    addRoom(state, payload) {
        state.rooms.unshift(payload);
    }
};
