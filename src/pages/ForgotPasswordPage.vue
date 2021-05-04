<template>
    <div class="container">
        <section>
            <base-logo class="logo" />
            <h1 class="title">Glemt passord</h1>
            <forgot-password-form @submit-form="forgotPassword"></forgot-password-form>
        </section>
    </div>
</template>

<script>
import ForgotPasswordForm from '../components/forms/password/ForgotPasswordForm.vue';
import BaseLogo from '../components/ui/BaseLogo';

export default {
    components: {
        ForgotPasswordForm,
        BaseLogo
    },
    computed: {
        toast() {
            return this.$store.getters.toast;
        }
    },
    methods: {
        async forgotPassword(data) {
            this.toast.info('Dersom det er en konto knyttet til denne epost-adressen, er tilbakestillingslenke sendt.');
            this.$store.dispatch('auth/forgotPassword', data);

            // Redirects to the login page
            await new Promise(r => setTimeout(r, 5000));
            this.$router.push('/login');
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

.logo {
    width: 95%;
}

a {
    text-decoration: none;
}

section {
    display: grid;
    grid-template-areas:
        'logo'
        'title'
        'form';
    max-width: 300px;
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
