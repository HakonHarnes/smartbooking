export default {
    rooms(state) {
        return state.rooms;
    },
    room(state) {
        return id => state.rooms.find(({ room_id }) => room_id === id);
    }
};
