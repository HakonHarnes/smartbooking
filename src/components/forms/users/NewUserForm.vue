<template>
    <form @submit.prevent="addUser">
        <div>
            <label for="name">Navn</label>
            <input type="text" name="name" v-model.trim="name" />
        </div>
        <div>
            <label for="email">E-post</label>
            <input type="email" name="email" v-model.trim="email" />
        </div>
        <div class="actions">
            <base-button>Registrer bruker</base-button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: ''
        };
    },
    methods: {
        addUser() {
            this.$store.dispatch('users/addUser', { name: this.name, email: this.email });
            this.$router.replace('/brukere');
        }
    }
};
</script>

<style scoped>
input {
    font-family: inherit;
    font-size: 1rem;
}

form div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    text-align: start;
}

label {
    margin-bottom: 0.2rem;
}

.actions {
    margin-top: 2rem;
}
</style>
