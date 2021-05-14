<template>
    <div class="container">
        <base-card class="new-place">
            <h2>Nytt område</h2>
            <new-area-form />
        </base-card>

        <base-card class="new-room">
            <h2>Nytt rom</h2>
            <new-room-form />
        </base-card>

        <base-card class="import-room">
            <h2>Importer rom</h2>
            <import-rooms />
        </base-card>
    </div>
</template>

<script>
import NewRoomForm from '../forms/rooms/NewRoomForm.vue';
import NewAreaForm from '../forms/areas/NewAreaForm';
import ImportRooms from '../rooms/ImportRooms';

export default {
    components: { ImportRooms, NewRoomForm, NewAreaForm },
    mounted() {
        this.$store.dispatch('buildings/getBuildings');
    }
};
</script>

<style scoped>
.container {
    display: grid;
    grid-gap: 1rem;
    grid-template-areas:
        'new-place      new-room'
        'import-room    import-room';
}

.import-room {
    grid-area: import-room;
}

@media only screen and (max-width: 700px) {
    .container {
        display: grid;
        grid-gap: 1rem;
        grid-template-areas:
            'new-place'
            'new-room'
            'import-room';
    }
}
</style>
