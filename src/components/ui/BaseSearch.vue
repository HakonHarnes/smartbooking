<template>
    <form @submit.prevent="search">
        <input type="text" v-model="keyword" placeholder="Søkeord" />
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
    display: flex;
    margin: 1.4rem 0;
}

input[type='text'] {
    margin-right: 0.6rem;
}
</style>
