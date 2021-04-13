<template>
    <the-header class="header" v-if="isAuthenticated"></the-header>
    <the-sidebar class="sidebar" v-if="isAuthenticated"></the-sidebar>
    <router-view></router-view>
</template>

<script>
// import userService from './services/UserService';
import TheHeader from './components/layout/TheHeader.vue';
import TheSidebar from './components/layout/TheSidebar.vue';

export default {
    components: {
        TheHeader,
        TheSidebar
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    }
    // async beforeCreate() {
    //     const response = await userService.getLoggedInUser();
    //     if (response.data) {
    //         this.$store.dispatch('login', { role: response.data.user.role });
    //     }

    //     this.$store.dispatch('setInitialized', { isInitialized: true });
    // }
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
}

.header {
    grid-area: header;
}

.sidebar {
    grid-area: sidebar;
}

input[type='text'],
input[type='button'] {
    font-family: 'Montserrat';
}
</style>
