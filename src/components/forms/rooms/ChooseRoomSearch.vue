<template>
    <base-card class="card">
        <base-spinner v-if="loading"></base-spinner>
        <form v-else-if="!loading" @submit.prevent="go">
            <div class="form-control">
                <label>Bygg</label>
                <select name="building" @change="handleBuildingChange" required>
                    <option :value="null">Velg bygg</option>
                    <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">{{
                        b.building_name
                    }}</option>
                </select>
            </div>
            <div class="form-control">
                <label>Rom</label>
                <select name="room" @change="handleChange" :disabled="!filteredRooms.length" required>
                    <option :value="null">{{
                        filteredRooms.length || !buildingId ? 'Velg rom' : 'Fant ingen rom'
                    }}</option>
                    <option v-for="room in filteredRooms" :key="room.room_id" :value="room.room_id">{{
                        room.room_name
                    }}</option>
                </select>
            </div>
            <div class="form-control">
                <base-button>Gå</base-button>
            </div>
        </form>
        <div class="error">
            {{ error }}
        </div>
    </base-card>
</template>

<script>
export default {
    emits: ['load-room'],
    data() {
        return {
            buildingId: null,
            roomId: null,
            buildings: null,
            rooms: [],
            error: null
        };
    },
    computed: {
        filteredRooms() {
            return this.rooms.filter(({ building_id }) => (this.buildingId ? building_id === +this.buildingId : false));
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        go() {
            if (this.roomId) {
                this.error = null;
                this.$emit('load-room', this.roomId);
            } else {
                this.error = 'Vennligst velg en bygning og et rom!';
            }
        },
        handleBuildingChange({ target }) {
            this.buildingId = target.value;
            this.getRoomsOnBuilding();
        },
        handleChange({ target }) {
            this[`${target.name}Id`] = target.value;
        },
        async getRoomsOnBuilding() {
            if (this.buildingId) {
                this.rooms = await this.$store.dispatch('rooms/getRoomsInBuilding', this.buildingId);
            } else {
                this.rooms = [];
            }
        },
        async getBuildings() {
            this.buildings = await this.$store.dispatch('buildings/getBuildings');
        }
    },
    mounted() {
        this.getBuildings();
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

.error {
    margin: 0.8rem 0 0;
    color: rgb(197, 32, 32);
}
</style>
