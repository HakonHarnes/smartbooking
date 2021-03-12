<template>
    <find-room-search @find-rooms="findRooms"></find-room-search>
    <!-- <div v-if="loading" class="container"></div> -->
    <base-card v-if="results.length || loading">
        <base-spinner v-if="loading"></base-spinner>
        <template v-else-if="results.length && !loading">
            <base-list-description :columns="columns"></base-list-description>
            <reservation-list-item
                v-for="res in reservations"
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
                @handle-action="createReservation"
            >
            </reservation-list-item>
        </template>
    </base-card>
</template>

<script>
import FindRoomSearch from '../forms/rooms/FindRoomSearch';
import ReservationListItem from '../reservations/ReservationListItem';

export default {
    components: { FindRoomSearch, ReservationListItem },
    data() {
        return {
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
        createReservation() {},
        async findRooms() {
            const res = await this.$store.dispatch('rooms/findRooms');
            console.log(res);
            this.$store.dispatch('setLoading', { loading: false });
            this.results = [1];
        }
    }
};
</script>

<style scoped>
.container {
    text-align: center;
}
</style>
