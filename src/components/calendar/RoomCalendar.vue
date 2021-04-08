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
        <div class="actions">
            <base-button :style="previousButton" @click="handleChangePage(-1)"
                ><base-icon name="arrow_back" size="20px"></base-icon
            ></base-button>
            <base-button :style="nextButton" @click="handleChangePage(1)"
                ><base-icon name="arrow_forward" size="20px"></base-icon
            ></base-button>
        </div>
        <div class="calendar">
            <day-item
                v-for="day in currentDays"
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
        days: Array,
        perPage: Number
    },
    data() {
        return {
            currentDays: this.days.slice(0, this.perPage),
            currentPage: 0,
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
    computed: {
        previousButton() {
            return { visibility: this.currentPage * this.perPage + this.perPage * -1 >= 0 ? 'visible' : 'hidden' };
        },
        nextButton() {
            return {
                visibility: this.currentPage * this.perPage + this.perPage * 1 < this.days.length ? 'visible' : 'hidden'
            };
        }
    },
    methods: {
        handleChangePage(change) {
            /* const itemsToView = this.currentPage * this.perPage + this.perPage * change;
            console.log(itemsToView);
            const shouldChange = itemsToView >= 0 && itemsToView < this.days.length;
            console.log(shouldChange); */
            this.currentPage += change;
            this.currentDays = this.days.slice(
                this.currentPage * this.perPage,
                this.currentPage * this.perPage + this.perPage
            );
        },
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
        console.log(this.days.slice(0, this.perPage));
    }
};
</script>

<style scoped>
.actions {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0 0.6rem;
}

.calendar {
    display: grid;
    grid-gap: 0.2rem;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
}

.tab {
    background-color: lawngreen;
}
</style>