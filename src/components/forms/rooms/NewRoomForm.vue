<template>
    <form @submit.prevent="addRoom">
        <div>
            <label for="name">Romnavn</label>
            <input type="text" name="name" v-model.trim="room.room_name" />
        </div>
        <div>
            <label for="size">Antall plasser</label>
            <input type="number" name="size" v-model.number="room.size" />
        </div>
        <div>
            <label for="building">Tilhørende bygg</label>
            <select name="building" v-model.trim="room.building_id">
                <option :value="null">Velg bygg</option>
                <option value="ny">Ny bygning</option>
                <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">{{
                    b.building_name
                }}</option>
            </select>
        </div>
        <div v-if="room.building_id === 'ny'">
            <label for="new">Navn på bygning</label>
            <input type="text" name="new" v-model.trim="newBuilding" />
        </div>
        <div class="actions">
            <base-button>Legg til rom</base-button>
        </div>
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
            newBuilding: '',
            formIsValid: true
        };
    },
    computed: {
        buildings() {
            return this.$store.getters['buildings/buildings'];
        }
    },
    methods: {
        addRoom() {
            this.validateForm();
            if (this.formIsValid && this.newBuilding) {
                this.$store.dispatch('rooms/addRoomAndBuilding', { ...this.room, building_name: this.newBuilding });
                this.$router.replace('/rom');
            } else if (this.formIsValid) {
                const building_name = this.buildings.find(b => b.building_id === this.room.building_id).building_name;
                this.$store.dispatch('rooms/addRoom', { ...this.room, building_name });
                this.$router.replace('/rom');
            }
        },
        validateForm() {
            const { room_name, size, building_id } = this.room;
            if (!room_name || room_name.length > 30) {
                this.formIsValid = false;
                alert('Ugyldig romnavn');
            } else if (!size || size <= 0) {
                this.formIsValid = false;
                alert('Ugyldig romstørrelse');
            } else if (!building_id) {
                this.formIsValid = false;
                alert('Velg et bygg');
            } else if (building_id === 'ny' && (!this.newBuilding || this.newBuilding.length > 30)) {
                this.formIsValid = false;
                alert('Ugyldig navn på bygning');
            } else {
                this.formIsValid = true;
            }
        }
    }
};
</script>

<style scoped>
input,
select {
    font-family: inherit;
    font-size: 1rem;
}

form div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    text-align: start;
}

label {
    margin-bottom: 0.2rem;
}

.actions {
    margin-top: 2rem;
}

input[type='text'],
input[type='number'] {
    text-align: center;
}

select {
    padding: 1px 1.4rem;
}
</style>
