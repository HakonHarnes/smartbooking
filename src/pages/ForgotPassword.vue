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
import userService from '../services/UserService';

export default {
    components: {
        ForgotPasswordForm
    },
    computed: {
        role() {
            return this.$store.getters.role;
        }
    },
    methods: {
        async forgotPassword(data) {
            alert('Dersom det er en konto knyttet til denne eposten, er tilbakestillingslenke sendt.');

            // Attempts to log in the user
            const response = await userService.forgotPassword(data.email);
            console.log(response);

            // Displays error if there is one (dev)
            if (response.error) {
                console.log('DEVLOG - ' + response.error);
            }

            // Forwards the user to the login page
            this.$router.push('/login');
        }
    },
    beforeCreate() {
        console.log('hello');
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

a {
    text-decoration: none;
}

section {
    display: grid;
    grid-template-areas:
        'logo'
        'title'
        'form';
    width: 400px;
    gap: 0.5rem;
    place-items: center center;
    color: white;
}

.title {
    grid-area: title;
    font-weight: 400;
}
</style>
