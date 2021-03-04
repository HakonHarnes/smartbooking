<template>
    <form @submit.prevent="submitForm">
        <section class="inputs">
            <input type="email" placeholder="e-post" />
            <input type="email" placeholder="gjenta e-post" />
        </section>
        <p>Gå tilbake til <router-link to="/login">innlogging</router-link></p>
        <base-button>Be om nytt passord</base-button>
    </form>
</template>

<script>
export default {
    emits: ['submit-form'],
    methods: {
        submitForm() {
            this.$emit('submit-form');
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
    width: 300px;
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
    padding: 0.5rem;
    font-size: 1.2rem;
}

.inputs {
    display: grid;
    gap: 0.5rem;
}

::-webkit-input-placeholder {
    text-align: center;
}

:-moz-placeholder {
    text-align: center;
}

::-moz-placeholder {
    text-align: center;
}

:-ms-input-placeholder {
    text-align: center;
}
</style>
