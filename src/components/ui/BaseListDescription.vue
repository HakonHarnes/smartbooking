<template>
    <li>
        <div v-for="column in columns" :key="column">{{ column }}</div>
    </li>
</template>

<script>
export default {
    props: {
        columns: Array
    }
};
</script>

<style scoped>
li {
    list-style: none;
    margin: 1rem 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
}

li div {
    text-align: start;
    flex: 1;
    text-transform: uppercase;
    font-weight: 500;
}
</style>
