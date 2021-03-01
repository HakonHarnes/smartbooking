<template>
    <li>
        <div>{{ name }}</div>
        <div>{{ email }}</div>
        <div :style="activeStyling">{{ isActive }}</div>
    </li>
</template>

<script>
export default {
    props: {
        id: String,
        name: String,
        email: String,
        active: Boolean
    },
    computed: {
        isActive() {
            return this.active ? 'Aktiv' : 'Inaktiv';
        },
        activeStyling() {
            return { fontWeight: 500, color: this.active ? 'green' : 'red' };
        }
    }
};
</script>

<style scoped>
li {
    list-style: none;
    margin: 1.2rem 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
}

li div {
    text-align: start;
    flex: 1;
}
</style>
