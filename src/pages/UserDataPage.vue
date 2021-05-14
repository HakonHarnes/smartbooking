<template>
    <div class="root">
        <div class="actions">
            <base-button link to="/brukere/">Eksisterende brukere</base-button>
            <base-button link to="/brukere/ny">Ny bruker</base-button>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    /* methods: {
        changeTab(path) {
            this.$router.push(`/brukere${path}`);
        }
    } */
};
</script>

<style scoped>
.actions {
    margin-bottom: 1rem;
}

.actions a {
    margin-right: 0.6rem;
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

@media only screen and (max-width: 400px) {
    .actions {
        display: grid;
        grid-gap: 0.6rem;
    }

    .actions a {
        margin: 0;
    }
}
</style>
