<template>
    <form @submit.prevent="addUser">
        <div>
            <label for="firstname">Fornavn</label>
            <input required type="text" name="firstname" v-model.trim="first_name" />
        </div>
        <div>
            <label for="lastname">Etternavn</label>
            <input required type="text" name="lastname" v-model.trim="last_name" />
        </div>
        <div>
            <label for="email">E-post</label>
            <input required type="email" name="email" v-model.trim="email" />
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
                this.$store.dispatch('users/registerUser', {
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
