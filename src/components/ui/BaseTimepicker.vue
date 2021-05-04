<template>
    <div class="picker">
        <select :disabled="disabled" @change="handleChange" v-model="hour" name="hour">
            <!-- <option v-for="hour in ['']" :value=""></option> -->
            <option v-for="(hour, index) in numHours" :key="index" :value="formatHour(index)">{{
                formatHour(index)
            }}</option>
        </select>
        <select :disabled="disabled" @change="handleChange" v-model="minutes" name="minutes">
            <option v-for="minutes in ['00', '30']" :key="minutes" :value="minutes">{{ minutes }}</option>
        </select>
    </div>
</template>

<script>
export default {
    emits: ['handle-change'],
    props: {
        id: String,
        min: {
            type: String,
            default: '00:00'
        },
        max: {
            type: String,
            default: '23:00'
        },
        value: String,
        disabled: Boolean
    },
    data() {
        return {
            hour: null,
            minutes: '00'
        };
    },
    watch: {
        value(val) {
            this.hour = val.substring(0, 2);
            this.minutes = val.substring(3, 5);
        }
    },
    computed: {
        numHours() {
            return parseInt(this.max.substring(0, 2)) - parseInt(this.min.substring(0, 2)) + 1;
        }
    },
    methods: {
        handleChange() {
            this.$emit('handle-change', this.id, `${this.hour}:${this.minutes}`);
        },
        formatHour(idx) {
            return ('0' + (parseInt(this.min.substring(0, 2)) + idx)).slice(-2);
        }
    }
};
</script>

<style scoped>
select {
    text-align: center;
    text-align-last: center;
    font-size: 1rem;
    padding: 0.2rem 0.3rem;
}

.picker {
    display: flex;
    flex-direction: row;
}
</style>
