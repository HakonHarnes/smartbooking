<template>
    <div class="container">
        <section>
            <img src="../assets/logo.png" alt="" class="logo" />
            <h1 class="title">Reset passord</h1>
            <password-form @submit-form="resetPassword" button-text="Reset passord" :user="user"></password-form>
        </section>
    </div>
</template>

<script>
import PasswordForm from '../components/forms/users/PasswordForm.vue';
import jwt_decode from 'jwt-decode';

export default {
    components: {
        PasswordForm
    },
    computed: {
        user() {
            const resetToken = this.$route.params.token;
            return jwt_decode(resetToken).user;
        }
    },
    data() {
        return {
            toast: this.$store.getters.toast
        };
    },
    methods: {
        async resetPassword(data) {
            const resetToken = this.$route.params.token;
            const response = await this.$store.dispatch('auth/resetPassword', {
                newPassword: data.password,
                resetToken
            });

            if (response.status == '200') {
                this.toast.success('Passordet ble endret!');
                this.$router.push('/login');
            }
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
