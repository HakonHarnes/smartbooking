<template>
    <base-modal title="Reserver rom" v-if="showModal" @close="closeModal">
        <template #body><reservation-preview :reservation="newReservation"></reservation-preview></template>
        <template #footer><base-button @click="bookRoom">Reserver</base-button></template>
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
                :room-name="res.room_name"
                :building="res.building"
                :seats="res.size"
                :type="'add'"
                :dateSubstringChars="[10, -3]"
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
            return ['Rom', 'Bygg', 'Plasser', 'Start', 'Slutt', 'Reserver'];
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
        previewReservation(id) {
            this.showModal = true;
            this.newReservation = { ...this.results.find(res => res.id === id) };
        },
        bookRoom() {
            this.$store.dispatch('reservations/createReservation', { reservation: { ...this.newReservation } });
            this.closeModal();
            this.$router.replace('/reservasjoner');
        },
        async findRooms() {
            const results = await this.$store.dispatch('rooms/findAvailableRooms', {});
            console.log(results);
            this.results = results;
        }
    },
    mounted() {
        this.$store.dispatch('buildings/getBuildings');
    }
};
</script>

<style scoped>
.container {
    text-align: center;
}
</style>
