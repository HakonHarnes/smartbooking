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
            <import-rooms @server-response="setServerResponse" />
        </base-card>

        <server-response
            class="server-response"
            :data="errors"
            type="error"
            title="Feilmeldinger"
            subtitle="Rom ikke registrert"
        />
        <server-response
            class="server-response"
            :data="warnings"
            type="warning"
            title="Advarsler"
            subtitle="Rom finnes allerede"
        />
        <server-response
            class="server-response"
            :data="rooms"
            type="success"
            title="Registrerte rom"
            subtitle="Rom registrert"
        />
    </div>
</template>

<script>
import NewRoomForm from '../forms/rooms/NewRoomForm.vue';
import NewAreaForm from '../forms/areas/NewAreaForm';
import ImportRooms from '../rooms/ImportRooms';
import ServerResponse from '../../components/server/ServerResponse';

export default {
    components: { ImportRooms, NewRoomForm, NewAreaForm, ServerResponse },
    mounted() {
        this.$store.dispatch('buildings/getBuildings');
    },
    data() {
        return {
            rooms: [],
            errors: [],
            warnings: []
        };
    },
    methods: {
        setServerResponse(payload) {
            this.rooms = payload.rooms;
            this.errors = payload.errors;
            this.warnings = payload.warnings;
        }
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

.server-response {
    grid-column: 1/3;
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
