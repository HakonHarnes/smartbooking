<template>
    <i class="material-icons">{{ name }}</i>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        }
    }
};
</script>

<style scoped>
i {
    margin: 0.2rem 0.5rem;
}
</style>
