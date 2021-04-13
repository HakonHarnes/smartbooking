<template>
    <div class="switch">
        <div>Manuelt</div>
        <switches color="blue" @click="toggleTab" :value="enabled"></switches>
        <div>Importer fra fil</div>
    </div>
    <base-card>
        <keep-alive>
            <component :is="currentTab"></component>
        </keep-alive>
    </base-card>
</template>

<script>
import Switches from 'vue-switches';
import NewRoomForm from '../forms/rooms/NewRoomForm.vue';
import ImportRooms from './ImportRooms.vue';

export default {
    components: { ImportRooms, NewRoomForm, Switches },
    data() {
        return {
            enabled: false
        };
    },
    methods: {
        toggleTab() {
            this.enabled = !this.enabled;
        }
    },
    computed: {
        currentTab() {
            return this.enabled ? ImportRooms : NewRoomForm;
        }
    }
};
</script>

<style scoped>
.switch {
    display: flex;
    margin: 1.4rem 0;
}

.switch div {
    font-size: 0.9rem;
    margin: 0 1rem;
}
</style>
