<template>
    <div class="root">
        <div class="item">
            <div class="attribute">Rom</div>
            <div class="value">{{ reservation.room_name }}</div>
        </div>
        <div class="item">
            <div class="attribute">Bygg</div>
            <div class="value">{{ reservation.building_name }}</div>
        </div>
        <div class="item">
            <div class="attribute">Antall plasser</div>
            <div class="value">{{ reservation.size }}</div>
        </div>
        <div class="item">
            <div class="attribute">Tidspunkt</div>
            <div class="value">{{ start }} - {{ end }}</div>
        </div>
    </div>
</template>

<script>
import { getTime } from '../utils';

export default {
    props: {
        reservation: Object
    },
    computed: {
        date() {
            return new Date().toLocaleString().substring(10, 15);
        },
        start() {
            return getTime(this.reservation.start);
        },
        end() {
            return getTime(this.reservation.end);
        }
    }
};
</script>

<style scoped>
.root {
    text-align: center;
}

.item {
    margin: 1.2rem 0;
}

.attribute {
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-bottom: 0.2rem;
}

.value {
    font-size: 1.2rem;
}
</style>
