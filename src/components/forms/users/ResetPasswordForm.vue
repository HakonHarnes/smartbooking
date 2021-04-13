<template>
    <form @submit.prevent="submitForm">
        <section class="inputs">
            <input type="password" placeholder="nytt passord" v-model="password" />
            <input type="password" placeholder="gjenta nytt passord" v-model="confirmPassword" />
        </section>
        <base-button>Reset passord</base-button>
    </form>
</template>

<script>
export default {
    emits: ['submit-form'],
    data() {
        return {
            password: '',
            confirmPassword: ''
        };
    },
    methods: {
        submitForm() {
            const validInput = this.validateInput();
            if (!validInput) {
                return alert('Invalid input!');
            }

            this.$emit('submit-form', { password: this.password });
        },

        // Validates the input
        validateInput() {
            return this.password === this.confirmPassword && this.password.length > 0;
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
