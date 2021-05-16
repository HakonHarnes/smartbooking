export default {
    setVerificationToken(state, payload) {
        state.verificationToken = payload.verificationToken;
    },
    setAccessToken(state, payload) {
        state.accessToken = payload.accessToken;
    },
    setUser(state, payload) {
        state.user = payload.user;
    },
    setTwoFactor(state, payload) {
        state.user.two_factor = payload.twoFactor;
    },
    setQr(state, payload) {
        state.qr = payload.qr;
    }
};
