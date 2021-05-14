<template>
    <base-modal title="Reserver rom" v-if="showModal" @close="closeModal">
        <template #body><reservation-preview :reservation="newReservation"></reservation-preview></template>
        <template #footer><base-button @click="bookRoom">Reserver</base-button></template>
    </base-modal>
    <div class="container">
        <find-room-search class="find-rooms" @find-rooms="findRooms"></find-room-search>
        <base-spinner v-if="loading && buildings.length"></base-spinner>
        <div>
            <template v-if="!loading && results">
                <div class="empty-message" v-if="!results.length">Fant ingen ledige rom</div>
                <template v-else>
                    <reservation-description action="Reserver"></reservation-description>
                    <reservation-list-item
                        v-for="res in results"
                        :key="res.room_id"
                        :id="res.room_id"
                        :room_name="res.room_name"
                        :building="res.building_name"
                        :size="res.size"
                        :start="res.start"
                        :date="true"
                        :end="res.end"
                        :type="'add'"
                        :dateSubstringChars="[10, -3]"
                        @handle-action="previewReservation"
                    >
                    </reservation-list-item>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import FindRoomSearch from '../forms/rooms/FindRoomSearch';
import ReservationDescription from '../reservations/ReservationDescription';
import ReservationListItem from '../reservations/ReservationListItem';
import ReservationPreview from '../reservations/ReservationPreview';

export default {
    components: { FindRoomSearch, ReservationDescription, ReservationListItem, ReservationPreview },
    data() {
        return {
            newReservation: null,
            showModal: false,
            results: null
        };
    },
    computed: {
        buildings() {
            return this.$store.getters['buildings/buildings'];
        },
        loading() {
            return this.$store.getters.loading;
        },
        columns() {
            return ['Rom', 'Bygg', 'Plasser', 'Start', 'Slutt', 'Reserver'];
        },
        reservations() {
            return this.$store.getters['reservations/reservations'];
        },
        toast() {
            return this.$store.getters.toast;
        }
    },
    methods: {
        closeModal() {
            this.newReservation = null;
            this.showModal = false;
        },
        previewReservation(id) {
            this.showModal = true;
            this.newReservation = { ...this.results.find(res => res.room_id === id) };
        },
        async bookRoom() {
            if (await this.$store.dispatch('reservations/createReservation', { reservation: this.newReservation })) {
                this.closeModal();
                this.toast.success('Reservasjon bekreftet.');
                this.$router.replace('/reservasjoner');
            } else {
                this.closeModal();
            }
        },
        async findRooms(date, start, end, building_id) {
            const results = await this.$store.dispatch('rooms/findAvailableRooms', { date, start, end, building_id });
            this.results = results;
        }
    }
};
</script>

<style scoped>
.container {
    display: grid;
    padding-top: 1rem;
    grid-gap: 1rem;
}
</style>
