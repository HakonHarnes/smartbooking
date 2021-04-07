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
                @preview-reservation="previewReservation"
            ></day-item>
        </div>
    </div>
</template>

<script>
import BookRoomForm from '../forms/rooms/BookRoomForm';
import DayItem from './DayItem';

export default {
    components: { BookRoomForm, DayItem },
    emits: ['book-room'],
    props: {
        days: Array
    },
    data() {
        return {
            showModal: false,
            newBooking: {
                date: null,
                from: null,
                availableTo: null
            },
            startTime: new Date('2021-03-17T08:00:00.000Z'),
            endTime: new Date('2021-03-17T16:00:00.000Z')
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
            this.$emit('book-room', date, from, to);
            this.closeModal();
        },
        closeModal() {
            this.newBooking = { date: null, from: null, to: null };
            this.showModal = false;
        }
    },
    created() {
        console.log(this.days);
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
