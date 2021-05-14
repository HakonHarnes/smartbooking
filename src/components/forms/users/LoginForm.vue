<template>
    <form @submit.prevent="submitForm">
        <section class="inputs">
            <input type="email" placeholder="E-post" v-model="email" maxlength="255" required />
            <input type="password" placeholder="Passord" v-model="password" maxlength="255" required />
        </section>
        <base-button>Logg inn</base-button>
        <p>Glemt passord? Tilbakestill <router-link to="/glemt-passord">her</router-link></p>
    </form>
</template>

<script>
export default {
    emits: ['submit-form'],
    data() {
        return {
            email: '',
            password: '',
            toast: this.$store.getters.toast
        };
    },
    methods: {
        submitForm() {
            if (!this.validateInput()) {
                return this.toast.error('Input er for langt.');
            }

            this.$emit('submit-form', { email: this.email, password: this.password });
        },

        validateInput() {
            return this.email.length <= 100 && this.password.length <= 64;
        }
    }
};
</script>

<style scoped>
form {
    display: grid;
    place-items: center center;
    text-align: center;
    gap: 1rem;
    width: 100%;
}

form * {
    width: 100%;
}

a {
    color: white;
    font-weight: 600;
}

input {
    font-size: 1.1rem;
}

.inputs {
    display: grid;
    gap: 0.5rem;
}
</style>
