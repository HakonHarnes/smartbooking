<template>
    <div class="container">
        <section>
            <img src="../assets/logo.png" alt="" class="logo" />
            <h1 class="title">Sett passord</h1>
            <set-password-form @submit-form="resetPassword"></set-password-form>
        </section>
    </div>
</template>

<script>
import SetPasswordForm from '../components/forms/SetPasswordForm.vue';
import userService from '../services/UserService';

export default {
    components: {
        SetPasswordForm
    },
    methods: {
        async resetPassword(data) {
            // Resets the password
            const token = this.$route.params.token;
            const response = await userService.resetPassword(data.password, token);

            // Displays error if there is one
            if (response.error) {
                return alert(response.error);
            }

            alert('Password was changed!');

            // Forwards the user to the login page
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
