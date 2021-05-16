<template>
    <form @submit.prevent="submitForm">
        <section class="inputs">
            <div>
                <input
                    v-model="password"
                    type="password"
                    @blur="validatePassword(false)"
                    @input="validatePassword(true)"
                    placeholder="Nytt passord"
                    maxlength="255"
                    required
                />
                <password-meter :style="passwordMeterStyle" :password="password" />
            </div>

            <input
                v-model="confirmPassword"
                type="password"
                @blur="checkEquality(false)"
                @input="checkEquality(true)"
                :style="confirmPasswordStyle"
                placeholder="Gjenta nytt passord"
                maxlength="255"
                required
            />
        </section>
        <base-button>{{ buttonText }}</base-button>
        <p>Gå tilbake til <router-link to="/login">innlogging</router-link></p>
    </form>
</template>

<script>
import PasswordMeter from 'vue-simple-password-meter';

export default {
    props: ['button-text', 'user'],
    emits: ['submit-form'],
    components: {
        PasswordMeter
    },
    computed: {
        toast() {
            return this.$store.getters.toast;
        },
        passwordMeterStyle() {
            if (this.password.length === 0) return 'background-color: #8f8f8f';
            if (!this.validPassword) return 'background-color: #f95e68';
            return '';
        },
        confirmPasswordStyle() {
            if (this.confirmPassword.length === 0) return 'border-bottom: 6px solid #8f8f8f';
            if (!this.equalPassword) return 'border-bottom: 6px solid #f95e68';
            return 'border-bottom: 6px solid #89bb1d;';
        }
    },
    data() {
        return {
            password: '',
            confirmPassword: '',
            validPassword: false,
            equalPassword: false
        };
    },
    methods: {
        validatePassword(silent) {
            const minPasswordLength = this.user.role === 'user' ? 8 : 12;

            // Checks if password is long enough
            if (this.password.length < minPasswordLength) {
                if (!silent && this.password.length > 0) {
                    this.toast.error(`Passordet ditt må være minimum ${minPasswordLength} tegn langt.`);
                }
                return (this.validPassword = false);
            }
            // Checks if password contains first name, last name or email
            const pattern = new RegExp(
                `${this.user.first_name}|${this.user.last_name}|${this.user.email.split('@')[0]}`,
                'gi'
            );
            if (this.password.match(pattern)) {
                if (!silent && this.password.length > 0)
                    this.toast.error('Passordet kan ikke inneholde fornavn, etternavn eller epost.');
                return (this.validPassword = false);
            }

            this.validPassword = true;
        },
        checkEquality(silent) {
            if (this.password !== this.confirmPassword || this.confirmPassword.length === 0) {
                if (!silent && this.confirmPassword.length > 0) this.toast.error('Passordene er ikke like.');
                return (this.equalPassword = false);
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
    margin: 0;
}

input:focus {
    outline: none;
}

.inputs {
    display: grid;
    gap: 0.5rem;
}

.po-password-strength-bar {
    border-radius: 0px;
    transition: all 0s linear;
    height: 5px;
    margin-top: 0px;
}

.po-password-strength-bar.risky,
.po-password-strength-bar.guessable {
    background-color: #fb964d;
}

.po-password-strength-bar.weak {
    background-color: #fdd244;
}

.po-password-strength-bar.safe,
.po-password-strength-bar.secure {
    background-color: #89bb1d;
}
</style>
