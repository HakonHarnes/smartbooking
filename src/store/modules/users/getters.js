export default {
    users(state) {
        return state.users;
    },
    user(state) {
        return userId => state.users.find(({ id }) => id === userId);
    }
};
