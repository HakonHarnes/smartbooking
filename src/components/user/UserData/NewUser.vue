<template>
    <div class="container">
        <base-card>
            <h2>Ny bruker</h2>
            <new-user-form />
        </base-card>

        <base-card>
            <h2>Importer brukere</h2>
            <import-users @server-response="setServerResponse" />
        </base-card>

        <server-response :data="errors" type="error" title="Feilmeldinger" />
        <server-response :data="warnings" type="warning" title="Advarsler" />
        <server-response :data="users" type="success" title="Registrerte brukere" />
    </div>
</template>

<script>
import NewUserForm from '../../forms/users/NewUserForm.vue';
import BaseCard from '../../ui/BaseCard.vue';
import ImportUsers from './ImportUsers.vue';
import ServerResponse from '../../../components/server/ServerResponse';

export default {
    components: { ImportUsers, NewUserForm, BaseCard, ServerResponse },
    data() {
        return {
            users: [],
            errors: [],
            warnings: []
        };
    },
    methods: {
        setServerResponse(payload) {
            this.users = payload.users;
            this.errors = payload.errors;
            this.warnings = payload.warnings;
        }
    }
};
</script>

<style scoped>
.container {
    display: grid;
    grid-gap: 1rem;
}

@media only screen and (max-width: 780px) {
    .container {
        grid-template-columns: 1fr;
    }
}
</style>
