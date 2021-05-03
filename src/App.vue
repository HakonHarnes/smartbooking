<template>
    <the-header class="header" v-if="isAuthenticated" @toggle-sidebar="showSidebar = !showSidebar"></the-header>
    <the-sidebar :class="sidebarClass" :style="sidebarStyles" v-if="isAuthenticated"></the-sidebar>
    <router-view></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheSidebar from './components/layout/TheSidebar.vue';

export default {
    components: {
        TheHeader,
        TheSidebar
    },
    data() {
        return {
            showSidebar: false
        };
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters['auth/accessToken'];
        },
        sidebarStyles() {
            return {
                visibility: window.innerWidth >= 1000 ? 'visible' : this.showSidebar ? 'visible' : 'hidden'
            };
        },
        sidebarClass() {
            return window.innerWidth >= 1000 ? 'sidebar' : 'sidebar-mobile';
        }
    },
    created() {
        if (this.isAuthenticated) {
            this.$store.dispatch('policies/getPolicy');
        }
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
@import '~material-design-icons/iconfont/material-icons.css';

* {
    box-sizing: border-box;
}

html {
    font-family: 'Montserrat', sans-serif;
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
    grid-template-columns: 16em 1fr;
    min-height: 100vh;
    position: relative;
}

.header {
    grid-area: header;
}

.sidebar {
    grid-area: sidebar;
}

.sidebar-mobile {
    grid-area: sidebar;
    z-index: 10;
    position: absolute;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.3);
}

@media only screen and (max-width: 1000px) {
    #app {
        display: flex;
        flex-direction: column;
    }
}

input[type='text'],
input[type='button'],
select {
    font-family: 'Montserrat';
}

h2 {
    font-weight: 400;
    margin: 0;
    margin-bottom: 2rem;
}
</style>
