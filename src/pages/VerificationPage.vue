<template>
    <div class="container">
        <section>
            <h1 class="title">Bekreftelseskode</h1>
            <otp-form @submit-form="verifyToken"></otp-form>
        </section>
    </div>
</template>

<script>
import otpForm from '../components/forms/users/OtpForm';

export default {
    components: {
        otpForm
    },
    data() {
        return {
            toast: this.$store.getters.toast
        };
    },
    methods: {
        async verifyToken(data) {
            // Verifies the verification code
            await this.$store.dispatch('auth/verify', data);

            // Redirects the user
            if (this.$store.getters['auth/accessToken']) return this.$router.push('/');
        }
    }
};
</script>

<style scoped>
.container {
    display: grid;
    place-items: center center;
    background-color: #00334e;
    width: 100vw;
    height: 100vh;
    margin: 0;
}

section {
    display: grid;
    grid-template-areas:
        'title'
        'input';
    margin: 60px;
    gap: 0.5rem;
    place-items: center center;
    color: white;
}

.title {
    grid-area: title;
    font-weight: 400;
}
</style>
