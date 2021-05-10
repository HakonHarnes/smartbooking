<template>
    <li>
        <div class="room">{{ room_name }}</div>
        <div class="area">{{ building }}</div>
        <div class="size">{{ size }}</div>
        <div class="date">{{ dateString }}</div>
        <div class="from">{{ startTime }}</div>
        <div class="to">{{ endTime }}</div>
        <div class="action">
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
    margin: 0.2rem 0;
    padding: 0.4rem 1rem;
    display: grid;
    grid-template-columns: 0.9fr 1fr 0.5fr 1fr 0.6fr 0.6fr 0.25fr;
    grid-gap: 0.2rem;
    grid-column-gap: 0.8rem;
    justify-content: space-between;
    justify-items: start;
    align-items: center;
    background-color: #fff;
}

@media only screen and (max-width: 700px) {
    li {
        grid-template-columns: 1fr 0.65fr 1fr 0.5fr 0.25fr;
        grid-template-rows: 1fr 1fr;
    }

    .action {
        grid-column: 5;
        grid-row: 1 / span 2;
    }

    .area {
        grid-row: 2;
    }

    .from {
        grid-column: 4;
        grid-row: 1;
    }

    .to {
        grid-column: 4;
        grid-row: 2;
    }
}

@media only screen and (max-width: 500px) {
    li {
        grid-template-columns: 1fr 1fr 0.2fr;
        grid-template-rows: 1fr 1fr 1fr;
    }

    .action {
        grid-column: 3;
        grid-row: 1 / span 3;
    }

    .from {
        grid-column: 2;
        grid-row: 2;
    }

    .to {
        grid-column: 2;
        grid-row: 3;
    }

    .size {
        grid-row: 3;
    }
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

.room {
    justify-self: start;
    font-weight: 500;
}

.action {
    justify-self: center;
}
</style>
