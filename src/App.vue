<template>
    <the-header :mobile="isMobile" class="header" v-if="isAuthenticated"></the-header>
    <the-menu-bar :mobile="isMobile" class="menubar" v-if="isAuthenticated"></the-menu-bar>
    <router-view class="content"></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheMenuBar from './components/layout/TheMenuBar.vue';

export default {
    components: {
        TheHeader,
        TheMenuBar
    },
    mounted() {
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
        });
    },
    created() {
        if (this.isAuthenticated) {
            this.$store.dispatch('policies/getPolicy');
        }
    },
    computed: {
        isMobile() {
            return this.windowWidth <= 1000;
        },
        isAuthenticated() {
            return this.$store.getters['auth/accessToken'];
        }
    },
    data() {
        return { windowWidth: window.innerWidth };
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
        'menubar    content';
    grid-template-rows: auto 1fr;
    grid-template-columns: 16em 1fr;
    min-height: 100vh;
    position: relative;
}

.header {
    grid-area: header;
}

.menubar {
    grid-area: menubar;
}

.content {
    grid-area: content;
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

@media only screen and (max-width: 1000px) {
    #app {
        grid-template-areas:
            'header'
            'content'
            'menubar';
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 1fr;
    }
}
</style>
