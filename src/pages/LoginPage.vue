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
    data() {
        return {
            toast: this.$store.getters.toast
        };
    },
    methods: {
        async login(data) {
            // Attempts to log in the user
            const response = await userService.login(data.email, data.password);

            // Displays error if there is one
            if (response.error) {
                return this.toast.error(response.error);
            }

            // Forwards user to 2FA page if enabled
            if (response.data.data.twoFactor) {
                if (response.data.data.twoFactor === 'email') {
                    await userService.sendVerificationToken(data.email);
                }

                this.$store.dispatch('partiallyAuthenticate', { isPartiallyAuthenticated: true });
                return this.$router.push('/bekreftelse');
            }

            // Forwards the user to the home page
            this.$store.dispatch('login', { role: response.data.data.role });
            this.toast.clear();
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
