<template>
    <li>
        <div>{{ roomName }}</div>
        <div>{{ building }}</div>
        <div>{{ seats }}</div>
        <div>{{ description }}</div>
        <div>
            {{ startString }}
        </div>
        <div>{{ endString }}</div>
        <div>
            <base-icon @click="handleAction" :name="type" :class="type"></base-icon>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        id: Number,
        roomName: String,
        building: String,
        seats: Number,
        description: String,
        start: Date,
        end: Date,
        type: String,
        dateSubstringChars: Array
    },
    emits: ['handle-action'],
    methods: {
        /* deleteUser() {
            this.$store.dispatch('reservations/deleteReservation', { reservationId: this.id });
        }, */
        handleAction() {
            this.$emit('handle-action', this.id);
        },
        convertDate(date) {
            return date
                .toLocaleString()
                .slice(this.dateSubstringChars[0], this.dateSubstringChars[1])
                .replace(',', '');
        }
    },
    computed: {
        startString() {
            return this.convertDate(this.start);
        },
        endString() {
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
