<template>
    <choose-room-search @load-room="loadRoom"></choose-room-search>
    <base-spinner v-if="loading"></base-spinner>
    <room-calendar
        v-else-if="!loading && room_id && currentDays.length"
        :days="currentDays"
        :perPage="5"
        @book-room="bookRoom"
    ></room-calendar>
</template>

<script>
import { getDateString } from '../utils';
import ChooseRoomSearch from '../forms/rooms/ChooseRoomSearch';
import RoomCalendar from '../calendar/RoomCalendar';

export default {
    components: { ChooseRoomSearch, RoomCalendar },
    data() {
        return {
            room_id: '',
            currentDays: []
        };
    },
    computed: {
        loading() {
            return this.$store.getters.loading;
        },
        reservations() {
            return this.$store.getters['reservations/reservations'];
        },
        user_id() {
            return this.$store.getters.user_id;
        }
    },
    watch: {
        /* reservations(val) {
            val.forEach(reservation => {
                const currDates = this.currentDays.map(day => day.date.toISOString().substring(0, 10));
                if (currDates.includes(reservation.start.toISOString().substring(0, 10))) {
                    const idx = currDates.indexOf(reservation.start.toISOString().substring(0, 10));
                    this.currentDays[idx].reservations.push({
                        ...reservation
                    });
                }
            });
        } */
    },
    methods: {
        loadRoom(room_id) {
            this.initialiseCalendar();
            this.room_id = room_id;
            this.loadReservations(room_id);
        },
        async bookRoom(date, from, to) {
            const dateString = getDateString(date, false);

            const reservation = {
                room_id: this.room_id,
                user_id: this.user_id,
                start: new Date(`${dateString}T${from}:00.000Z`),
                end: new Date(`${dateString}T${to}:00.000Z`)
            };

            await this.$store.dispatch('reservations/createReservation', { reservation });
            await this.$store.dispatch('reservations/getReservationsByRoom', { room_id: this.room_id });
            this.renderReservations();
        },
        initialiseCalendar() {
            const today = new Date();
            const first = today.getDate() - today.getDay() + 1;
            this.currentDays = new Array(7).fill(0).map((_, idx) => {
                return {
                    date: new Date(new Date(today).setDate(first + idx)),
                    reservations: []
                };
            });
        },
        renderReservations() {
            this.reservations.forEach(reservation => {
                const currDates = this.currentDays.map(day => day.date.toISOString().substring(0, 10));
                if (currDates.includes(reservation.start.toISOString().substring(0, 10))) {
                    const idx = currDates.indexOf(reservation.start.toISOString().substring(0, 10));
                    this.currentDays[idx].reservations.push({
                        ...reservation
                    });
                }
            });
        },
        async loadReservations(room_id) {
            await this.$store.dispatch('reservations/getReservationsByRoom', { room_id });
            this.renderReservations();
        }
    }
};
</script>
