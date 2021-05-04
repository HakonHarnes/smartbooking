<template>
    <base-modal v-if="showModal" @close="toggleModal">
        <template #body><edit-room @close-modal="toggleModal" :room_id="room_id"></edit-room></template>
    </base-modal>
    <base-search @search="search"></base-search>
    <base-card>
        <base-spinner v-if="loading"></base-spinner>
        <ul v-else>
            <base-list-description :columns="columns"></base-list-description>
            <room-list-item
                v-for="room in filteredRooms"
                :id="room.room_id"
                :key="room.room_id"
                :name="room.room_name"
                :size="room.size"
                :building="room.building_name"
                :active="!!room.is_active"
                @edit-room="editRoom"
            ></room-list-item>
        </ul>
    </base-card>
</template>

<script>
import EditRoom from '../forms/rooms/EditRoom';
import RoomListItem from './RoomListItem.vue';

export default {
    components: { EditRoom, RoomListItem },
    data() {
        return {
            room_id: null,
            searchKeyword: '',
            showModal: false
        };
    },
    computed: {
        rooms() {
            return this.$store.getters['rooms/rooms'];
        },
        filteredRooms() {
            return this.rooms.filter(room => {
                return room.room_name.toLowerCase().includes(this.searchKeyword);
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
ul {
    position: relative;
}

ul::before {
    height: 1px;
    width: 100%;
    top: 1.5rem;
    left: 0;
    background-color: rgb(136, 136, 136);
    content: ' ';
    position: absolute;
}
</style>
