<template>
    <div class="base-card">
        <slot></slot>
    </div>
</template>

<style scoped>
.base-card {
    display: grid;
    justify-items: center;
    text-align: center;
    padding: 1rem 2rem;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
    background-color: white;
}
</style>
