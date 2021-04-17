<template>
    <div class="container">
        <section>
            <img src="../assets/logo.png" alt="" class="logo" />
            <h1 class="title">Sett passord</h1>
            <password-form @submit-form="setPassword" button-text="Sett passord" :user="user"></password-form>
        </section>
    </div>
</template>

<script>
import PasswordForm from '../components/forms/users/PasswordForm.vue';
import userService from '../services/UserService';

export default {
    components: {
        PasswordForm
    },
    data() {
        return {
            user: '',
            toast: this.$store.getters.toast
        };
    },
    methods: {
        async setPassword(data) {
            const token = this.$route.params.token;
            const response = await userService.resetPassword(data.password, token);

            // Displays error if there is one
            if (response.error) {
                return this.toast.error(response.error);
            }

            this.toast.success('Passordet ble endret!');
            this.$router.push('/login');
        }
    },

    // Gets user from token
    async beforeCreate() {
        const token = this.$route.params.token;
        const response = await userService.getUserFromResetToken(token);
        if (!response.data) {
            this.toast.error('Tilbakestillingslenken er ugyldig. Vennligst be om nytt passord og prøv på nytt.', {
                timeout: false
            });
            return this.$router.push('/glemt-passord');
        }

        this.user = response.data.data;
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
