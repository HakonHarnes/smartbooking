export default {
    addUser({ commit }, payload) {
        const newUser = {
            id: new Date().toISOString(),
            ...payload,
            active: true
        };
        commit('addUser', newUser);
    },
    deleteUser({ commit }, payload) {
        const id = payload.userId;
        commit('deleteUser', { id });
    }
};
