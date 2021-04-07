<template>
    <choose-room-search @load-room="loadRoom"></choose-room-search>
    <room-calendar v-if="roomId && days.length" :days="days" @book-room="bookRoom"></room-calendar>
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
            days: []
        };
    },
    methods: {
        async loadRoom(roomId) {
            const response = await this.$store.dispatch('reservations/getReservations', roomId);
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
            this.roomId = '1';
        },
        bookRoom(date, from, to) {
            const index = this.days.map(day => day.date).indexOf(date);
            const dateString = getDateString(date, false);
            this.days[index].reservations.push({
                start: new Date(`${dateString}T${from}:00.000Z`),
                end: new Date(`${dateString}T${to}:00.000Z`)
            });
        }
    }
};
</script>
