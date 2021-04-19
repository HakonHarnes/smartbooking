<template>
    <form @submit.prevent="submitForm">
        <section class="inputs">
            <input type="email" placeholder="E-post" v-model="email" required />
        </section>
        <base-button>Be om nytt passord</base-button>
        <p>Gå tilbake til <router-link to="/login">innlogging</router-link></p>
    </form>
</template>

<script>
export default {
    emits: ['submit-form'],
    data() {
        return {
            email: '',
            toast: this.$store.getters.toast
        };
    },
    methods: {
        submitForm() {
            if (!this.validateInput()) {
                return this.toast.error('Input er for langt.');
            }

            this.$emit('submit-form', { email: this.email });
        },
        validateInput() {
            return this.email.length <= 100;
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
</style>
