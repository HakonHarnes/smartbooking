<template>
    <div class="day">
        <div class="description">
            <div>{{ day }}</div>
            <div>{{ date }}</div>
        </div>
        <div class="hours">
            <div class="hour" v-for="(status, index) in hours" :key="index" :style="status === 'Opptatt' ? busy : null">
                <div v-if="status === 'Opptatt'">{{ status }}</div>
                <div v-else @click="book(index)" class="available">{{ status }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        day: String,
        date: String,
        reservations: Array,
        startTime: Date,
        endTime: Date
    },
    emits: ['bookRoom'],
    data() {
        return {
            hours: [...Array(this.calcNumHalfHours(this.startTime, this.endTime))]
        };
    },
    computed: {
        numHours() {
            return Math.abs(this.endTime - this.startTime) / 3.6e5;
        },
        busy() {
            return { backgroundColor: '#c0392b', color: '#e9a29b' };
        }
    },
    methods: {
        calcNumHalfHours(start, end) {
            return Math.abs(end - start) / 1.8e6;
        },
        calcStartIndex(start) {
            console.log(start.getUTCHours());
            const startIndex = (start.getUTCHours() - this.startTime.getUTCHours()) * 2;
            return start.getUTCMinutes() === 0 ? startIndex : startIndex + 1;
        },
        book(index) {
            this.$emit('bookRoom', this.date, index);
        },
        formatTime(hours, minutes) {
            return `${hours > 9 ? hours : `0${hours}`}:${minutes === 0 ? `${minutes}0` : minutes}`;
        },
        getDisplayHour(index) {
            return this.startTime.getUTCHours() + Math.floor(index / 2);
        },
        getDisplayMinutes(index) {
            return this.startTime.getMinutes() + (30 - ((index + 1) % 2) * 30);
        }
    },
    created() {
        this.hours = this.hours.map((hour, index) => {
            return this.formatTime(this.getDisplayHour(index), this.getDisplayMinutes(index));
        });

        this.reservations.forEach(res => {
            [...Array(this.calcNumHalfHours(res.start, res.end))].forEach((_, idx) => {
                this.hours[this.calcStartIndex(res.start) + idx] = 'Opptatt';
            });
        });
    },
    mounted() {}
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
