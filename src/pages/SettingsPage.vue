<template>
    <div class="root">
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

export default {
    components: { Authentication, ChangePassword },
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
        },
        async logout() {
            await this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    },
    created() {
        if (this.isCustomer) {
            this.getCustomer();
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
