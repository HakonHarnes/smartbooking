<template>
    <div class="root">
        <div class="actions">
            <base-button class="firstButton" link to="/finn-rom/">Finn ledig rom</base-button>
            <base-button link to="/finn-rom/velg">Velg rom</base-button>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('rooms/getRooms');
    }
};
</script>

<style scoped>
.actions {
    margin-bottom: 1rem;
}

.firstButton {
    margin-right: 0.6rem;
}

.actions a {
    position: relative;
    transition: all 0.3s;
    background-color: rgb(156, 156, 156);
}

.router-link-exact-active {
    transition: all 0.8s ease;
    background-color: #386881 !important;
}

.router-link-exact-active::after {
    height: 0.2rem;
    position: absolute;
    bottom: -0.4rem;
    left: 0;
    margin: 0 auto;
    width: 100%;
    background-color: #386881;
    content: '';
    transition: all 0.8s ease;
}

.root {
    padding: 1.4rem;
}

@media only screen and (max-width: 600px) {
    .root {
        padding: 0.5rem;
    }
}
</style>
