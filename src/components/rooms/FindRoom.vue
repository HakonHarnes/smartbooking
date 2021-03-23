<template>
    <base-modal title="Reserver rom" v-if="showModal" @close="closeModal">
        <template #body><reservation-preview :reservation="newReservation"></reservation-preview></template>
        <template #footer><base-button>Reserver</base-button></template>
    </base-modal>
    <find-room-search @find-rooms="findRooms"></find-room-search>
    <base-card v-if="results.length || loading">
        <base-spinner v-if="loading"></base-spinner>
        <template v-else-if="results.length && !loading">
            <base-list-description :columns="columns"></base-list-description>
            <reservation-list-item
                v-for="res in results"
                :key="res.id"
                :id="res.id"
                :room-name="res.roomName"
                :building="res.building"
                :seats="res.seats"
                :description="res.description"
                :start="res.start"
                :end="res.end"
                :type="'add'"
                :dateSubstringChars="[11, -3]"
                @handle-action="previewReservation"
            >
            </reservation-list-item>
        </template>
    </base-card>
</template>

<script>
import FindRoomSearch from '../forms/rooms/FindRoomSearch';
import ReservationListItem from '../reservations/ReservationListItem';
import ReservationPreview from '../reservations/ReservationPreview';

export default {
    components: { FindRoomSearch, ReservationListItem, ReservationPreview },
    data() {
        return {
            newReservation: null,
            showModal: false,
            results: []
        };
    },
    computed: {
        columns() {
            return ['Rom', 'Bygg', 'Plasser', 'Romtype', 'Start', 'Slutt', 'Reserver'];
        },
        reservations() {
            return this.$store.getters['reservations/reservations'];
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        closeModal() {
            this.newReservation = null;
            this.showModal = false;
        },
        previewReservation(room) {
            this.showModal = true;
            console.log(room);
            console.log(this.results);
            this.newReservation = { ...this.results.find(res => res.roomName === room) };
        },
        createReservation() {},
        async findRooms() {
            const results = await this.$store.dispatch('rooms/findRooms');
            this.results = results;
        }
    }
};
</script>

<style scoped>
.container {
    text-align: center;
}
</style>
