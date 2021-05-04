<template>
    <header>
        <nav>
            <base-logo class="logo" alt="" @click="redirectHome" />
        </nav>
        <h1 v-if="!mobile" class="title">{{ title }}</h1>
    </header>
</template>

<script>
import BaseLogo from '../ui/BaseLogo';

export default {
    props: ['mobile'],
    components: { BaseLogo },
    computed: {
        buttonMode() {
            return this.mobile ? 'bottombar' : 'sidebar';
        },
        title() {
            const path = this.$route.path;
            switch (path) {
                case '/':
                    return 'Dashboard';
                case '/kunder':
                    return 'Kunder';
                case '/brukere':
                case '/brukere/':
                case '/brukere/ny':
                    return 'Brukere';
                case '/rom':
                    return 'Rom';
                case '/reservasjoner':
                    return 'Reservasjoner';
                case '/statistikk':
                    return 'Statistikk';
                case '/innstillinger':
                    return 'Innstillinger';
                case '/404':
                    return '404';
                case '/401':
                    return '401';
                default:
                    return 'Dashboard';
            }
        },
        role() {
            return this.$store.getters['auth/user'].role;
        }
    },
    methods: {
        redirectHome() {
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
header {
    display: grid;
    grid-template-columns: 16em 1fr;
    padding: 0px 2rem;
    width: 100%;
    height: 80px;
    align-items: center;
    background-color: #00334e;
    color: white;
}
.logo {
    height: 3.2rem;
}
.logo:hover {
    cursor: pointer;
}
.title {
    justify-self: center;
    font-size: 1.8rem;
    font-weight: 500;
}

@media only screen and (max-width: 1000px) {
    header {
        grid-template-columns: 1fr;
        justify-items: center;
    }

    .logo {
        transform: translateX(-10px);
    }
}
</style>
