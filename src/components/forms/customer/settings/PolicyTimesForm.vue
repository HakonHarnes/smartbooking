<template>
    <form @submit.prevent="handleUpdatePolicy">
        <div class="title">Åpningstider for bygninger</div>
        <select @change="handleBuildingChange">
            <option :value="null">Velg bygning</option>
            <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">{{ b.building_name }}</option>
        </select>
        <div class="day">
            <div class="name">Mandag</div>
            <input :disabled="!building_id" type="text" v-model="times.start_mon" />
            <input :disabled="!building_id" type="text" v-model="times.end_mon" />
        </div>
        <div class="day">
            <div class="name">Tirsdag</div>
            <input :disabled="!building_id" type="text" v-model="times.start_tue" />
            <input :disabled="!building_id" type="text" v-model="times.end_tue" />
        </div>
        <div class="day">
            <div class="name">Onsdag</div>
            <input :disabled="!building_id" type="text" v-model="times.start_wed" />
            <input :disabled="!building_id" type="text" v-model="times.end_wed" />
        </div>
        <div class="day">
            <div class="name">Torsdag</div>
            <input :disabled="!building_id" type="text" v-model="times.start_thu" />
            <input :disabled="!building_id" type="text" v-model="times.end_thu" />
        </div>
        <div class="day">
            <div class="name">Fredag</div>
            <input :disabled="!building_id" type="text" v-model="times.start_fri" />
            <input :disabled="!building_id" type="text" v-model="times.end_fri" />
        </div>
        <div class="day">
            <div class="name">Lørdag</div>
            <input :disabled="!building_id" type="text" v-model="times.start_sat" />
            <input :disabled="!building_id" type="text" v-model="times.end_sat" />
        </div>
        <div class="day">
            <div class="name">Søndag</div>
            <input :disabled="!building_id" type="text" v-model="times.start_sun" />
            <input :disabled="!building_id" type="text" v-model="times.end_sun" />
        </div>
        <div class="actions">
            <base-button>Oppdater</base-button>
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
        handleBuildingChange(e) {
            this.building_id = e.target.value;
            this.fetchTimes();
        },
        async fetchTimes() {
            console.log(this.building_id);
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
            if (this.building_id) {
                this.timesLoading = true;
                if (await this.$store.dispatch('policies/updateBuildingPolicy', { times: { ...this.times } })) {
                    this.toast.success('Data oppdatert.');
                }
                this.timesLoading = false;
            }
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
    padding: 1rem;
}

.day {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 1.6rem 0;
    position: relative;
}

.name {
    width: 28%;
}

.title {
    margin: 1rem 0;
}

input[type='text'] {
    font-family: inherit;
    font-size: 1.2rem;
    margin: 0 1rem;
    text-align: center;
    width: 36%;
}

select {
    font-size: 1rem;
    padding: 0.2rem 0.6rem;
}

.actions {
    position: relative;
}

.loader {
    position: absolute;
    transform: translateX(10px);
}
</style>
