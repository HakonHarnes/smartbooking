<template>
    <div class="container">
        <base-modal v-if="showModal" @close="toggleModal">
            <template #body>
                <edit-room v-if="mode === 'rooms'" @close-modal="toggleModal" :room_id="room_id"></edit-room>
                <edit-area v-else @close-modal="toggleModal" :building_id="building_id"></edit-area>
            </template>
        </base-modal>

        <div class="filters">
            <base-search @search="search"></base-search>
            <select v-model="mode">
                <option value="rooms">Rom</option>
                <option value="areas">Områder</option>
            </select>
        </div>

        <base-spinner v-if="loading"></base-spinner>
        <div v-else-if="!rooms.length">Fant ingen rom</div>
        <existing-rooms v-else-if="mode === 'rooms'" @edit-room="editRoom" :rooms="filteredRooms"></existing-rooms>
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
        }
    }
};
</script>

<style scoped>
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
    display: flex;
    align-items: center;
}

select {
    margin-left: 2rem;
}
</style>
