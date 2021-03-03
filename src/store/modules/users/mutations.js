export default {
    addUser(state, payload) {
        state.users.unshift(payload);
    },
    deleteUser(state, { id }) {
        const index = state.users.map(({ id }) => id).indexOf(id);
        state.users.splice(index, 1);
    }
};
