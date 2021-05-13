<template>
    <form @submit.prevent="addRoom">
        <div class="type">
            <base-button class="button" :mode="isBuilding ? null : 'outlined'" type="button" @click="isBuilding = true"
                >Område</base-button
            >
            <base-button class="button" :mode="isBuilding ? 'outlined' : null" type="button" @click="isBuilding = false"
                >Rom</base-button
            >
        </div>
        <div>
            <label for="name">{{ isBuilding ? 'Navn' : 'Romnavn' }}</label>
            <input required v-if="isBuilding" type="text" name="name" v-model.trim="building_name" />
            <input required v-else type="text" name="name" v-model.trim="room.room_name" />
        </div>
        <div v-if="!isBuilding">
            <label for="size">Antall plasser</label>
            <input required type="number" name="size" v-model.number="room.size" />
        </div>
        <div v-if="!isBuilding">
            <label for="building">Tilhørende bygg</label>
            <select required name="building" v-model.trim="room.building_id">
                <option :value="null">Velg bygg</option>
                <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">{{
                    b.building_name
                }}</option>
            </select>
        </div>
        <div class="actions">
            <base-button>Legg til {{ isBuilding ? 'område' : 'rom' }}</base-button>
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
        async addRoom() {
            this.validateForm();

            if (this.isBuilding && this.formIsValid) {
                if (await this.$store.dispatch('buildings/addBuilding', { building_name: this.building_name })) {
                    this.toast.success('Område opprettet.');
                    this.$router.replace('/rom');
                }
            } else if (this.formIsValid) {
                const building_name = this.buildings.find(b => b.building_id === this.room.building_id).building_name;
                if (await this.$store.dispatch('rooms/addRoom', { ...this.room, building_name })) {
                    this.toast.success('Rom opprettet.');
                    this.$router.replace('/rom');
                }
                this.$router.replace('/rom');
            }
        },
        validateForm() {
            if (!this.isBuilding) {
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
            } else {
                if (!this.building_name) {
                    this.formIsValid = false;
                } else {
                    this.formIsValid = true;
                }
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

.type {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.button:first-of-type {
    margin-right: 1rem;
}
</style>
