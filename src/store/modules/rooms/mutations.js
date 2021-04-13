export default {
    addRoom(state, payload) {
        state.rooms.unshift(payload);
    },
    setRooms(state, payload) {
        state.rooms = payload.rooms;
    }
};
