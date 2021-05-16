<template>
    <form @submit.prevent="submitForm">
        <input type="text" placeholder="Navn" maxlength="255" v-model.trim="building_name" required />
        <base-button>Legg til område</base-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            building_name: ''
        };
    },
    computed: {
        toast() {
            return this.$store.getters.toast;
        }
    },
    methods: {
        async submitForm() {
            if (await this.$store.dispatch('buildings/addBuilding', { building_name: this.building_name })) {
                this.toast.success('Område opprettet.');
                this.$router.replace('/rom');
            }
        }
    }
};
</script>

<style scoped>
form {
    display: grid;
    grid-gap: 1rem;
    height: calc(2.4rem + 1rem + 2.4rem);
    max-width: 300px;
    width: 100%;
}
</style>
