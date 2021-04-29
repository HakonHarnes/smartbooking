<template>
    <div class="root">
        <div class="actions">
            <base-button link to="/rom/">Eksisterende rom</base-button>
            <base-button link to="/rom/nytt">Nytt rom</base-button>
            <base-button link to="/rom/innstillinger">Innstillinger</base-button>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('rooms/getRooms');
    }
};
</script>

<style scoped>
.actions {
    margin-bottom: 1rem;
}

.actions a {
    margin-right: 0.6rem;
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
</style>
