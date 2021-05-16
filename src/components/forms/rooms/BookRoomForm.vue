<template>
    <form @submit.prevent="bookRoom">
        <div>
            <div class="description">DATO</div>
            <div class="value">{{ dateString }}</div>
        </div>
        <div>
            <div class="description">FRA</div>
            <div class="value">{{ from }}</div>
        </div>
        <div class="actions">
            <label for="to" class="description">TIL</label>
            <select name="to" v-model="to">
                <option v-for="time in availableTo" :key="time">{{ time }}</option>
            </select>
        </div>
        <div class="button"><base-button>Reserver</base-button></div>
    </form>
</template>

<script>
import { getDateString } from '../../utils';

export default {
    props: {
        date: Date,
        from: String,
        availableTo: Array
    },
    emits: ['book-room'],
    data() {
        return {
            to: this.availableTo[0]
        };
    },
    computed: {
        dateString() {
            return getDateString(this.date);
        }
    },
    methods: {
        bookRoom() {
            this.$emit('book-room', this.date, this.from, this.to);
        }
    }
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
}

.actions {
    display: flex;
    flex-direction: column;
}

.button {
    margin-top: 1.4rem;
    width: 100%;
}

.button * {
    width: 100%;
}

.value {
    font-size: 1.2rem;
}

.description {
    margin: 1rem 0rem 0.2rem 0rem;
    font-weight: 500;
    font-size: 0.8rem;
}

select {
    width: 6rem;
    font-size: 1.2rem;
    font-family: inherit;
}
</style>
