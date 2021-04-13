<template>
    <div class="day">
        <div class="description">
            <div>{{ day }}</div>
            <div>{{ dateString }}</div>
        </div>
        <div class="hours">
            <div
                class="hour"
                v-for="(hour, index) in hours"
                :key="hour.time"
                :style="hour.mine ? myReservation : hour.available ? null : busy"
            >
                <div v-if="hour.mine">Din reservasjon</div>
                <div v-else-if="!hour.available">Opptatt</div>
                <div v-else @click="book(index)" class="available">{{ hour.time }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { dayOfWeekMapper, getDateString } from '../../components/utils';

export default {
    props: {
        date: Date,
        reservations: Array,
        startTime: Date,
        endTime: Date
    },
    emits: ['preview-reservation'],
    data() {
        return {
            hours: [...Array(this.calcNumHalfHours(this.startTime, this.endTime))]
        };
    },
    computed: {
        busy() {
            return { backgroundColor: '#c0392b', color: '#e9a29b' };
        },
        myReservation() {
            return { backgroundColor: '#386881', color: 'white' };
        },
        dateString() {
            return getDateString(this.date);
        },
        day() {
            return dayOfWeekMapper[this.date.getDay()];
        },
        numHours() {
            return Math.abs(this.endTime - this.startTime) / 3.6e5;
        },
        loggedInUser() {
            return this.$store.getters.user_id;
        }
    },
    watch: {
        reservations: {
            deep: true,
            handler() {
                this.setStatuses();
            }
        }
    },
    methods: {
        addHalfHoursToTimes(times, amount) {
            return times.map(time => {
                const tid = new Date(new Date(`2021-03-17T${time}:00.000Z`).getTime() + amount * 1.8e6);
                return this.formatTime(tid.getUTCHours(), tid.getMinutes());
            });
        },
        book(index) {
            const remainingHours = this.hours.slice(index, this.hours.length).map(hour => hour.available);
            const firstBusy = remainingHours.indexOf(false);
            const availableTo = Array(firstBusy >= 0 ? firstBusy : remainingHours.length)
                .fill(undefined)
                .map((_, idx) => {
                    return this.hours[index + idx].time;
                });
            this.$emit(
                'preview-reservation',
                this.date,
                this.hours[index].time,
                this.addHalfHoursToTimes(availableTo, 1)
            );
        },
        calcNumHalfHours(start, end) {
            return Math.abs(end - start) / 1.8e6;
        },
        calcStartIndex(start) {
            const startIndex = (start.getUTCHours() - this.startTime.getUTCHours()) * 2;
            return start.getUTCMinutes() === 0 ? startIndex : startIndex + 1;
        },
        formatTime(hours, minutes) {
            return `${hours > 9 ? hours : `0${hours}`}:${minutes === 0 ? `${minutes}0` : minutes}`;
        },
        getDisplayHour(hour, index = 0) {
            return hour + Math.floor(index / 2);
        },
        getDisplayMinutes(minutes, index = 0) {
            return minutes + 30 - ((index + 1) % 2) * 30;
        },
        setStatuses() {
            this.reservations.forEach(res => {
                [...Array(this.calcNumHalfHours(res.start, res.end))].forEach((_, idx) => {
                    const currIdx = this.calcStartIndex(res.start) + idx;
                    this.hours[currIdx].available = false;
                    console.log(res.user_id, this.loggedInUser);
                    if (res.user_id === this.loggedInUser) {
                        this.hours[currIdx].mine = true;
                    }
                });
            });
        }
    },
    created() {
        this.hours = this.hours.map((hour, index) => {
            return {
                time: this.formatTime(
                    this.getDisplayHour(this.startTime.getUTCHours(), index),
                    this.getDisplayMinutes(this.startTime.getMinutes(), index)
                ),
                available: true,
                mine: false
            };
        });
        this.setStatuses();
    }
};
</script>

<style scoped>
.description {
    height: 3rem;
}
.day {
    margin-right: 0.2rem;
    text-align: center;
}
.hour {
    height: 2rem;
    font-size: 0.9rem;
    line-height: 2rem;
    background-color: #e6e6e6;
}
.hours {
    display: grid;
    grid-auto-rows: 2rem;
    grid-row-gap: 0.2rem;
}

.available {
    width: 100%;
    cursor: pointer;
    height: 100%;
}

.available:hover {
    background-color: #27ae60;
}
</style>
