<template>
    <div class="wrapper">
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
            <base-button class="nav-button" :style="previousButton" @click="handleChangePage(-1)"
                ><base-icon name="arrow_back" size="20px"></base-icon
            ></base-button>
            <base-button class="nav-button" :style="nextButton" @click="handleChangePage(1)"
                ><base-icon name="arrow_forward" size="20px"></base-icon
            ></base-button>
        </div>

        <div class="calendar">
            <day-item
                v-for="day in currentDays"
                :key="day"
                :date="day.date"
                :opens="buildingPolicy[`start_${day.weekday}`]"
                :closes="buildingPolicy[`end_${day.weekday}`]"
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
        bookableTimes: Object,
        buildingPolicy: Object,
        days: Array,
        perPage: Number
    },
    watch: {
        perPage(val) {
            this.currentDays = this.days.slice(0, val);
        }
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
            startTime: new Date(new Date(`2021-04-17T${this.bookableTimes.min}:00.000Z`) - 7.2e6),
            endTime: new Date(new Date(`2021-04-17T${this.bookableTimes.max}:00.000Z`) - 7.2e6)
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
    }
};
</script>

<style scoped>
.nav-button {
    padding: 0.4rem 1.2rem;
    width: 80px;
}

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
</style>
