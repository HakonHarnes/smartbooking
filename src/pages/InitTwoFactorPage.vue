<template>
    <div class="container">
        <section>
            <img :src="qr" class="qr" v-if="qr" />
            <h1 class="title">Bekreftelseskode</h1>
            <one-time-password-form class="otp-form" @submit-form="verifyToken"></one-time-password-form>
        </section>
    </div>
</template>

<script>
import oneTimePasswordForm from '../components/forms/password/OneTimePasswordForm';

export default {
    components: {
        oneTimePasswordForm
    },
    mounted() {
        this.toast.info(
            this.qr
                ? 'Skann QR-koden under med Google Authenticator APP-en. Skriv deretter inn bekreftelseskoden i feltet nedenfor.'
                : 'En bekreftelseskode er sendt til din epost. Vennligst skriv inn bekreftelseskoden for å aktivere to-faktor autentisering.',
            { timeout: false }
        );
    },
    data() {
        return {
            toast: this.$store.getters.toast
        };
    },
    computed: {
        qr() {
            return this.$store.getters['auth/qr'];
        }
    },
    methods: {
        async verifyToken(data) {
            // Verifies the verification code
            await this.$store.dispatch('auth/verify', data);

            const user = this.$store.getters['auth/user'];
            if (user.two_factor) {
                this.toast.success('To-faktor autentisering har blitt aktivert!');
                return this.$router.push('/');
            }

            // Redirects the user
            // if (this.$store.getters['auth/accessToken']) return this.$router.push('/');
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
}

section {
    display: grid;
    grid-template-areas:
        'qr'
        'title'
        'otp-form';
    margin: 60px;
    max-width: 360px;
    gap: 0.5rem;
    place-items: center center;
    color: white;
}

.qr {
    grid-area: qr;
}

.title {
    grid-area: title;
    font-weight: 400;
}

.otp-form {
    grid-area: otp-form;
}
</style>
