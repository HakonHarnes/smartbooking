<template>
    <form @submit.prevent="addRoom">
        <div>
            <label for="name">Romnavn</label>
            <input type="text" name="name" v-model.trim="room.room_name" />
        </div>
        <div>
            <label for="seats">Antall plasser</label>
            <input type="number" name="seats" v-model.number="room.seats" />
        </div>
        <div>
            <label for="description">Beskrivelse</label>
            <input type="text" name="description" v-model.trim="room.description" />
        </div>
        <div>
            <label for="building">Tilhørende bygg</label>
            <input type="text" name="building" v-model.trim="room.building" />
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
                seats: null,
                description: '',
                building: ''
            }
        };
    },
    methods: {
        addRoom() {
            this.$store.dispatch('rooms/addRoom', { ...this.room });
            this.$router.replace('/rom');
        }
    }
};
</script>

<style scoped>
input {
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
</style>
