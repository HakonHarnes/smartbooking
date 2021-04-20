export default {
    addRoom(state, payload) {
        console.log(payload);
        state.rooms.unshift(payload);
    },
    setRooms(state, payload) {
        state.rooms = payload.rooms;
    },
    deleteRoom(state, id) {
        const index = state.rooms.map(({ room_id }) => room_id).indexOf(id);
        state.rooms.splice(index, 1);
    },
    updateRoom(state, room) {
        const index = state.rooms.map(({ room_id }) => room_id).indexOf(room.room_id);
        console.log(index);
        state.rooms[index] = { ...room };
    }
};
