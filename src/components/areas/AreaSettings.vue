<template>
    <div class="container">
        <base-card class="reservation-rules">
            <h2>Reservasjonsregler</h2>
            <policy-form></policy-form>
        </base-card>
        <base-card class="area-settings">
            <h2>Åpningstider for områder</h2>
            <policy-times-form></policy-times-form>
        </base-card>
    </div>
</template>

<script>
import PolicyForm from '../forms/customer/settings/PolicyForm';
import PolicyTimesForm from '../forms/customer/settings/PolicyTimesForm';

export default {
    components: { PolicyForm, PolicyTimesForm },
    created() {
        this.$store.dispatch('policies/getPolicy');
    }
};
</script>

<style scoped>
.container {
    display: grid;
    grid-template-areas: 'reservation-rules' 'area-settings';
    grid-gap: 1rem;
}
</style>
