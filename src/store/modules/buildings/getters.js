export default {
    buildings(state) {
        return state.buildings;
    },
    building(state) {
        return id => state.buildings.find(({ building_id }) => building_id === id);
    }
};
