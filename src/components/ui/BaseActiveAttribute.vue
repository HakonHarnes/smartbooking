<template>
    <div :style="activeStyle">{{ isActive }}</div>
</template>

<script>
export default {
    props: {
        active: Boolean,
        text: Object
    },
    computed: {
        isActive() {
            return this.active ? this.text.true : this.text.false;
        },
        activeStyle() {
            return { color: this.active ? 'green' : 'red', fontWeight: 500 };
        }
    }
};
</script>
