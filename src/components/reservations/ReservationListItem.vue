<template>
    <li>
        <div>{{ room_name }}</div>
        <div>{{ building }}</div>
        <div v-if="size">{{ size }}</div>
        <div v-if="date">{{ dateString }}</div>
        <div>{{ startTime }}</div>
        <div>{{ endTime }}</div>
        <div>
            <base-icon @click="handleAction" :name="type" :class="type"></base-icon>
        </div>
    </li>
</template>

<script>
import { getDateString, getTime } from '../utils';

export default {
    props: {
        id: Number,
        room_name: String,
        building: String,
        date: Boolean,
        size: Number,
        start: Date,
        end: Date,
        type: String,
        dateSubstringChars: Array
    },
    emits: ['handle-action'],
    methods: {
        handleAction() {
            this.$emit('handle-action', this.id);
        },
        convertDate(date) {
            return getTime(date);
        }
    },
    computed: {
        dateString() {
            return getDateString(this.start);
        },
        startTime() {
            return this.convertDate(this.start);
        },
        endTime() {
            return this.convertDate(this.end);
        }
    }
};
</script>

<style scoped>
li {
    list-style: none;
    margin: 1rem 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

li div {
    text-align: center;
    flex: 1;
}

.delete,
.add {
    color: #386881;
    cursor: pointer;
}

.delete:hover,
.add:hover {
    color: #aaa;
}
</style>
