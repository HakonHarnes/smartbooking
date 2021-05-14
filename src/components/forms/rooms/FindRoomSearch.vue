<template>
    <base-spinner v-if="!buildings.length"></base-spinner>
    <form @submit.prevent="search">
        <select class="building" @change="handleBuildingChange">
            <option :value="null">Alle bygg</option>
            <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">{{ b.building_name }}</option>
        </select>

        <input class="date" type="date" :min="today" v-model="date.val" />
        <base-timepicker class="from-time" id="from" @handle-change="handleTimeChange"></base-timepicker>
        <base-timepicker class="to-time" id="to" @handle-change="handleTimeChange"></base-timepicker>

        <base-button class="button">Søk</base-button>
    </form>
</template>

<script>
export default {
    emits: ['find-rooms'],
    data() {
        return {
            date: {
                val: new Date().toISOString().slice(0, 10),
                valid: false
            },
            times: {
                from: '',
                to: '',
                valid: false
            },
            building_id: null,
            formValid: false,
            error: null
        };
    },
    computed: {
        buildings() {
            return this.$store.getters['buildings/buildings'];
        },
        today() {
            return new Date().toISOString().slice(0, 10);
        },
        toast() {
            return this.$store.getters.toast;
        }
    },
    methods: {
        handleTimeChange(id, time) {
            this.times[id] = time;
        },
        handleBuildingChange({ target }) {
            this.building_id = target.value;
        },
        async getBuildingPolicy(building_id) {
            await this.$store.dispatch('policies/getBuildingPolicy', { building_id });
        },
        search() {
            this.error = null;
            this.validateForm();
            if (this.formValid) {
                this.$emit('find-rooms', this.date.val, this.times.from, this.times.to, this.building_id);
            }
        },
        validateDate() {
            const now = new Date().setHours(0, 0, 0);
            const start = new Date(this.date.val);
            if (start <= now || this.date.val.length !== 10) {
                this.date.valid = false;
            }
            this.date.valid = true;
        },
        validateTimes() {
            const replaceDot = time => time.replace(':', '');
            const from = replaceDot(this.times.from);
            const to = replaceDot(this.times.to);
            if (!from || !to) {
                this.toast.warning('Vennligst sjekk at tidene er utfylt.');
                return (this.times.valid = false);
            } else if (to - from <= 0) {
                this.toast.warning('Fra kl. må være før til kl.');
                return (this.times.valid = false);
            }
            this.times.valid = true;
        },
        validateForm() {
            this.validateDate();
            this.validateTimes();

            if (!this.date.valid || !this.times.valid) {
                return (this.formValid = false);
            }
            this.formValid = true;
        }
    }
};
</script>

<style scoped>
form {
    display: grid;
    grid-template-areas: 'building date from-time to-time button';
    grid-template-columns: 1fr 1fr auto auto auto;
    grid-gap: 0.5rem;
    max-width: 700px;
}

.building {
    grid-area: building;
}

.date {
    grid-area: date;
}

.from-time {
    grid-area: from-time;
}

.to-time {
    grid-area: to-time;
}

.button {
    grid-area: button;
}

@media only screen and (max-width: 700px) {
    form {
        grid-template-areas:
            'building   building    building    building'
            'date       date        from-time   to-time'
            'button     button      button      button';
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
    }

    form * {
        width: 100%;
    }
}

@media only screen and (max-width: 450px) {
    form {
        grid-template-areas:
            'building   building'
            'date       date'
            'from-time   to-time'
            'button     button';
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
    }

    form * {
        width: 100%;
    }
}
</style>
