<template>
    <div class="root">
        <base-modal @close="closeModal" v-if="showModal" title="Reserver rom">
            <template #body
                ><book-room-form
                    :date="newBooking.date"
                    :from="newBooking.from"
                    :availableTo="newBooking.availableTo"
                    @book-room="bookRoom"
                ></book-room-form
            ></template>
        </base-modal>
        <div>ROM KALENDER</div>
        <div class="calendar">
            <day-item
                v-for="day in days"
                :key="day"
                :date="day.date"
                :reservations="day.reservations"
                :start-time="startTime"
                :end-time="endTime"
                @preview-book="previewReservation"
            ></day-item>
        </div>
    </div>
</template>

<script>
import { getDateString } from '../utils';
import BookRoomForm from '../forms/rooms/BookRoomForm';
import DayItem from './DayItem';

export default {
    components: { BookRoomForm, DayItem },
    data() {
        return {
            showModal: false,
            newBooking: {
                date: null,
                from: null,
                availableTo: null
            },
            startTime: new Date('2021-03-17T08:00:00.000Z'),
            endTime: new Date('2021-03-17T16:00:00.000Z'),
            days: [
                {
                    date: new Date('2021-03-22T00:00:00.000Z'),
                    reservations: [
                        { start: new Date('2021-03-17T09:30:00.000Z'), end: new Date('2021-03-17T11:00:00.000Z') },
                        { start: new Date('2021-03-17T12:00:00.000Z'), end: new Date('2021-03-17T14:30:00.000Z') }
                    ]
                },
                {
                    date: new Date('2021-03-23T00:00:00.000Z'),
                    reservations: [
                        { start: new Date('2021-03-17T08:00:00.000Z'), end: new Date('2021-03-17T10:00:00.000Z') },
                        { start: new Date('2021-03-17T14:00:00.000Z'), end: new Date('2021-03-17T14:30:00.000Z') }
                    ]
                },
                { date: new Date('2021-03-24T00:00:00.000Z'), reservations: [] },
                { date: new Date('2021-03-25T00:00:00.000Z'), reservations: [] },
                { date: new Date('2021-03-26T00:00:00.000Z'), reservations: [] }
            ]
        };
    },
    methods: {
        previewReservation(date, from, availableTo) {
            this.newBooking = {
                date,
                from,
                availableTo
            };
            this.showModal = true;
        },
        bookRoom(date, from, to) {
            const index = this.days.map(day => day.date).indexOf(date);
            const dateString = getDateString(date, false);
            this.days[index].reservations.push({
                start: new Date(`${dateString}T${from}:00.000Z`),
                end: new Date(`${dateString}T${to}:00.000Z`)
            });
            this.closeModal();
        },
        closeModal() {
            this.newBooking = { date: null, from: null, to: null };
            this.showModal = false;
        }
    }
};
</script>

<style scoped>
.calendar {
    display: grid;
    grid-gap: 0.2rem;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 12rem));
}

.tab {
    background-color: lawngreen;
}
</style>
