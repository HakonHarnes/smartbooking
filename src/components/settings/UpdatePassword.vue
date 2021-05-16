<template>
    <section>
        <h2>Endre passord</h2>
        <update-password-form
            @submit-form="updatePassword"
            button-text="Sett passord"
            :user="user"
        ></update-password-form>
    </section>
</template>

<script>
import UpdatePasswordForm from '../forms/password/UpdatePasswordForm';
export default {
    components: { UpdatePasswordForm },
    computed: {
        toast() {
            return this.$store.getters.toast;
        },
        user() {
            return this.$store.getters['auth/user'];
        }
    },
    data() {
        return {
            oldPassword: '',
            newpassword: '',
            confirmNewPassword: ''
        };
    },
    methods: {
        async updatePassword(data) {
            const response = await this.$store.dispatch('auth/updatePassword', {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            });

            if (response.status == '200') this.toast.success('Passordet ble endret!');
        }
    }
};
</script>

<style scoped>
section {
    display: grid;
    max-width: 300px;
    width: 100%;
}
</style>
