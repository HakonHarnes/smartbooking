<template>
    <div class="container">
        <section>
            <h1 class="title">Bekreftelseskode</h1>
            <input @input="checkInput" class="input" type="number" v-model="token" />
        </section>
    </div>
</template>

<script>
import userService from '../services/UserService';

export default {
    data() {
        return {
            token: null,
            toast: this.$store.getters.toast
        };
    },
    methods: {
        async checkInput() {
            if (this.token.length === 6) {
                const response = await userService.verifyVerificationToken(this.token);

                if (response.error) {
                    return this.toast.error(response.error);
                }

                // Forwards the user to the home page
                this.$store.dispatch('login', { role: response.data.data.role });
                this.toast.clear();
                this.$router.push('/');
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
}

section {
    display: grid;
    grid-template-areas:
        'title'
        'input';
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

.input {
    grid-area: input;
    text-align: center;
    font-size: 2rem;
}
</style>
