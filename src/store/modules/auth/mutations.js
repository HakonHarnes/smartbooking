export default {
    setVerificationToken(state, payload) {
        state.verificationToken = payload.verificationToken;
    },
    setAccessToken(state, payload) {
        state.accessToken = payload.accessToken;
    },
    setUser(state, payload) {
        state.user = payload.user;
    }
};
