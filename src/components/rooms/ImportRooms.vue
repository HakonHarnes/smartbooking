<template>
    <base-button @click="clicked" mode="outlined">Importer fra fil</base-button>
</template>

<script>
export default {
    methods: {
        clicked() {
            alert('pranked');
        }
    }
};
</script>
