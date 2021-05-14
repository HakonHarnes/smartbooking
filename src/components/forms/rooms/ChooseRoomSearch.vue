<template>
    <base-spinner v-if="!buildings.length"></base-spinner>
    <form @submit.prevent="go">
        <select name="building" @change="handleBuildingChange" required v-model="building_id">
            <option :value="null">Velg bygg</option>
            <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">{{ b.building_name }}</option>
        </select>
        <select name="room" :disabled="!filteredRooms.length" required v-model="room_id">
            <option :value="null">{{ filteredRooms.length || !building_id ? 'Velg rom' : 'Fant ingen rom' }}</option>
            <option v-for="room in filteredRooms" :key="room.room_id" :value="room.room_id">{{
                room.room_name
            }}</option>
        </select>
        <base-button class="go-button">Gå</base-button>
    </form>
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
form {
    display: grid;
    grid-template-areas: 'building room button';
    grid-template-columns: 1fr 1fr auto;
    grid-gap: 0.5rem;
    max-width: 500px;
}

.go-button {
    width: 80px;
}

@media only screen and (max-width: 650px) {
    form {
        max-width: 650px;
    }
}
</style>
