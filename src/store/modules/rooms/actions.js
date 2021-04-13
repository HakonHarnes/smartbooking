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
        const response = await RoomService.getAvaliableRooms();
        const availableRooms = response.data;
        commit('setLoading', false, { root: true });
        return availableRooms;
    },
    async getRoomsInBuilding(_, payload) {
        const rooms = RoomService.getRoomsInBuilding(payload);
        return rooms;
    },
    async getRooms({ commit, rootState }) {
        const response = await RoomService.getRooms(rootState.authentication.customer_id);

        const buildings = response.data.map((room, i, a) => {
            if (a)
                return {
                    building_id: room.building_id,
                    building_name: room.building_name,
                    user_id: room.user_id
                };
        });
        const uniqueBuildings = [...new Map(buildings.map(b => [b['building_id'], b])).values()];

        commit('buildings/setBuildings', { buildings: uniqueBuildings }, { root: true });
        commit('setRooms', { rooms: response.data });
    }
};
