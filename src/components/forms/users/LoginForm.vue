<template>
    <form @submit.prevent="submitForm">
        <section class="inputs">
            <input type="email" placeholder="E-post" v-model="email" required />
            <input type="password" placeholder="Passord" v-model="password" required />
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
    font-size: 1.1rem;
}

form * {
    width: 100%;
}

a {
    color: white;
    font-weight: 600;
}

input {
    border: none;
    padding: 0.5rem;
    font-size: 1.2rem;
}

.inputs {
    display: grid;
    gap: 0.5rem;
}
</style>
