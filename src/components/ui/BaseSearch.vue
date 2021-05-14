<template>
    <form @submit.prevent="search">
        <input type="text" v-model="keyword" placeholder="Søkeord" maxlength="255" />
        <base-button>Søk</base-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            keyword: ''
        };
    },
    methods: {
        search() {
            this.$emit('search', this.keyword);
        }
    }
};
</script>

<style scoped>
form {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 0.5rem;
    max-width: 350px;
    width: 100%;
}

input[type='text'] {
    width: 100%;
}
</style>
