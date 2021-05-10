<template>
    <base-card>
        <h2>Ny konto</h2>
        <base-spinner v-if="loading"></base-spinner>
        <form @submit.prevent="handleSave" v-else>
            <div class="admin">
                <input type="checkbox" @change="setIsAdmin" :checked="isAdmin" />
                <label>Administrator</label>
            </div>
            <div>
                <label>Fornavn</label>
                <input type="text" required v-model="first_name" minlength="2" />
            </div>
            <div>
                <label>Etternavn</label>
                <input type="text" required v-model="last_name" minlength="2" />
            </div>
            <div>
                <label>E-post</label>
                <input type="email" required v-model="email" />
            </div>
            <div class="org" v-if="!isAdmin">
                <label>Organisasjon</label>
                <select v-model="organization_id" required>
                    <option :value="null">Velg organisasjon</option>
                    <option v-for="org in organizations" :key="org.organization_id" :value="org.organization_id">{{
                        org.organization_name
                    }}</option>
                </select>
            </div>
            <base-button class="button">Opprett</base-button>
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
form {
    position: relative;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
}

input[type='text'],
input[type='email'],
input[type='number'],
select {
    width: 100%;
}
label {
    font-weight: 500;
}
.button {
    grid-column: 2;
}
.admin {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.org {
    grid-row: 3;
    grid-column: 2;
}
.loader {
    position: absolute;
    top: 0;
}
</style>
