export default {
    addRoom({ commit }, payload) {
        const newRoom = {
            ...payload,
            active: true
        };
        commit('addRoom', newRoom);
    },
    async findRooms({ commit }) {
        commit('setLoading', true, { root: true });
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        return res.json();
    }
};
