<template>
    <form @submit.prevent="submitForm">
        <input type="text" placeholder="Navn" maxlength="255" v-model.trim="room.room_name" required />
        <input type="number" placeholder="Antall plasser" max="1000" v-model.trim="room.size" required />
        <select required name="building" v-model.trim="room.building_id">
            <option :value="null">Velg bygg</option>
            <option v-for="building in buildings" :key="building.building_id" :value="building.building_id">{{
                building.building_name
            }}</option>
        </select>
        <base-button class="button">Legg til rom</base-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            room: {
                room_name: '',
                size: null,
                building_id: null
            },
            isBuilding: false,
            building_name: '',
            formIsValid: true
        };
    },
    computed: {
        buildings() {
            return this.$store.getters['buildings/buildings'];
        },
        toast() {
            return this.$store.getters.toast;
        }
    },
    methods: {
        async submitForm() {
            this.validateForm();

            const building_name = this.buildings.find(b => b.building_id === this.room.building_id).building_name;
            if (await this.$store.dispatch('rooms/addRoom', { ...this.room, building_name })) {
                this.toast.success('Rom opprettet.');
                this.$router.replace('/rom');
            }
            this.$router.replace('/rom');
        },
        validateForm() {
            const { room_name, size, building_id } = this.room;
            if (!room_name || room_name.length > 30) {
                this.formIsValid = false;
                this.toast.warning('Ugyldig romnavn');
            } else if (!size || size <= 0) {
                this.formIsValid = false;
                this.toast.warning('Ugyldig romstørrelse');
            } else if (!building_id) {
                this.formIsValid = false;
                this.toast.warning('Velg et bygg');
            } else {
                this.formIsValid = true;
            }
        }
    }
};
</script>

<style scoped>
form {
    display: grid;
    grid-gap: 0.5rem;
    max-width: 300px;
    width: 100%;
}

.button {
    margin-top: 0.5rem;
}
</style>
