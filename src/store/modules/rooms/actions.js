import RoomService from '../../../services/RoomService';

export default {
    addRoom({ commit }, payload) {
        const newRoom = {
            ...payload,
            active: true
        };
        commit('addRoom', newRoom);
    },
    async findAvailableRooms({ commit }) {
        commit('setLoading', true, { root: true });
        const response = RoomService.getAvaliableRooms();
        commit('setLoading', false, { root: true });
        return response;
    },
    async getRoomsInBuilding(_, payload) {
        const rooms = RoomService.getRoomsInBuilding(payload);
        return rooms;
    }
};
