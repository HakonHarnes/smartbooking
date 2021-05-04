<template>
    <div class="root">
        <base-card class="card">
            <user-information
                :first_name="user.first_name"
                :last_name="user.last_name"
                :email="user.email"
            ></user-information>
        </base-card>
        <base-card class="card">
            <base-spinner v-if="loading"></base-spinner>
            <customer-information v-else></customer-information>
        </base-card>
        <base-card class="card">
            <authentication-settings></authentication-settings>
        </base-card>
        <base-card class="card">
            <change-password></change-password>
        </base-card>
    </div>
</template>

<script>
import AuthenticationSettings from '../components/settings/AuthenticationSettings';
import ChangePassword from '../components/settings/ChangePassword';
import CustomerInformation from '../components/settings/CustomerInformation';
import UserInformation from '../components/settings/UserInformation';

export default {
    components: { AuthenticationSettings, ChangePassword, CustomerInformation, UserInformation },
    computed: {
        user() {
            return this.$store.getters['auth/user'];
        },
        loading() {
            return this.$store.getters.loading;
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
