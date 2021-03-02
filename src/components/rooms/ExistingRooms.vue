<template>
    <base-search @search="search"></base-search>
    <base-card>
        <ul>
            <base-list-description :columns="columns"></base-list-description>
            <room-list-item
                v-for="room in rooms"
                :key="room.id"
                :name="room.id"
                :seats="room.seats"
                :description="room.description"
                :building="room.building"
                :active="room.active"
            ></room-list-item>
        </ul>
    </base-card>
</template>

<script>
import RoomListItem from './RoomListItem.vue';

export default {
    components: { RoomListItem },
    data() {
        return {
            searchKeyword: '',
            rooms: [{ id: 1, name: '301', seats: 8, description: 'Møterom', building: 'Bygg 3D', active: true }]
        };
    },
    computed: {
        filteredUsers() {
            return this.users.filter(user => {
                return user.name.toLowerCase().includes(this.searchKeyword);
            });
        },
        columns() {
            return ['Rom', 'Plasser', 'Beskrivelse', 'Bygg', 'Tilgjengelig'];
        }
    },
    methods: {
        search(keyword) {
            this.searchKeyword = keyword;
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
