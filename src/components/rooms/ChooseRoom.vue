<template>
    <choose-room-search @load-room="loadRoom"></choose-room-search>
    <room-calendar
        v-if="roomId && currentDays.length"
        :days="currentDays"
        :perPage="3"
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
            roomId: '',
            currentDays: []
        };
    },
    methods: {
        async loadRoom(roomId) {
            this.initialiseCalendar();
            this.roomId = roomId;
            /* const response = await this.$store.dispatch('reservations/getReservations', roomId);
            const days = [];
            response.data.forEach(reservation => {
                const currDates = days.map(day => day.date);
                if (currDates.includes(reservation.start_time.toISOString().substring(0, 10))) {
                    const idx = currDates.indexOf(reservation.start_time.toISOString().substring(0, 10));
                    days[idx].reservations.push({ start: reservation.start_time, end: reservation.end_time });
                } else {
                    days.push({
                        date: reservation.start_time,
                        reservations: [{ start: reservation.start_time, end: reservation.end_time }]
                    });
                }
            });
            this.days = days;
            this.roomId = '1'; */
        },
        bookRoom(date, from, to) {
            const index = this.currentDays.map(day => day.date).indexOf(date);
            const dateString = getDateString(date, false);
            this.currentDays[index].reservations.push({
                start: new Date(`${dateString}T${from}:00.000Z`),
                end: new Date(`${dateString}T${to}:00.000Z`)
            });
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
            console.log(this.currentDays);
        }
    }
};
</script>
