<template>
    <customer-settings v-if="role === 'customer'"></customer-settings>
</template>

<script>
import CustomerSettings from '../components/customer/CustomerSettings';

export default {
    components: { CustomerSettings },
    computed: {
        role() {
            return this.$store.getters.role;
        }
    }
};
</script>
