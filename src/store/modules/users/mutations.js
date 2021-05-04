export default {
    addUser(state, payload) {
        state.users.unshift(payload);
    },
    deleteUser(state, id) {
        const index = state.users.map(({ id }) => id).indexOf(id);
        state.users.splice(index, 1);
    },
    updateUser(state, user) {
        const index = state.users.map(({ user_id }) => user_id).indexOf(user.user_id);
        state.users[index] = { ...user };
    },
    setUsers(state, users) {
        state.users = users;
    }
};
