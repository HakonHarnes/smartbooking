<template>
    <div class="root">
        <div class="item">
            <div class="attribute">Rom</div>
            <div class="value">{{ reservation.room_name }}</div>
        </div>
        <div class="item">
            <div class="attribute">Bygg</div>
            <div class="value">{{ reservation.building }}</div>
        </div>
        <div class="item">
            <div class="attribute">Antall plasser</div>
            <div class="value">{{ reservation.seats }}</div>
        </div>
        <div class="item">
            <div class="attribute">Romtype</div>
            <div class="value">{{ reservation.description }}</div>
        </div>
        <div class="item">
            <div class="attribute">Tidspunkt</div>
            <div class="value">{{ date }} - {{ date }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        reservation: Object
    },
    computed: {
        date() {
            return new Date().toLocaleString().substring(10, 15);
        }
    }
};
</script>

<style scoped>
.root {
    text-align: center;
}

.item {
    margin: 1rem 0;
}

.attribute {
    text-transform: uppercase;
    font-weight: 500;
    color: #777;
    font-size: 0.9rem;
}

.value {
    font-size: 1.4rem;
}
</style>
