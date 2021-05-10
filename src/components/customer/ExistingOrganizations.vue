<template>
    <div>
        <base-search @search="search"></base-search>
        <ul>
            <template v-for="(org, idx) in filteredOrganizations" :key="org.organization_id">
                <li @click="selectItem(idx)">
                    <div>
                        <div class="name">{{ org.organization_name }}</div>
                        <div>{{ org.organization_address }}, {{ org.postal_code }} {{ org.postal_zone }}</div>
                    </div>
                    <div class="org_number">
                        <h4>Organisasjonsnummer</h4>
                        <div class="atttribute">{{ org.organization_number }}</div>
                    </div>
                    <div class="contact_person">
                        <h4>Kontaktperson</h4>
                        <div class="atttribute">{{ org.contact_name }}</div>
                    </div>
                    <div class="icon">
                        <base-icon v-if="selectedItem === idx" name="expand_less"></base-icon>
                        <base-icon v-else name="expand_more"></base-icon>
                    </div>
                </li>
                <div class="expanded" v-if="selectedItem === idx">
                    <form @submit.prevent="handleUpdate">
                        <div>
                            <label>Navn</label>
                            <input type="text" required v-model="updateValues.organization_name" />
                        </div>
                        <div>
                            <label>Organisasjonsnummer</label>
                            <input type="number" required v-model.number="updateValues.organization_number" />
                        </div>
                        <div>
                            <label>Kontaktperson</label>
                            <input type="text" required v-model="updateValues.contact_name" />
                        </div>
                        <div>
                            <label>Adresse</label>
                            <input type="text" required v-model="updateValues.organization_address" />
                        </div>
                        <div>
                            <label>Postkode</label>
                            <input
                                type="text"
                                required
                                v-model.number="updateValues.postal_code"
                                minlength="4"
                                maxlength="4"
                                pattern="^[0-9]{4}$"
                            />
                        </div>
                        <div>
                            <label>Poststed</label>
                            <input type="text" required v-model="updateValues.postal_zone" />
                        </div>
                        <base-button class="button">Oppdater</base-button>
                    </form>
                </div>
            </template>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchWord: '',
            selectedItem: null,
            updateValues: {
                organization_id: null,
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
        organizations() {
            return this.$store.getters['organizations/organizations'];
        },
        filteredOrganizations() {
            return this.organizations?.filter(org => org.organization_name.toLowerCase().includes(this.searchWord));
        },
        toast() {
            return this.$store.getters.toast;
        }
    },
    methods: {
        async handleUpdate() {
            if (this.selectedItem >= 0 && this.checkIfUpdated()) {
                if (
                    await this.$store.dispatch('organizations/updateOrganization', {
                        organization: { ...this.updateValues }
                    })
                ) {
                    this.toast.success('Organisasjon oppdatert.');
                }
            }
        },
        checkIfUpdated() {
            const org = { ...this.organizations[this.selectedItem] };
            const newOrg = { ...this.updateValues };
            if (
                org.organization_name === newOrg.organization_name &&
                org.organization_number === newOrg.organization_number &&
                org.organization_address === newOrg.organization_address &&
                org.postal_code === newOrg.postal_code &&
                org.postal_zone === newOrg.postal_zone &&
                org.contact_name === newOrg.contact_name
            ) {
                this.toast.warning('Kan ikke oppdatere med samme verdier.');
                return false;
            }
            return true;
        },
        selectItem(idx) {
            this.selectedItem = idx === this.selectedItem ? null : idx;
            this.updateValues = {
                ...this.organizations[idx]
            };
        },
        search(word) {
            this.searchWord = word;
        }
    }
};
</script>

<style scoped>
.button {
    grid-column: 2 / 2;
}

.expanded {
    padding: 1rem;
    margin: 0;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

.name {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
}

.org_number {
    justify-self: end;
}

.contact_person {
    justify-self: end;
}

label {
    font-weight: 500;
}

li {
    margin-top: 1rem;
    list-style: none;
    padding: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    justify-content: space-between;
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
input[type='number'] {
    width: 100%;
}

form {
    display: grid;
    grid-gap: 0.8rem;
    grid-template-columns: 1fr 1fr 1fr;
}

@media only screen and (max-width: 1000px) {
    li {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr 1fr;
        grid-gap: 0.8rem;
        justify-content: space-between;
    }

    .org_number {
        justify-self: start;
        grid-row: 2;
    }

    .contact_person {
        justify-self: end;
    }

    .icon {
        grid-row: span 2;
    }
}

@media only screen and (max-width: 700px) {
    form {
        grid-template-columns: 1fr 1fr;
    }

    .button {
        grid-column: span 2;
    }

    li {
        grid-template-columns: 1fr min-content;
        grid-template-rows: 1fr 1fr 1fr;
        grid-gap: 0.8rem;
        justify-content: space-between;
    }

    .org_number {
        justify-self: start;
        grid-row: 3;
    }

    .contact_person {
        justify-self: start;
        grid-row: 2;
    }

    .icon {
        grid-row: span 3;
    }
}

@media only screen and (max-width: 450px) {
    form {
        grid-template-columns: 1fr;
    }

    .button {
        grid-column: span 1;
    }
}
</style>
