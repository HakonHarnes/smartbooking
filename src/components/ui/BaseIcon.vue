<template>
    <i class="material-icons" :style="{ fontSize: size || '26px' }">{{ name }}</i>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: false
        }
    }
};
</script>

<style scoped>
i {
    margin: 0.2rem 0.5rem;
}
</style>
