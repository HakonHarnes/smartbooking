<template>
    <test-component></test-component>
    <the-header class="header" v-if="isAuthenticated"></the-header>
    <the-sidebar class="sidebar" v-if="isAuthenticated"></the-sidebar>
    <router-view></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheSidebar from './components/layout/TheSidebar.vue';
import TestComponent from './services/TestComponent.vue';

export default {
    components: {
        TheHeader,
        TheSidebar,
        TestComponent
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
    box-sizing: border-box;
}

html {
    font-family: 'Roboto', sans-serif;
}

body {
    margin: 0;
}

#app {
    display: grid;
    grid-template-areas:
        'header     header'
        'sidebar    content';
    grid-template-rows: auto 1fr;
    grid-template-columns: 15em 1fr;
    min-height: 100vh;
}

.header {
    grid-area: header;
}

.sidebar {
    grid-area: sidebar;
}
</style>
