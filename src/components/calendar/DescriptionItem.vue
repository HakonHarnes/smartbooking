<template>
    <div class="description">
        <div class="box"></div>
        <div class="hour" v-for="hour in hours" :key="hour">
            {{ hour }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        startTime: Date,
        endTime: Date
    },
    computed: {
        hours() {
            return '';
        },
        numHours() {
            return Math.abs(this.endTime - this.startTime) / 3.6e5;
        }
    },
    methods: {
        formatHour(hour) {
            return hour > 9 ? `${hour}:00` : `0${hour}:00`;
        }
    }
};
</script>

<style scoped>
.box {
    height: 3rem;
}
.description {
    margin-right: 0.2rem;
    text-align: center;
}
.hour {
    margin-bottom: 0.2rem;
    vertical-align: middle;
    height: 4.2rem;
    line-height: 4rem;
    background-color: #e6e6e6;
}
</style>
