<template>
    <div class="root">
        <div>ROM KALENDER</div>
        <div class="calendar">
            <description-item :start-time="8" :end-time="16"></description-item>
            <day-item
                v-for="day in days"
                :key="day.date"
                :day="day.name"
                :date="day.date"
                :reservations="day.reservations"
                :start-time="startTime"
                :end-time="endTime"
                @book-room="bookRoom"
            ></day-item>
        </div>
    </div>
</template>

<script>
import DayItem from './DayItem';
import DescriptionItem from './DescriptionItem';

export default {
    components: { DayItem, DescriptionItem },
    data() {
        return {
            startTime: new Date('2021-03-17T08:00:00.000Z'),
            endTime: new Date('2021-03-17T16:00:00.000Z'),
            days: [
                {
                    name: 'Mandag',
                    date: '15.03.2021',
                    reservations: [
                        { start: new Date('2021-03-17T09:30:00.000Z'), end: new Date('2021-03-17T11:00:00.000Z') },
                        { start: new Date('2021-03-17T12:00:00.000Z'), end: new Date('2021-03-17T14:30:00.000Z') }
                    ]
                },
                {
                    name: 'Tirsdag',
                    date: '16.03.2021',
                    reservations: [
                        { start: new Date('2021-03-17T08:00:00.000Z'), end: new Date('2021-03-17T10:00:00.000Z') },
                        { start: new Date('2021-03-17T14:00:00.000Z'), end: new Date('2021-03-17T14:30:00.000Z') }
                    ]
                },
                { name: 'Onsdag', date: '17.03.2021', reservations: [] },
                { name: 'Torsdag', date: '18.03.2021', reservations: [] },
                { name: 'Fredag', date: '19.03.2021', reservations: [] }
            ]
        };
    },
    methods: {
        bookRoom(date, index) {
            alert(`${date} index. ${index}`);
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
