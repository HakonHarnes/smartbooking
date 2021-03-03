export default {
    addUser(state, payload) {
        state.users.unshift(payload);
    }
};
