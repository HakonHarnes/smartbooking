<template>
    <div class="container">
        <section>
            <h1 class="title">Bekreftelseskode</h1>
            <otp-form @submit-form="verifyToken"></otp-form>
        </section>
    </div>
</template>

<script>
// import userService from '../services/UserService';
import otpForm from '../components/forms/users/OtpForm';

export default {
    components: {
        otpForm
    },
    data() {
        return {
            token: null,
            toast: this.$store.getters.toast
        };
    },
    methods: {
        async verifyToken(data) {
            console.log(data.token);

            // const response = await userService.verifyVerificationToken(this.token);

            // if (response.error) {
            //     return this.toast.error(response.error);
            // }

            // // Forwards the user to the home page
            // this.$store.dispatch('login', { role: response.data.data.role });
            // this.toast.clear();
            // this.$router.push('/');
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
