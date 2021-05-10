import BuildingService from '../../../services/BuildingService';
import RoomService from '../../../services/RoomService';

export default {
    async addRoom({ commit, rootState }, payload) {
        commit('setLoading', true, { root: true });
        const { room_name, size, building_id, building_name } = payload;
        const newRoom = {
            room_name,
            size,
            building_id,
            is_active: 1,
            user_id: rootState.auth.user.organization_id
        };
        const { data } = await RoomService.createRoom(newRoom);
        if (data.affectedRows === 1) {
            commit('addRoom', {
                ...newRoom,
                room_id: data.insertId,
                building_name
            });
        }
        commit('setLoading', false, { root: true });
    },
    async addRooms({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const { rooms } = payload;
        const response = await RoomService.createRooms(rooms);
        console.log(response);
        commit('setLoading', false, { root: true });
    },
    async addRoomAndBuilding({ commit, dispatch, rootState }, payload) {
        commit('setLoading', true, { root: true });
        const { room_name, size, building_name } = payload;
        const { data } = await BuildingService.createBuilding(building_name, rootState.auth.user.organization_id);
        if (data.insertId) {
            dispatch('addRoom', { room_name, size, building_id: data.insertId, building_name });
        }
    },
    async findAvailableRooms({ commit, rootState }, payload) {
        commit('setLoading', true, { root: true });
        const { building_id, date, start, end } = payload;
        const response = await RoomService.getAvaliableRooms(
            rootState.auth.user.organization_id,
            `${date}T${start}:00.000Z`,
            `${date}T${end}:00.000Z`,
            building_id
        );
        console.log(response);
        const dateObj = new Date(date);
        const availableRooms = response.data.map(room => {
            return {
                ...room,
                start: new Date(dateObj.setHours(...start.split(':'))),
                end: new Date(dateObj.setHours(...end.split(':')))
            };
        });
        commit('setLoading', false, { root: true });
        return availableRooms;
    },
    async getRoomsInBuilding(_, payload) {
        const rooms = RoomService.getRoomsInBuilding(payload);
        return rooms;
    },
    async getRooms({ commit, rootState }) {
        commit('setLoading', true, { root: true });
        const response = await RoomService.getRooms(rootState.auth.user.organization_id);

        const buildings = response.data?.map((room, i, a) => {
            if (a)
                return {
                    building_id: room.building_id,
                    building_name: room.building_name,
                    organization_id: room.organization_id
                };
        });
        const uniqueBuildings = [...new Map(buildings.map(b => [b['building_id'], b])).values()];

        console.log(uniqueBuildings);

        commit('setLoading', false, { root: true });
        commit('buildings/setBuildings', { buildings: uniqueBuildings }, { root: true });
        commit('setRooms', { rooms: response.data });
        return response.data;
    },
    async updateRoom({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const { room } = payload;
        const { data } = await RoomService.updateRoom(room);
        if (data.changedRows === 1) {
            commit('updateRoom', room);
        }
        commit('setLoading', false, { root: true });
    },
    async deleteRoom({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const { room_id } = payload;
        const response = await RoomService.deleteRoom(room_id);
        if (response.data.affectedRows > 0) {
            commit('deleteRoom', room_id);
        }
        commit('setLoading', false, { root: true });
    },
    async getRoom({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const { room_id } = payload;
        const response = await RoomService.getRoom(room_id);
        console.log(response);

        commit('setLoading', false, { root: true });
        return response.data;
    }
};
