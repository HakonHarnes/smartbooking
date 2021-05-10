<template>
    <div class="root">
        <base-card v-if="user && user.role === 'user'" class="card">
            <welcome-user :organization_name="user.organization_name"></welcome-user>
        </base-card>
        <base-card v-if="user && user.role === 'customer'" class="card"
            ><organization-information
                :organization_name="user.organization_name"
                :organization_address="user.organization_address"
                :organization_number="user.organization_number"
                :postal_code="user.postal_code"
                :postal_zone="user.postal_zone"
            ></organization-information
        ></base-card>
        <base-card v-if="user" class="card">
            <user-information
                :first_name="user.first_name"
                :last_name="user.last_name"
                :email="user.email"
            ></user-information>
        </base-card>
    </div>
</template>

<script>
import OrganizationInformation from '../components/dashboard/OrganizationInformation';
import UserInformation from '../components/dashboard/UserInformation';
import WelcomeUser from '../components/dashboard/WelcomeUser';

export default {
    components: { OrganizationInformation, UserInformation, WelcomeUser },
    computed: {
        user() {
            return this.$store.getters['auth/user'];
        }
    }
};
</script>

<style scoped>
.card {
    width: 100%;
}

.root {
    padding: 1.4rem;
    display: grid;
    grid-gap: 1rem;
    grid-template-rows: min-content min-content;
}
</style>
