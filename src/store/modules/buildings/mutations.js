export default {
    setBuildings(state, payload) {
        state.buildings = payload.buildings;
    },
    updateBuilding(state, building) {
        const index = state.buildings.map(({ building_id }) => building_id).indexOf(building.building_id);
        state.buildings[index] = { ...building };
    },
    addBuilding(state, building) {
        state.buildings.push(building);
    },
    deleteBuilding(state, id) {
        const index = state.buildings.map(({ building_id }) => building_id).indexOf(id);
        state.buildings.splice(index, 1);
    }
};
