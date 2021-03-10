<template>
    <li>
        <div>{{ roomName }}</div>
        <div>{{ seats }}</div>
        <div>{{ description }}</div>
        <div>
            {{ startString }}
        </div>
        <div>{{ endString }}</div>
        <div>
            <base-icon @click="deleteReservation" name="delete" class="delete"></base-icon>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        id: Number,
        roomName: String,
        seats: Number,
        description: String,
        start: Date,
        end: Date
    },
    emits: ['delete-reservation'],
    methods: {
        /* deleteUser() {
            this.$store.dispatch('reservations/deleteReservation', { reservationId: this.id });
        }, */
        deleteReservation() {
            this.$emit('delete-reservation', this.id);
        },
        convertDate(date) {
            return date
                .toLocaleString()
                .slice(0, -3)
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

.delete {
    color: #386881;
    cursor: pointer;
}

.delete:hover {
    color: #aaa;
}
</style>
