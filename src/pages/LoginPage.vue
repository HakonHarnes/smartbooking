<template>
    <div class="container">
        <section>
            <img src="../assets/logo.png" alt="" class="logo" />
            <h1 class="title">Innlogging</h1>
            <login-form @submit-form="login"></login-form>
        </section>
    </div>
</template>

<script>
import LoginForm from '../components/forms/users/LoginForm.vue';

export default {
    components: {
        LoginForm
    },
    methods: {
        async login(data) {
            // Attempts to log in
            await this.$store.dispatch('auth/login', data);

            // Redirects the user
            if (this.$store.getters['auth/verificationToken']) return this.$router.push('/bekreftelse');
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
}

img {
    width: 100%;
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
