<template>
    <base-spinner v-if="!buildings.length"></base-spinner>
    <base-card v-else class="card">
        <form @submit.prevent="go">
            <div class="form-control">
                <label>Bygg</label>
                <select name="building" @change="handleBuildingChange" required v-model="building_id">
                    <option :value="null">Velg bygg</option>
                    <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">{{
                        b.building_name
                    }}</option>
                </select>
            </div>
            <div class="form-control">
                <label>Rom</label>
                <select name="room" :disabled="!filteredRooms.length" required v-model="room_id">
                    <option :value="null">{{
                        filteredRooms.length || !building_id ? 'Velg rom' : 'Fant ingen rom'
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
    props: {
        b_id: Number,
        r_id: Number
    },
    data() {
        return {
            building_id: this.b_id,
            room_id: this.r_id,
            error: null
        };
    },
    watch: {
        b_id(val) {
            this.building_id = val;
        },
        r_id(val) {
            this.room_id = val;
        }
        /* building_id() {
            this.room_id = null;
        } */
    },
    computed: {
        buildings() {
            return this.$store.getters['buildings/buildings'];
        },
        rooms() {
            return this.$store.getters['rooms/rooms'];
        },
        filteredRooms() {
            return this.rooms.filter(({ building_id }) =>
                this.building_id ? building_id === +this.building_id : false
            );
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        go() {
            if (this.room_id && this.building_id) {
                this.error = null;
                this.$emit('load-room', this.room_id, this.building_id);
            } else {
                this.error = 'Vennligst velg en bygning og et rom!';
            }
        },
        handleBuildingChange() {
            this.room_id = null;
        }
        /* handleChange({ target }) {
            this[`${target.name}_id`] = target.value;
        } */
    },
    created() {
        /* const { rom: room_id, bygg: building_id } = this.$route.query;
        if (room_id && building_id) {
            this.room_id = room_id;
            this.building_id = building_id;
        } */
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
    position: relative;
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
