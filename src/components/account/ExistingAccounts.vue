<template>
    <div class="container">
        <div class="filters">
            <base-search @search="search"></base-search>
            <select class="select" v-model="accountType">
                <option :value="''">Alle kontotyper</option>
                <option value="admin">Administratorer</option>
                <option value="customer">Kunder</option>
            </select>
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
                    <form class="expanded-container" @submit.prevent="handleUpdate">
                        <div class="first-name">
                            <label>Fornavn</label>
                            <input
                                type="text"
                                required
                                v-model="updateValues.first_name"
                                minlength="2"
                                maxlength="255"
                            />
                        </div>
                        <div class="last-name">
                            <label>Etternavn</label>
                            <input
                                type="text"
                                required
                                v-model="updateValues.last_name"
                                minlength="2"
                                maxlength="255"
                            />
                        </div>
                        <div class="form-email">
                            <label>E-post</label>
                            <input type="email" required v-model="updateValues.email" maxlength="255" />
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
            return this.accounts ? this.accounts.filter(acc => this.filterAccounts(acc)) : {};
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
                `${acc.first_name} ${acc.last_name} ${acc.email}`.toLowerCase().includes(this.searchWord)
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

input {
    margin-top: 0.3rem;
}

li {
    margin-top: 0.5rem;
    list-style: none;
    padding: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 5rem 2rem;
    align-items: center;
    cursor: pointer;
    background-color: #fff;
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

.filters {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: minmax(auto, 350px) auto;
}

.select {
    max-width: 200px;
}

.filters * {
    height: 100%;
}

@media only screen and (max-width: 1350px) {
    li {
        grid-template-columns: 1fr 5rem 2rem;
    }

    .org {
        margin-top: -1em;

        grid-column: 1;
        grid-row: 2;
    }

    .email {
        margin-top: -1em;
        grid-column: 1;
        grid-row: 3;
    }

    .active {
        grid-row: 1/4;
    }

    .icon {
        grid-row: 1/4;
    }

    h4 {
        visibility: hidden;
    }
}

@media only screen and (max-width: 800px) {
    .expanded {
        display: grid;
        place-items: center center;
    }
    .expanded-container {
        display: grid;
        grid-template-areas:
            'first-name'
            'last-name'
            'form-email'
            'form-active'
            'button';
        grid-template-columns: 1fr;
        max-width: 300px;
    }

    .first-name {
        grid-area: first-name;
    }

    .last-name {
        grid-area: last-name;
    }

    .formemail {
        grid-area: email;
    }

    .form-active {
        grid-area: form-active;
    }

    .button {
        grid-area: button;
    }
}

@media only screen and (max-width: 400px) {
    .filters {
        display: grid;
        grid-template-columns: 1fr;
    }

    .filters * {
        max-width: none;
        width: 100%;
    }

    li {
        grid-template-columns: 1fr;
    }
    .active {
        grid-column: 1;
        grid-row: 4;
    }

    .icon {
        grid-column: 1;
        grid-row: 5;
        justify-self: center;
    }

    h4 {
        visibility: hidden;
    }
}
</style>
