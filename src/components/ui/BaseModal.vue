<template>
    <div class="backdrop" v-if="show">
        <div class="modal">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean
    }
};
</script>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background-color: #eee;
    padding: 4rem;
}
</style>
