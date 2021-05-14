<template>
    <base-card>
        <h2>Ny konto</h2>
        <base-spinner v-if="loading"></base-spinner>
        <form @submit.prevent="handleSave" v-else>
            <div class="admin">
                <input type="checkbox" @change="setIsAdmin" :checked="isAdmin" />
                <label>Administrator</label>
            </div>
            <input type="text" placeholder="Fornavn" v-model="first_name" minlength="2" maxlength="255" required />
            <input type="text" placeholder="Etternavn" required v-model="last_name" minlength="2" maxlength="255" />
            <input type="email" placeholder="E-post" maxlength="255" required v-model="email" />
            <div class="org" v-if="!isAdmin">
                <select v-model="organization_id" required>
                    <option :value="null">Velg organisasjon</option>
                    <option v-for="org in organizations" :key="org.organization_id" :value="org.organization_id">{{
                        org.organization_name
                    }}</option>
                </select>
            </div>
            <base-button class="button">{{ buttonText }}</base-button>
        </form>
    </base-card>
</template>

<script>
export default {
    data() {
        return {
            organization_id: null,
            isAdmin: false,
            first_name: '',
            last_name: '',
            email: ''
        };
    },
    computed: {
        organizations() {
            return this.$store.getters['organizations/organizations'];
        },
        toast() {
            return this.$store.getters.toast;
        },
        loading() {
            return this.$store.getters.loading;
        },
        buttonText() {
            return `Opprett ${this.isAdmin ? 'admin' : 'kunde'}`;
        }
    },
    methods: {
        async handleSave() {
            const newAccount = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                role: this.isAdmin ? 'admin' : 'customer',
                organization_id: this.isAdmin ? undefined : this.organization_id
            };

            if (await this.$store.dispatch('users/register', newAccount)) {
                this.toast.success('Konto lagt til.');
                this.$router.replace('/kontoer');
            }
        },
        setIsAdmin({ target }) {
            this.isAdmin = target.checked;
        }
    }
};
</script>

<style scoped>
base-card {
    display: grid;
    place-items: center center;
}

form {
    display: grid;
    grid-gap: 0.5rem;
    max-width: 300px;
    width: 100%;
}

input[type='text'],
input[type='email'],
input[type='number'],
select {
    width: 100%;
}

.admin {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
}

.button {
    margin-top: 0.5rem;
}

.loader {
    position: absolute;
    top: 0;
}
</style>
