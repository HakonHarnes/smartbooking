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
import userService from '../services/UserService';

export default {
    components: {
        LoginForm
    },
    methods: {
        login() {
            //TODO: Get data from form
            userService.login('svein@svein.steig', 'jaeller');
            this.$store.dispatch('login');
            this.$router.push('/');
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
