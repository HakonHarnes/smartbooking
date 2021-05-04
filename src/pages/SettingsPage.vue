<template>
    <div class="root">
        <base-card class="card">
            <user-information
                :first_name="user.first_name"
                :last_name="user.last_name"
                :email="user.email"
            ></user-information>
        </base-card>
        <base-card class="card" v-if="isCustomer">
            <base-spinner v-if="loading"></base-spinner>
            <customer-information
                v-else-if="customer"
                :organization_name="customer.organization_name"
                :organization_number="customer.organization_number"
                :organization_address="customer.organization_address"
                :postal_code="customer.postal_code"
                :postal_zone="customer.postal_zone"
            ></customer-information>
        </base-card>
        <base-card class="card">
            <authentication :two_f="user.two_factor" :two_f_method="user.two_factor_method"></authentication>
        </base-card>
        <base-card class="card">
            <change-password></change-password>
        </base-card>
        <base-card class="card last">
            <base-button @click="logout">Logg ut</base-button>
        </base-card>
    </div>
</template>

<script>
import Authentication from '../components/settings/Authentication';
import ChangePassword from '../components/settings/ChangePassword';
import CustomerInformation from '../components/settings/CustomerInformation';
import UserInformation from '../components/settings/UserInformation';

export default {
    components: { Authentication, ChangePassword, CustomerInformation, UserInformation },
    data() {
        return {
            customer: null
        };
    },
    computed: {
        user() {
            return this.$store.getters['auth/user'];
        },
        loading() {
            return this.$store.getters.loading;
        },
        isCustomer() {
            return this.$store.getters['auth/user'].role === 'customer';
        }
    },
    methods: {
        async getCustomer() {
            this.customer = await this.$store.dispatch('users/getCustomer');
        }
    },
    created() {
        if (this.isCustomer) {
            this.getCustomer();
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
.root {
    display: grid;
    padding: 1rem;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: min-content;
}

.last {
    grid-column: 1 / -1;
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
