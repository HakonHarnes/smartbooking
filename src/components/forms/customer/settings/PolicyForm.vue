<template>
    <form @submit.prevent="updatePolicy">
        <div>
            <base-loading class="loader" v-if="loading"></base-loading>
            <label>Antall reservasjoner per uke:</label>
            <input
                :disabled="loading"
                required
                type="number"
                max="100"
                v-model.number="newPolicy.reservations_per_period"
            />
        </div>

        <div>
            <base-loading class="loader" v-if="loading"></base-loading>
            <label>Maks antall timer per reservasjon:</label>
            <input
                :disabled="loading"
                required
                type="number"
                min="1"
                max="9"
                v-model.number="newPolicy.max_time_per_reservation"
            />
        </div>

        <div>
            <base-loading class="loader" v-if="loading"></base-loading>
            <label>Dager fram i tid man kan reservere:</label>
            <input
                :disabled="loading"
                required
                type="number"
                min="3"
                max="30"
                v-model.number="newPolicy.max_days_lookup"
            />
        </div>
        <base-button>Oppdater</base-button>
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
        async updatePolicy() {
            const { max_days_lookup, reservations_per_period, max_time_per_reservation } = this.newPolicy;
            if (
                max_days_lookup === this.policy.max_days_lookup &&
                max_time_per_reservation === this.policy.max_time_per_reservation &&
                reservations_per_period === this.policy.reservations_per_period
            ) {
                this.toast.warning('Endre verdier for å oppdatere!');
            } else {
                if (await this.$store.dispatch('policies/updatePolicy', { ...this.newPolicy })) {
                    this.toast.success('Data ble oppdatert.');
                }
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
        },
        toast() {
            return this.$store.getters.toast;
        }
    }
};
</script>

<style scoped>
form div {
    display: grid;
    grid-template-areas: 'label input';
    grid-template-columns: 1fr auto;
    place-items: center left;
    grid-gap: 1rem;
    text-align: left;
    margin: 1rem 0;
}

input {
    width: 4rem;
}

.loader {
    position: absolute;
    top: 0;
    left: 5px;
}
</style>
