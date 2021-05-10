<template>
    <base-card>
        <h2>Ny organisasjon</h2>
        <base-spinner v-if="loading"></base-spinner>
        <form @submit.prevent="handleCreate">
            <div>
                <label>Navn</label>
                <input type="text" required v-model.trim="newOrg.organization_name" />
            </div>
            <div>
                <label>Organisasjonsnummer</label>
                <input type="number" required v-model.number="newOrg.organization_number" />
            </div>
            <div>
                <label>Kontaktperson</label>
                <input type="text" required v-model.trim="newOrg.contact_name" />
            </div>
            <div>
                <label>Adresse</label>
                <input type="text" required v-model.trim="newOrg.organization_address" minlength="4" />
            </div>
            <div>
                <label>Postnummer</label>
                <input
                    type="text"
                    required
                    v-model="newOrg.postal_code"
                    minlength="4"
                    maxlength="4"
                    pattern="^[0-9]{4}$"
                />
            </div>
            <div>
                <label>Poststed</label>
                <input type="text" required v-model.trim="newOrg.postal_zone" minlength="2" />
            </div>
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
.button {
    grid-column: 2 / 2;
}

label {
    font-weight: 500;
}

form {
    display: grid;
    grid-gap: 2rem;
    grid-row-gap: 1.5rem;
    grid-template-columns: repeat(3, 1fr);
}

input[type='text'],
input[type='number'] {
    width: 100%;
}

@media only screen and (max-width: 700px) {
    form {
        grid-template-columns: 1fr 1fr;
    }

    .button {
        grid-column: span 2;
    }
}

@media only screen and (max-width: 500px) {
    form {
        grid-template-columns: 1fr;
    }

    .button {
        grid-column: span 1;
    }
}
</style>
