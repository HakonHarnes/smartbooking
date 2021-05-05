<template>
    <form @submit.prevent="submitForm">
        <section class="inputs">
            <input
                    v-model="oldPassword"
                    type="password"
                    placeholder="Nåværende passord"
                />
            <div>
                <input
                    v-model="newPassword"
                    type="password"
                    @blur="validatePassword(false)"
                    @input="validatePassword(true)"
                    placeholder="Nytt passord"
                />
                <password-meter :style="passwordMeterStyle" :password="newPassword" />
            </div>

            <input
                v-model="confirmNewPassword"
                type="password"
                @blur="checkEquality(false)"
                @input="checkEquality(true)"
                :style="confirmPasswordStyle"
                placeholder="Gjenta nytt passord"
            />
        </section>
        <base-button>Endre passord</base-button>
    </form>
</template>

<script>
import PasswordMeter from 'vue-simple-password-meter';

export default {
    props: ['user'],
    emits: ['submit-form'],
    components: {
        PasswordMeter
    },
    computed: {
        toast() {
            return this.$store.getters.toast;
        },
        passwordMeterStyle() {
            if (this.newPassword.length === 0) return 'background-color: #8f8f8f';
            if (!this.validPassword) return 'background-color: #f95e68';
            return '';
        },
        confirmPasswordStyle() {
            if (this.confirmNewPassword.length === 0) return 'border-bottom: 6px solid #8f8f8f';
            if (!this.equalPassword) return 'border-bottom: 6px solid #f95e68';
            return 'border-bottom: 6px solid #89bb1d;';
        }
    },
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            validPassword: false,
            equalPassword: false
        };
    },
    methods: {
        validatePassword(silent) {
            const minPasswordLength = this.user.role === 'user' ? 8 : 12;

            // Checks if password is long enough
            if (this.newPassword.length < minPasswordLength) {
                if (!silent && this.newPassword.length > 0)
                    this.toast.error(`Passordet ditt må være minimum ${minPasswordLength} tegn langt.`);
                return (this.validPassword = false);
            }
            // Checks if password contains first name, last name or email
            const pattern = new RegExp(
                `${this.user.first_name}|${this.user.last_name}|${this.user.email.split('@')[0]}`,
                'gi'
            );
            if (this.newPassword.match(pattern)) {
                if (!silent && this.newPassword.length > 0)
                    this.toast.error('Passordet kan ikke inneholde fornavn, etternavn eller epost.');
                return (this.validPassword = false);
            }

            this.validPassword = true;
        },
        checkEquality(silent) {
            if (this.newPassword !== this.confirmNewPassword || this.confirmNewPassword.length === 0) {
                if (!silent && this.confirmNewPassword.length > 0) this.toast.error('Passordene er ikke like.');
                return (this.equalPassword = false);
            }
            this.equalPassword = true;
        },
        submitForm() {
            this.validatePassword();
            this.checkEquality();
            if (this.equalPassword && this.validPassword) {
                this.$emit('submit-form', { oldPassword: this.oldPassword, newPassword: this.newPassword });
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
    max-width: 300px;
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
    border: 1px solid grey;
    padding: 0.5rem;
    margin: 0;
    font-size: 1.1rem;
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
