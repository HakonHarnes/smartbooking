<template>
    <the-header :mobile="isMobile" class="header" v-if="isAuthenticated"></the-header>
    <the-menu-bar :mobile="isMobile" class="menubar" v-if="isAuthenticated"></the-menu-bar>
    <router-view class="content"></router-view>
</template>

<script>
import { computed } from 'vue';
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
            if (this.role !== 'admin') {
                this.$store.dispatch('policies/getPolicy');
            } else {
                this.$store.dispatch('organizations/getOrganizations');
                this.$store.dispatch('users/getAccounts');
            }
        }
    },
    computed: {
        isMobile() {
            return this.windowWidth <= 1000;
        },
        role() {
            return this.$store.getters['auth/user'].role;
        },
        isAuthenticated() {
            return this.$store.getters['auth/accessToken'] && !this.$store.getters['auth/verificationToken'];
        }
    },
    data() {
        return { windowWidth: window.innerWidth };
    },
    provide() {
        return {
            isMobile: computed(() => this.isMobile)
        };
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
@import '~material-design-icons/iconfont/material-icons.css';

body {
    background-color: rgb(245, 245, 245);
}

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
    grid-template-columns: auto 1fr;
    min-height: 100vh;
    position: relative;
}

.root {
    padding: 1.4rem;
}

.header {
    grid-area: header;
}

.content {
    grid-area: content;
}

.menubar {
    position: relative;
    grid-area: menubar;
}

input[type='text'],
input[type='button'],
input[type='number'],
input[type='email'],
input[type='password'],
select {
    font-family: 'Montserrat';
    font-size: 1rem;
    padding: 0.5rem;
    background-color: white;
    border: 1px solid gray;
    border-radius: 0px;
}

input[type='password'] {
    font-family: Arial, Helvetica, sans-serif;
}

input[type='password']::placeholder {
    font-family: 'Montserrat';
}

input[type='checkbox'] {
    height: 20px;
    width: 20px;
    margin-right: 0.6rem;
}

h2 {
    font-weight: 400;
    margin: 0;
    margin-bottom: 1.6rem;
}

h4 {
    color: rgb(109, 109, 109);
    margin: 0;
    font-weight: 400;
    font-size: 0.9rem;
    text-transform: uppercase;
    margin-bottom: 0.2rem;
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

    .header {
        position: fixed;
        top: 0px;
    }

    .menubar {
        position: fixed;
        bottom: 0px;
    }

    .content {
        margin-top: 80px;
        margin-bottom: 60px;
    }
}

@media only screen and (max-width: 600px) {
    .root {
        padding: 0.5rem;
    }
}
</style>
