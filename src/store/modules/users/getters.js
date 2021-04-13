export default {
    users(state) {
        return state.users;
    },
    user(state) {
        return user_id => state.users.find(({ id }) => id === user_id);
    }
};
