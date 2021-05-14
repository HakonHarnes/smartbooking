<template>
    <form @submit.prevent="addUser">
        <input required type="text" name="firstname" placeholder="Fornavn" maxlength="255" v-model.trim="first_name" />
        <input required type="text" name="lastname" placeholder="Etternavn" maxlength="255" v-model.trim="last_name" />
        <input required type="email" name="email" placeholder="E-post" maxlength="255" v-model.trim="email" />
        <base-button class="button">Registrer bruker</base-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            formValid: true
        };
    },
    computed: {
        toast() {
            return this.$store.getters.toast;
        }
    },
    methods: {
        addUser() {
            this.validateForm();
            if (this.formValid) {
                this.$store.dispatch('users/register', {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    role: 'user'
                });
                this.toast.success('Bruker lagt til');
                this.$router.replace('/brukere');
            } else {
                alert('Maks lengde på for- og etternavn er 30!');
            }
        },
        validateForm() {
            if (this.first_name.length > 30) {
                this.formValid = false;
            } else if (this.last_name.length > 30) {
                this.formValid = false;
            } else {
                this.formValid = true;
            }
        }
    }
};
</script>

<style scoped>
form {
    display: grid;
    grid-gap: 0.5rem;
    max-width: 300px;
    width: 100%;
}

.button {
    margin-top: 1rem;
}
</style>
