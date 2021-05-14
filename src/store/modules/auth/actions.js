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
    },

    async updatePassword({ commit }, payload) {
        commit('setLoading', true, { root: true });

        const { oldPassword, newPassword } = payload;
        const response = await AuthService.updatePassword(oldPassword, newPassword);
        if (!response.data.error) {
            const { accessToken } = response.data;
            commit('setAccessToken', { accessToken });
        }

        commit('setLoading', false, { root: true });
        return response;
    },

    async verify({ commit }, payload) {
        commit('setLoading', true, { root: true });

        const { code } = payload;
        const response = await AuthService.verify(code);
        if (!response.data.error) {
            const { accessToken, user } = response.data;
            commit('setVerificationToken', { verificationToken: null });
            commit('setAccessToken', { accessToken });
            commit('setUser', { user });
        }

        commit('setLoading', false, { root: true });
    },

    async enableTwoFactorAuth({ commit }, payload) {
        commit('setLoading', true, { root: true });

        const { twoFactorMethod } = payload;
        const response = await AuthService.enableTwoFactorAuth(twoFactorMethod);
        if (!response.data.error) {
            const { verificationToken, qr } = response.data;
            commit('setVerificationToken', { verificationToken });
            commit('setQr', { qr });
        }

        commit('setLoading', false, { root: true });
    },

    async disableTwoFactorAuth({ commit }) {
        commit('setLoading', true, { root: true });

        const response = await AuthService.disableTwoFactorAuth();
        if (!response.data.error) {
            commit('setTwoFactor', { twoFactor: false });
        }

        commit('setLoading', false, { root: true });
    }
};
