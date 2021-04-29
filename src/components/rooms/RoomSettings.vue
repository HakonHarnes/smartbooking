<template>
    <div class="root">
        <base-card class="card">
            <policy-form></policy-form>
        </base-card>
        <base-card class="card times">
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
.root {
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
}

@media only screen and (max-width: 1000px) {
    .root {
        flex-direction: column;
    }
}

.card {
    margin: 0.4rem;
    padding: 0;
}
</style>
