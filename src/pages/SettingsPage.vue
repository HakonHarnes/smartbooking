<template>
    <div class="root">
        <base-card class="card">
            <authentication-settings></authentication-settings>
        </base-card>
        <base-card class="card">
            <update-password></update-password>
        </base-card>
        <base-card class="card last">
            <base-button @click="logout">Logg ut</base-button>
        </base-card>
    </div>
</template>

<script>
import AuthenticationSettings from '../components/settings/AuthenticationSettings';
import UpdatePassword from '../components/settings/UpdatePassword';

export default {
    components: { AuthenticationSettings, UpdatePassword },
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
