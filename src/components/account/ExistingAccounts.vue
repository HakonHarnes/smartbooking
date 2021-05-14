<template>
    <div class="container">
        <div class="search">
            <base-search @search="search"></base-search>
            <div class="filters">
                <select v-model="accountType">
                    <option :value="''">Alle kontotyper</option>
                    <option value="admin">Administrator</option>
                    <option value="customer">Kunde</option>
                </select>
            </div>
        </div>
        <base-spinner v-if="loading"></base-spinner>
        <ul v-else>
            <template v-for="(acc, idx) in filteredAccounts" :key="acc.user_id">
                <li @click="selectItem(idx)">
                    <div class="fullname">
                        <div class="name">{{ acc.first_name }} {{ acc.last_name }}</div>
                        <div>{{ getRole(acc.role) }}</div>
                    </div>
                    <div class="email">
                        <h4>E-post</h4>
                        <div class="atttribute">{{ acc.email }}</div>
                    </div>
                    <div class="org">
                        <template v-if="acc.role === 'customer'"
                            ><h4>Organisasjon</h4>
                            <div class="atttribute">{{ acc.organization_name }}</div></template
                        >
                    </div>
                    <div class="active">
                        <div class="atttribute">
                            <base-active-attribute
                                :active="acc.is_active === 1"
                                :text="{ true: 'Aktiv', false: 'Inaktiv' }"
                            ></base-active-attribute>
                        </div>
                    </div>
                    <div class="icon">
                        <base-icon v-if="selectedItem === idx" name="expand_less"></base-icon>
                        <base-icon v-else name="expand_more"></base-icon>
                    </div>
                </li>
                <div class="expanded" v-if="selectedItem === idx">
                    <form @submit.prevent="handleUpdate">
                        <div>
                            <label>Fornavn</label>
                            <input type="text" required v-model="updateValues.first_name" minlength="2" />
                        </div>
                        <div>
                            <label>Etternavn</label>
                            <input type="text" required v-model="updateValues.last_name" minlength="2" />
                        </div>
                        <div>
                            <label>E-post</label>
                            <input type="email" required v-model="updateValues.email" />
                        </div>
                        <div class="form-active">
                            <input type="checkbox" @change="handleCheckbox" :checked="updateValues.is_active === 1" />
                            <label>Aktiv</label>
                        </div>
                        <base-button class="button">Oppdater</base-button>
                    </form>
                </div>
            </template>
        </ul>
    </div>
</template>

<script>
import BaseActiveAttribute from '../ui/BaseActiveAttribute.vue';
import { roleToNorwegian } from '../utils';

export default {
    components: { BaseActiveAttribute },
    data() {
        return {
            updateValues: {
                user_id: null,
                first_name: '',
                last_name: '',
                email: '',
                is_active: null
            },
            accountType: '',
            searchWord: '',
            selectedItem: null
        };
    },
    computed: {
        accounts() {
            return this.$store.getters['users/users'];
        },
        filteredAccounts() {
            return this.accounts?.filter(acc => this.filterAccounts(acc));
        },
        loading() {
            return this.$store.getters.loading;
        },
        toast() {
            return this.$store.getters.toast;
        }
    },
    methods: {
        async handleUpdate() {
            if (this.selectedItem >= 0 && this.checkIfUpdated()) {
                if (await this.$store.dispatch('users/updateUser', { user: { ...this.updateValues } })) {
                    this.toast.success('Konto oppdatert.');
                }
            }
        },
        checkIfUpdated() {
            const user = { ...this.accounts[this.selectedItem] };
            const newUser = { ...this.updateValues };
            if (
                user.first_name === newUser.first_name &&
                user.last_name === newUser.last_name &&
                user.email === newUser.email &&
                user.is_active === newUser.is_active
            ) {
                this.toast.warning('Kan ikke oppdatere med samme verdier.');
                return false;
            }
            return true;
        },
        search(word) {
            this.searchWord = word;
        },
        filterAccounts(acc) {
            return (
                acc.role.includes(this.accountType) &&
                (acc.first_name.includes(this.searchWord) || acc.last_name.includes(this.searchWord))
            );
        },
        getRole(role) {
            return roleToNorwegian[role];
        },
        selectItem(idx) {
            this.selectedItem = idx === this.selectedItem ? null : idx;
            this.updateValues = {
                ...this.accounts[idx]
            };
        },
        handleCheckbox({ target }) {
            this.updateValues.is_active = target.checked ? 1 : 0;
        }
    }
};
</script>

<style scoped>
.container {
    margin-top: 2rem;
}

label {
    font-weight: 500;
}

li {
    margin-top: 0.5rem;
    list-style: none;
    padding: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    display: grid;
    grid-template-columns: repeat(3, 1fr) 0.5fr min-content;
    align-items: center;
    cursor: pointer;
    background-color: #fff;
    transition: all 0.1s;
}

li:hover {
    background-color: #5588a327;
}

.icon {
    justify-self: end;
}

ul {
    padding: 0;
}

input[type='text'],
input[type='number'],
input[type='email'] {
    width: 100%;
}

.name {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
}

.fullname {
    justify-self: start;
}

form {
    display: grid;
    grid-gap: 0.8rem;
    grid-template-columns: 1fr 1fr 1fr;
}

.expanded {
    padding: 1rem;
    margin: 0;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

.form-active {
    grid-column: 2;
    justify-self: center;
    display: flex;
    align-items: center;
}

.button {
    grid-column: 2;
    grid-row: 3;
}

.search {
    display: flex;
    align-items: center;
}

.filters {
    margin-left: 2rem;
}

.filters > select {
    height: 43px;
}
</style>
