<template>
    <base-card>
        <h2>Ny organisasjon</h2>
        <base-spinner v-if="loading"></base-spinner>
        <form @submit.prevent="handleCreate">
            <input type="text" placeholder="Navn" maxlength="255" required v-model.trim="newOrg.organization_name" />
            <input
                type="number"
                placeholder="Organisasjonsnummer"
                minlength="9"
                maxlength="9"
                required
                v-model.number="newOrg.organization_number"
            />
            <input
                type="text"
                placeholder="Kontaktperson"
                maxlength="255"
                required
                v-model.trim="newOrg.contact_name"
            />
            <input
                type="text"
                placeholder="Adresse"
                maxlength="255"
                required
                v-model.trim="newOrg.organization_address"
            />
            <input
                type="text"
                placeholder="Postnummer"
                required
                v-model="newOrg.postal_code"
                minlength="4"
                maxlength="4"
                pattern="^[0-9]{4}$"
            />
            <input type="text" placeholder="Poststed" required v-model.trim="newOrg.postal_zone" minlength="2" />
            <base-button class="button">Opprett</base-button>
        </form>
    </base-card>
</template>

<script>
export default {
    data() {
        return {
            newOrg: {
                organization_name: '',
                organization_number: null,
                organization_address: '',
                postal_code: null,
                postal_zone: '',
                contact_name: ''
            }
        };
    },
    computed: {
        toast() {
            return this.$store.getters.toast;
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        async handleCreate() {
            if (await this.$store.dispatch('organizations/createOrganization', { ...this.newOrg })) {
                this.toast.success('Organisasjon opprettet.');
                this.$router.replace('/organisasjoner');
            }
        }
    }
};
</script>

<style scoped>
label {
    font-weight: 500;
}

form {
    display: grid;
    grid-gap: 0.5rem;
    max-width: 300px;
    width: 100%;
}

input[type='text'],
input[type='number'] {
    width: 100%;
}

.button {
    margin-top: 0.5rem;
}
</style>
