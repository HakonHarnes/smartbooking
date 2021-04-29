import UserService from '../../../services/UserService';

export default {
    async registerUser({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const newUser = { ...payload };
        const response = await UserService.register(newUser);
        if (response.data) {
            commit('addUser', { ...newUser, id: response.data.insertId });
        }
        commit('setLoading', false, { root: true });
    },
    async deleteUser({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const { user_id } = payload;
        const response = await UserService.deleteUser(user_id);
        if (response.data?.affectedRows > 0) {
            commit('deleteUser', user_id);
        }
        commit('setLoading', false, { root: true });
    },
    async getUsers({ commit, rootState }) {
        commit('setLoading', true, { root: true });
        const response = await UserService.getUsersByCustomer(rootState.authentication.customer_id);
        if (response.data) {
            commit('setUsers', response.data);
        }
        commit('setLoading', false, { root: true });
    },
    async updateUser({ commit }, payload) {
        commit('setLoading', true, { root: true });
        const { user } = payload;
        const response = await UserService.updateUser(user);
        if (response.data?.changedRows === 1) {
            commit('updateUser', user);
        }
        commit('setLoading', false, { root: true });
    }
};
