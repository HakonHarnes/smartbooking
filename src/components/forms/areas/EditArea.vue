<template>
    <base-modal v-if="showModal">
        <template #body>Er du sikker?</template>
    </base-modal>
    <div class="modal-header">
        <base-button class="delete" @click="deleteBuilding" mode="delete" type="button">Slett</base-button>
        <h2 class="title">Rediger område</h2>
    </div>
    <form @submit.prevent="save">
        <div class="control">
            <label>Navn</label>
            <input required type="text" v-model.trim="building.building_name" maxlength="255" />
        </div>
        <div class="switch">
            <label>{{ activeText }}</label>
            <switches color="blue" @click="toggleActive" :value="!!building.building_is_active"></switches>
        </div>
        <div class="actions">
            <base-button>Lagre</base-button>
            <base-button @click="$emit('close-modal')" type="button" mode="outlined">Lukk</base-button>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        building_id: Number
    },
    emits: ['close-modal'],
    data() {
        return {
            showModal: false,
            building: {
                building_name: '',
                building_id: null,
                building_is_active: null
            }
        };
    },
    methods: {
        save() {
            this.$emit('close-modal');
            if (this.$store.dispatch('buildings/updateBuilding', { building: this.building })) {
                this.toast.success('Data ble oppdatert.');
            }
        },
        toggleActive() {
            this.building.building_is_active = this.building.building_is_active ? 0 : 1;
        },
        async deleteBuilding() {
            if (confirm('Sikker?')) {
                this.$emit('close-modal');
                await this.$store.dispatch('buildings/deleteBuilding', { building_id: this.building_id });
            }
        },
        getSelectedBuilding() {
            if (this.building_id) {
                this.building = { ...this.$store.getters['buildings/building'](this.building_id) };
            }
        }
    },
    computed: {
        activeText() {
            return this.building.building_is_active ? 'Tilgjengelig' : 'Utilgjengelig';
        },
        toast() {
            return this.$store.getters.toast;
        }
    },
    mounted() {
        this.getSelectedBuilding();
    }
};
</script>

<style scoped>
form {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
}

label {
    font-weight: 500;
}

.actions {
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
}

.control {
    text-align: left;
    display: grid;
    grid-gap: 0.2rem;
    margin: 0.6rem 0;
}

.modal-header {
    display: grid;
    grid-template-rows: 1.6rem 1fr;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 0.5rem;
}

.title {
    margin: 0;
}

.switch {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1rem;
    place-items: center left;
    margin: 0.6rem 0;
}

.delete {
    justify-self: right;
}
</style>
