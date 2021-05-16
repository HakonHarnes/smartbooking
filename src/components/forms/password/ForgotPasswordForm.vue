<template>
    <form @submit.prevent="submitForm">
        <section class="inputs">
            <input type="email" placeholder="E-post" v-model="email" maxlength="255" required />
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
            this.$emit('submit-form', { email: this.email });
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
</style>
