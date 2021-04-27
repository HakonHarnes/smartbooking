<template>
    <base-spinner v-if="loading"></base-spinner>
    <form v-else @submit.prevent="updatePolicy">
        <div>Regler for reservasjoner</div>
        <div>
            <label>Maks antall timer per reservasjon</label>
            <input required type="number" v-model.number="newPolicy.max_time_per_reservation" />
        </div>
        <div>
            <label>Antall reservasjoner per uke</label>
            <input required type="number" v-model.number="newPolicy.reservations_per_period" />
        </div>
        <div>
            <label>Dager fram i tid man kan reservere</label>
            <input required type="number" v-model.number="newPolicy.max_days_lookup" />
        </div>
        <base-button>Oppdater</base-button>
        <!-- <div>
            <label></label>
            <input type="number" />
        </div> -->
    </form>
</template>

<script>
export default {
    data() {
        return {
            newPolicy: { ...this.policy }
        };
    },
    methods: {
        updatePolicy() {
            const { max_days_lookup, max_time_per_reservation, reservations_per_period } = this.newPolicy;
            if (!max_days_lookup) {
                console.log(max_days_lookup);
            } else if (!max_time_per_reservation) {
                console.log(max_time_per_reservation);
            } else if (!reservations_per_period) {
                console.log(reservations_per_period);
            } else {
                console.log('Updating');
                this.$store.dispatch('policies/updatePolicy', { ...this.newPolicy });
            }
        }
    },
    watch: {
        policy(val) {
            this.newPolicy = { ...val };
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading;
        },
        policy() {
            return this.$store.getters['policies/policy'];
        }
    }
};
</script>

<style scoped>
form div {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
}

input[type='number'] {
    font-family: inherit;
    font-size: 1.2rem;
    text-align: center;
}
</style>
