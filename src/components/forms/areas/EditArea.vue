<template>
    <base-modal v-if="showModal">
        <template #body>Er du sikker?</template>
    </base-modal>
    <div class="header">
        <h3>Rediger område</h3>
        <base-button class="delete" @click="deleteBuilding" mode="delete" type="button">Slett</base-button>
    </div>
    <form @submit.prevent="save">
        <div class="control">
            <label>Navn</label>
            <input required type="text" v-model.trim="building.building_name" />
        </div>
        <div class="control switches">
            <label class="marginBottom">{{ activeText }}</label>
            <switches color="blue" @click="toggleActive" :value="!!building.is_active"></switches>
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
                is_active: null
            }
        };
    },
    methods: {
        save() {
            console.log(this.building);
            this.$emit('close-modal');
            this.$store.dispatch('buildings/updateBuilding', { building: this.building });
        },
        toggleActive() {
            this.building.is_active = this.building.is_active ? 0 : 1;
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
            return this.building.is_active ? 'Tilgjengelig' : 'Utilgjengelig';
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
    align-items: center;
}

.actions {
    margin-top: 1rem;
}

.actions > * {
    margin: 0 0.2rem;
}

.control {
    display: flex;
    flex-direction: column;
    margin: 0.6rem 0;
}

.marginBottom {
    margin-bottom: 0.6rem;
}

input {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.2rem;
}

.switches {
    align-items: center;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #386881;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
