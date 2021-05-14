<template>
    <form @submit.prevent="handleUpdatePolicy">
        <select @change="handleBuildingChange">
            <option :value="null">Velg område</option>
            <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">{{ b.building_name }}</option>
        </select>
        <div class="day">
            <div class="name">Mandag</div>
            <div class="picker">
                <base-timepicker
                    @handle-change="handleTimeChange"
                    :disabled="!building_id || timesLoading"
                    :value="times.start_mon"
                    id="start_mon"
                ></base-timepicker>
            </div>
            <div class="picker">
                <base-timepicker
                    @handle-change="handleTimeChange"
                    :disabled="!building_id || timesLoading"
                    :value="times.end_mon"
                    id="end_mon"
                ></base-timepicker>
            </div>
        </div>
        <div class="day">
            <div class="name">Tirsdag</div>
            <div class="picker">
                <base-timepicker
                    @handle-change="handleTimeChange"
                    :disabled="!building_id || timesLoading"
                    :value="times.start_tue"
                    id="start_tue"
                ></base-timepicker>
            </div>
            <div class="picker">
                <base-timepicker
                    @handle-change="handleTimeChange"
                    :disabled="!building_id || timesLoading"
                    :value="times.end_tue"
                    id="end_tue"
                ></base-timepicker>
            </div>
        </div>
        <div class="day">
            <div class="name">Onsdag</div>
            <div class="picker">
                <base-timepicker
                    @handle-change="handleTimeChange"
                    :disabled="!building_id || timesLoading"
                    :value="times.start_wed"
                    id="start_wed"
                ></base-timepicker>
            </div>
            <div class="picker">
                <base-timepicker
                    @handle-change="handleTimeChange"
                    :disabled="!building_id || timesLoading"
                    :value="times.end_wed"
                    id="end_wed"
                ></base-timepicker>
            </div>
        </div>
        <div class="day">
            <div class="name">Torsdag</div>
            <div class="picker">
                <base-timepicker
                    @handle-change="handleTimeChange"
                    :disabled="!building_id || timesLoading"
                    :value="times.start_thu"
                    id="start_thu"
                ></base-timepicker>
            </div>
            <div class="picker">
                <base-timepicker
                    @handle-change="handleTimeChange"
                    :disabled="!building_id || timesLoading"
                    :value="times.end_thu"
                    id="end_thu"
                ></base-timepicker>
            </div>
        </div>
        <div class="day">
            <div class="name">Fredag</div>
            <div class="picker">
                <base-timepicker
                    @handle-change="handleTimeChange"
                    :disabled="!building_id || timesLoading"
                    :value="times.start_fri"
                    id="start_fri"
                ></base-timepicker>
            </div>
            <div class="picker">
                <base-timepicker
                    @handle-change="handleTimeChange"
                    :disabled="!building_id || timesLoading"
                    :value="times.end_fri"
                    id="end_fri"
                ></base-timepicker>
            </div>
        </div>
        <div class="day">
            <div class="name">Lørdag</div>
            <div class="picker">
                <base-timepicker
                    @handle-change="handleTimeChange"
                    :disabled="!building_id || timesLoading"
                    :value="times.start_sat"
                    id="start_sat"
                ></base-timepicker>
            </div>
            <div class="picker">
                <base-timepicker
                    @handle-change="handleTimeChange"
                    :disabled="!building_id || timesLoading"
                    :value="times.end_sat"
                    id="end_sat"
                ></base-timepicker>
            </div>
        </div>
        <div class="day">
            <div class="name">Søndag</div>
            <div class="picker">
                <base-timepicker
                    @handle-change="handleTimeChange"
                    :disabled="!building_id || timesLoading"
                    :value="times.start_sat"
                    id="start_sun"
                ></base-timepicker>
            </div>
            <div class="picker">
                <base-timepicker
                    @handle-change="handleTimeChange"
                    :disabled="!building_id || timesLoading"
                    :value="times.end_sat"
                    id="end_sun"
                ></base-timepicker>
            </div>
        </div>
        <div class="actions">
            <base-button :disabled="!building_id || timesLoading">Oppdater</base-button>
            <base-loading class="loader" v-if="timesLoading"></base-loading>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            building_id: null,
            times: {
                start_mon: '',
                end_mon: '',
                start_tue: '',
                end_tue: '',
                start_wed: '',
                end_wed: '',
                start_thu: '',
                end_thu: '',
                start_fri: '',
                end_fri: '',
                start_sat: '',
                end_sat: '',
                start_sun: '',
                end_sun: ''
            },
            timesLoading: false
        };
    },
    methods: {
        handleTimeChange(id, value) {
            this.times[id] = value;
        },
        handleBuildingChange(e) {
            this.building_id = e.target.value;
            this.fetchTimes();
        },
        async fetchTimes() {
            if (this.building_id) {
                this.timesLoading = true;
                this.times = await this.$store.dispatch('policies/getBuildingPolicy', {
                    building_id: this.building_id
                });
                this.timesLoading = false;
            } else {
                this.times = {
                    start_mon: '',
                    end_mon: '',
                    start_tue: '',
                    end_tue: '',
                    start_wed: '',
                    end_wed: '',
                    start_thu: '',
                    end_thu: '',
                    start_fri: '',
                    end_fri: '',
                    start_sat: '',
                    end_sat: '',
                    start_sun: '',
                    end_sun: ''
                };
            }
        },
        async handleUpdatePolicy() {
            if (this.building_id && this.validateData()) {
                this.timesLoading = true;
                if (await this.$store.dispatch('policies/updateBuildingPolicy', { times: { ...this.times } })) {
                    this.toast.success('Data oppdatert.');
                }
                this.timesLoading = false;
            } else {
                this.toast.warning('Sluttid må være etter starttid!');
            }
        },
        validateData() {
            const times = { ...this.times };
            delete times['building_id'];
            for (let prop in times) {
                times[prop] = this.getNumber(prop);
            }
            return !(
                times.start_mon >= times.end_mon ||
                times.start_tue >= times.end_tue ||
                times.start_wed >= times.end_wed ||
                times.start_thu >= times.end_thu ||
                times.start_fri >= times.end_fri ||
                times.start_sat >= times.end_sat ||
                times.start_sun >= times.end_sun
            );
        },
        getNumber(id) {
            return parseInt(this.times[id].replace(':', ''));
        }
    },
    computed: {
        buildings() {
            return this.$store.getters['buildings/buildings'];
        },
        toast() {
            return this.$store.getters.toast;
        }
    }
};
</script>

<style scoped>
form {
    display: grid;
    grid-gap: 1rem;
    max-width: 300px;
    width: 100%;
}

.day {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center left;
    grid-gap: 2rem;
}

.loader {
    position: absolute;
    transform: translateX(10px);
}
</style>
