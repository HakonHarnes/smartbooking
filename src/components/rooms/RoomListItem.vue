<template>
    <li>
        <div>{{ name }}</div>
        <div>{{ seats }}</div>
        <div>{{ description }}</div>
        <div>{{ building }}</div>
        <base-active-attribute :active="active" :text="text"></base-active-attribute>
    </li>
</template>

<script>
export default {
    props: {
        id: Number,
        name: String,
        seats: Number,
        description: String,
        building: String,
        active: Boolean
    },
    computed: {
        text() {
            return { true: 'Ja', false: 'Nei' };
        }
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
    text-align: center;
    flex: 1;
}
</style>
