<template>
    <div class="root">
        <base-card class="card" id="user">
            <user-information
                :first_name="user.first_name"
                :last_name="user.last_name"
                :email="user.email"
            ></user-information>
        </base-card>
        <base-card class="card" id="two-factor">
            <authentication :two_f="user.two_factor" :two_f_method="user.two_factor_method"></authentication>
        </base-card>
        <base-card class="card" id="password">
            <change-password></change-password>
        </base-card>
    </div>
</template>

<script>
import Authentication from '../components/settings/Authentication';
import ChangePassword from '../components/settings/ChangePassword';
import UserInformation from '../components/settings/UserInformation';

export default {
    components: { Authentication, ChangePassword, UserInformation },
    computed: {
        user() {
            return this.$store.getters.user;
        }
    }
};
</script>

<style scoped>
.root {
    padding: 1rem;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: min-content;
}

@media only screen and (max-width: 700px) {
    .root {
        grid-template-columns: 1fr;
    }
}

.card {
    margin: 0;
}
</style>
