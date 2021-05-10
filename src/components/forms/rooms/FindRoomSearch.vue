<template>
    <base-spinner v-if="!buildings.length"></base-spinner>
    <base-card v-else class="card">
        <form @submit.prevent="search">
            <div></div>
            <div class="form-control date">
                <label>Dato</label>
                <input type="date" :min="today" v-model="date.val" />
            </div>
            <div class="form-control from">
                <label>Fra kl.</label>
                <base-timepicker id="from" @handle-change="handleTimeChange"></base-timepicker>
            </div>
            <div class="form-control to">
                <label>Til kl.</label>
                <base-timepicker id="to" @handle-change="handleTimeChange"></base-timepicker>
            </div>
            <div class="form-control area">
                <label>Bygg</label>
                <select @change="handleBuildingChange">
                    <option :value="null">Alle bygg</option>
                    <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">{{
                        b.building_name
                    }}</option>
                </select>
            </div>
            <div class="form-control search">
                <base-button>Søk</base-button>
            </div>
        </form>
    </base-card>
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
.card {
    margin: 1.6rem 0 1rem;
}

form {
    display: grid;
    grid-template-columns: 1.1fr 1fr 1fr 1fr 1fr 1fr 1.1fr;
    justify-items: center;
    align-items: center;
}

@media only screen and (max-width: 1150px) {
    .card {
        padding: 1rem !important;
    }

    form {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-gap: 0.8rem;
        justify-items: start;
    }

    .to {
        grid-row: 2;
        grid-column: 3;
    }

    .area {
        grid-row: 2;
        grid-column: 2;
    }

    .search {
        grid-row: span 2;
    }
}

@media only screen and (max-width: 600px) {
    form {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        grid-gap: 0.6rem;
        justify-items: center;
    }

    .from {
        grid-row: 3;
        grid-column: 2;
    }

    .to {
        grid-row: 4;
        grid-column: 2;
    }

    .area {
        grid-row: 2;
        grid-column: 2;
    }

    .search {
        grid-row: 5;
        grid-column: 2;
    }
}

form div {
    display: flex;
    flex-direction: column;
    align-items: start;
}

select,
input[type='date'],
input[type='time'] {
    padding: 0.2rem 0.3rem;
    font-family: inherit;
    font-size: 1rem;
}

select {
    min-width: 10rem;
}

label {
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.3rem;
}
.form-control {
    margin: 0 1rem;
}

input[type='time']:nth-child(3n) {
    display: none;
}
</style>
