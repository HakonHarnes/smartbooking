<template>
    <div class="root">
        <div class="actions">
            <base-button class="find-room-button" link to="/finn-rom/">Finn ledig rom</base-button>
            <base-button class="choose-room-button" link to="/finn-rom/velg">Velg rom</base-button>
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
    display: grid;
    grid-template-areas: 'find-room-button choose-room-button';
    max-width: 400px;
    grid-gap: 0.8rem;
}

.actions a {
    position: relative;
    background-color: rgb(156, 156, 156);
}

.router-link-exact-active {
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
}

@media only screen and (max-width: 600px) {
    .actions {
        grid-template-columns: 1fr 1fr;
        max-width: none;
    }
}

@media only screen and (max-width: 370px) {
    .actions {
        grid-template-areas:
            'find-room-button'
            'choose-rrom-button';
        grid-template-columns: 1fr;
        grid-gap: 0.5rem;
    }
}
</style>
