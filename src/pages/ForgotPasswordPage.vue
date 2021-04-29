<template>
    <div class="container">
        <section>
            <img src="../assets/logo.png" alt="" class="logo" />
            <h1 class="title">Glemt passord</h1>
            <forgot-password-form @submit-form="forgotPassword"></forgot-password-form>
        </section>
    </div>
</template>

<script>
import ForgotPasswordForm from '../components/forms/users/ForgotPasswordForm.vue';

export default {
    components: {
        ForgotPasswordForm
    },
    data() {
        return {
            toast: this.$store.getters.toast
        };
    },
    methods: {
        forgotPassword(data) {
            this.toast.info('Dersom det er en konto knyttet til denne epost-adressen, er tilbakestillingslenke sendt.');
            this.$store.dispatch('auth/forgotPassword', data);
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
}

img {
    width: 100%;
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
