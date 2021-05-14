<template>
    <div class="container">
        <base-modal v-if="showModal" @close="toggleModal">
            <template #body>
                <edit-room v-if="mode === 'rooms'" @close-modal="toggleModal" :room_id="room_id"></edit-room>
                <edit-area v-else @close-modal="toggleModal" :building_id="building_id"></edit-area>
            </template>
        </base-modal>

        <div class="filters">
            <base-search class="search" @search="search"></base-search>
            <select class="select" v-model="mode">
                <option value="rooms">Rom</option>
                <option value="areas">Områder</option>
            </select>
            <base-button class="button" @click="saveQrs">Last ned QR-koder</base-button>
        </div>

        <base-spinner v-if="loading"></base-spinner>
        <div class="empty-response" v-else-if="!rooms.length">Fant ingen rom</div>
        <existing-rooms
            class="existing-rooms"
            v-else-if="mode === 'rooms'"
            @edit-room="editRoom"
            :rooms="filteredRooms"
            ref="existingRooms"
        ></existing-rooms>
        <existing-places v-else @edit-area="editArea" :buildings="filteredBuildings"></existing-places>
    </div>
</template>

<script>
import EditArea from '../forms/areas/EditArea';
import EditRoom from '../forms/rooms/EditRoom';
import ExistingRooms from '../rooms/ExistingRooms';
import ExistingPlaces from '../places/ExistingPlaces';

export default {
    components: { EditArea, EditRoom, ExistingRooms, ExistingPlaces },
    data() {
        return {
            mode: 'rooms',
            room_id: null,
            building_id: null,
            searchKeyword: '',
            showModal: false
        };
    },
    computed: {
        buildings() {
            return this.$store.getters['buildings/buildings'];
        },
        rooms() {
            return this.$store.getters['rooms/rooms'];
        },
        filteredRooms() {
            return this.rooms.filter(room => {
                return room.room_name.toLowerCase().includes(this.searchKeyword);
            });
        },
        filteredBuildings() {
            return this.buildings.filter(building => {
                return building.building_name.toLowerCase().includes(this.searchKeyword);
            });
        },
        columns() {
            return ['Rom', 'Plasser', 'Bygg', 'Tilgjengelig', 'Rediger'];
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        editRoom(room_id) {
            this.room_id = room_id;
            this.toggleModal();
        },
        editArea(building_id) {
            this.building_id = building_id;
            this.toggleModal();
        },
        search(keyword) {
            this.searchKeyword = keyword;
        },
        toggleModal() {
            this.showModal = !this.showModal;
        },
        saveQrs() {
            this.$refs.existingRooms.saveQrs();
        }
    }
};
</script>

<style scoped>
.empty-response {
    margin-top: 1rem;
}

.existing-rooms {
    overflow: hidden;
}

.container {
    margin-top: 2rem;
}

.room {
    justify-self: start;
}

.edit {
    justify-self: center;
}

.description {
    background-color: transparent;
    border-bottom: 1px solid #222;
}

.description div {
    font-weight: 500;
}

.filters {
    display: grid;
    grid-template-columns: minmax(auto, 350px) auto 1fr;
    grid-template-areas: 'search select button';
    grid-gap: 0.5rem;
    place-items: center right;
}

.filters * {
    height: 100%;
}

@media only screen and (max-width: 750px) {
    .filters {
        grid-template-areas:
            'search'
            'select'
            'button';
        place-items: center center;
        grid-gap: 0.5rem;
        grid-template-columns: 21.8rem;
        margin-bottom: 1.4rem;
    }

    .filters * {
        width: 100%;
    }

    .button {
        grid-area: button;
    }

    .search {
        grid-area: search;
        max-width: none;
    }

    .select {
        grid-area: select;
    }
}

@media only screen and (max-width: 550px) {
    .filters {
        grid-template-areas:
            'search'
            'select'
            'button';
        grid-template-columns: 1fr;
    }
}
</style>
