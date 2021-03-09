<template>
    <base-card class="card">
        <form @submit.prevent="search">
            <div class="form-control">
                <label>Bygg</label>
                <select name="building" @change="handleChange">
                    <option :value="null">Velg bygg</option>
                    <option v-for="b in buildings" :key="b.id" :value="b.id">{{ b.name }}</option>
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
    data() {
        return {
            buildingId: null,
            roomId: null,
            buildings: [
                { id: 0, name: 'A-Bygget' },
                { id: 1, name: 'B-Bygget' }
            ],
            rooms: [
                { id: 0, buildingId: 0, name: '301', seats: 8 },
                { id: 1, buildingId: 0, name: '302', seats: 6 },
                { id: 2, buildingId: 1, name: 'B-02', seats: 6 }
            ]
        };
    },
    computed: {
        filteredRooms() {
            return this.rooms.filter(({ buildingId }) => (this.buildingId ? buildingId === +this.buildingId : false));
        }
    },
    methods: {
        go() {},
        handleChange({ target }) {
            this[`${target.name}Id`] = target.value;
        }
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
