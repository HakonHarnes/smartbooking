export default {
    addUser(context, payload) {
        const newUser = {
            ...payload,
            active: true
        };
        context.commit('addUser', newUser);
    }
};
