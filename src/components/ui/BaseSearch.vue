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
    display: flex;
}

input[type='text'] {
    margin-right: 0.5rem;
}
</style>
