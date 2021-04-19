export default {
    users(state) {
        return state.users;
    },
    user(state) {
        return id => state.users.find(({ user_id }) => user_id === id);
    }
};
