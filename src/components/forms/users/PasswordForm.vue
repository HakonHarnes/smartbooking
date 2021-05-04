<template>
    <form @submit.prevent="submitForm">
        <section class="inputs">
            <input
                @blur="validatePassword"
                :class="passwordStyle"
                type="password"
                placeholder="Nytt passord"
                v-model="password"
            />
            <input
                @blur="checkEquality"
                :class="confirmPasswordStyle"
                type="password"
                placeholder="Gjenta nytt passord"
                v-model="confirmPassword"
            />
        </section>
        <base-button>{{ buttonText }}</base-button>
        <p>Gå tilbake til <router-link to="/login">innlogging</router-link></p>
    </form>
</template>

<script>
export default {
    props: ['button-text', 'user'],
    emits: ['submit-form'],
    computed: {
        passwordStyle() {
            return this.validPassword ? '' : 'error';
        },
        confirmPasswordStyle() {
            return this.equalPassword ? '' : 'error';
        },
        toast() {
            return this.$store.getters.toast;
        }
    },
    data() {
        return {
            password: '',
            confirmPassword: '',
            validPassword: true,
            equalPassword: true
        };
    },
    methods: {
        validatePassword() {
            const minPasswordLength = this.user.role === 'user' ? 8 : 12;

            // Checks if password is long enough
            if (this.password.length < minPasswordLength) {
                this.validPassword = false;
                return this.toast.error(`Passordet ditt må være minimum ${minPasswordLength} tegn langt.`);
            }

            // Checks if password contains first name, last name or email
            const pattern = new RegExp(
                `${this.user.first_name}|${this.user.last_name}|${this.user.email.split('@')[0]}`,
                'gi'
            );
            if (this.password.match(pattern)) {
                this.validPassword = false;
                return this.toast.error('Passordet kan ikke inneholde fornavn, etternavn eller epost.');
            }

            this.validPassword = true;
        },
        checkEquality() {
            if (this.password !== this.confirmPassword) {
                this.equalPassword = false;
                return this.toast.error('Passordene er ikke like.');
            }

            this.equalPassword = true;
        },
        submitForm() {
            this.validatePassword();
            this.checkEquality();

            if (this.equalPassword && this.validPassword) {
                this.$emit('submit-form', { password: this.password });
            }
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

.error {
    background-color: lightcoral;
}

.inputs {
    display: grid;
    gap: 0.5rem;
}
</style>
