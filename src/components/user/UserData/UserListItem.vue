<template>
    <li>
        <div>{{ name }}</div>
        <div>{{ email }}</div>
        <base-active-attribute :active="active" :text="text"></base-active-attribute>
        <div @click="deleteUser">Fjern</div>
    </li>
</template>

<script>
export default {
    props: {
        id: Number,
        name: String,
        email: String,
        active: Boolean
    },
    computed: {
        text() {
            return { true: 'Aktiv', false: 'Inaktiv' };
        }
    },
    methods: {
        deleteUser() {
            this.$store.dispatch('users/deleteUser', { userId: this.id });
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
