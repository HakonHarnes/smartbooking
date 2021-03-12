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
        startTime: Number,
        endTime: Number
    },
    computed: {
        hours() {
            return [...Array(this.endTime - this.startTime)].map((_, idx) => this.formatHour(this.startTime + idx));
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
