<template>
    <div class="day">
        <div class="description">
            <div>{{ day }}</div>
            <div>{{ date }}</div>
        </div>
        <div class="hours">
            <div class="hour" v-for="(hour, index) in hours" :key="index" :style="hour ? busy : null">
                <div v-if="hour">{{ hour }}</div>
                <div v-else @click="book(index)" class="available"></div>
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
        startTime: Number,
        endTime: Number
    },
    data() {
        return {
            hours: [...Array((this.endTime - this.startTime) * 2)]
        };
    },
    computed: {
        numHours() {
            return this.endTime - this.startTime;
        },
        busy() {
            return { backgroundColor: '#c0392b', color: '#e9a29b' };
        }
    },
    methods: {
        calcNumHalfHours(start, end) {
            return Math.abs(end - start) / 1.8e6;
        },
        book(idx) {
            alert(idx);
        }
    },
    created() {
        this.reservations.forEach(res => {
            [...Array(this.calcNumHalfHours(res.start, res.end))].forEach((_, idx) => {
                this.hours[(res.start.getUTCHours() - this.startTime) * 2 + idx] = 'Opptatt';
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
