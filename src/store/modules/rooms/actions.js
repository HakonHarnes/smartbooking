export default {
    addRoom(context, payload) {
        const newRoom = {
            ...payload,
            active: true
        };
        context.commit('addRoom', newRoom);
    }
};
