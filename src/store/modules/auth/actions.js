import AuthService from '../../../services/AuthService';

export default {
    async refresh({ commit }) {
        commit('setLoading', true, { root: true });

        const response = await AuthService.refresh();
        if (response.data) {
            const { accessToken, user } = response.data;
            commit('setAccessToken', { accessToken });
            commit('setUser', { user });
        }

        commit('setLoading', false, { root: true });
    },

    async login({ commit }, payload) {
        commit('setLoading', true, { root: true });

        const { email, password } = payload;
        const response = await AuthService.login(email, password);
        if (response.data) {
            const { verificationToken, accessToken, user } = response.data;
            commit('setVerificationToken', { verificationToken });
            commit('setAccessToken', { accessToken });
            commit('setUser', { user });
        }

        commit('setLoading', false, { root: true });
    },

    async logout({ commit }) {
        commit('setLoading', true, { root: true });

        await AuthService.logout();
        commit('setAccessToken', { accessToken: null });
        commit('setUser', { user: null });

        commit('setLoading', false, { root: true });
    },

    async forgotPassword({ commit }, payload) {
        commit('setLoading', true, { root: true });

        const { email } = payload;
        await AuthService.forgotPassword(email);

        commit('setLoading', false, { root: true });
    },

    async resetPassword({ commit }, payload) {
        commit('setLoading', true, { root: true });

        const { newPassword, resetToken } = payload;
        const response = await AuthService.resetPassword(newPassword, resetToken);

        commit('setLoading', false, { root: true });
        return response;
    }
};
