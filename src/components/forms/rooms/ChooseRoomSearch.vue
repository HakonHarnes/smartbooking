<template>
    <base-card class="card">
        <base-spinner v-if="loading"></base-spinner>
        <form v-else-if="!loading && buildings" @submit.prevent="go">
            <div class="form-control">
                <label>Bygg</label>
                <select name="building" @change="handleChange">
                    <option :value="null">Velg bygg</option>
                    <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">{{
                        b.building_name
                    }}</option>
                </select>
            </div>
            <div class="form-control">
                <label>Rom</label>
                <select name="room" @change="handleChange" :disabled="!buildingId">
                    <option :value="null">Velg rom</option>
                    <option v-for="room in filteredRooms" :key="room.id" :value="room.id">{{ room.name }}</option>
                </select>
            </div>
            <div class="form-control">
                <base-button>Gå</base-button>
            </div>
        </form>
    </base-card>
</template>

<script>
export default {
    emits: ['load-room'],
    data() {
        return {
            buildingId: null,
            roomId: null,
            buildings: [
                { building_id: 0, building_name: 'A-Bygget' },
                { building_id: 1, building_name: 'B-Bygget' }
            ],
            rooms: [
                { id: 0, buildingId: 0, name: '301', seats: 8 },
                { id: 1, buildingId: 0, name: '302', seats: 6 },
                { id: 2, buildingId: 1, name: 'B-02', seats: 6 }
            ]
            // Remove comments to enable API
            /* buildings: null,
            rooms: [] */
        };
    },
    computed: {
        filteredRooms() {
            return this.rooms.filter(({ buildingId }) => (this.buildingId ? buildingId === +this.buildingId : false));
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        go() {
            if (this.roomId) {
                this.$emit('load-room', this.roomId);
            }
        },
        handleChange({ target }) {
            this[`${target.name}Id`] = target.value;
        },
        async getBuildings() {
            const buildings = await this.$store.dispatch('buildings/getBuildings');
            this.buildings = [...buildings];
            console.log(buildings);
        }
    },
    mounted() {
        // Remove comments to enable API
        // this.getBuildings();
    }
};
</script>

<style scoped>
.card {
    margin: 2rem 0 1rem;
    width: min-content;
}

form {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

form div {
    display: flex;
    flex-direction: column;
    align-items: start;
}

select {
    padding: 0.3rem 0.2rem;
    font-family: inherit;
    min-width: 10rem;
    font-size: 0.9rem;
}

label {
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.3rem;
}
.form-control {
    margin: 0 1rem;
}
</style>
