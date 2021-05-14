<template>
    <div class="container">
        <base-card>
            <h2>Ny bruker</h2>
            <new-user-form />
        </base-card>

        <base-card>
            <h2>Ny bruker</h2>
            <import-users />
        </base-card>
    </div>
</template>

<script>
import NewUserForm from '../../forms/users/NewUserForm.vue';
import ImportUsers from './ImportUsers.vue';

export default {
    components: { ImportUsers, NewUserForm },
    computed: {
        title() {
            return this.enabled ? 'Importer fra fil' : 'Ny bruker';
        },
        currentTab() {
            return this.enabled ? ImportUsers : NewUserForm;
        }
    },
    data() {
        return {
            enabled: false
        };
    },
    methods: {
        toggleTab() {
            this.enabled = !this.enabled;
        }
    }
};
</script>

<style scoped>
.container {
    display: grid;
    grid-gap: 1rem;
}
</style>
