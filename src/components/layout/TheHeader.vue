<template>
    <header>
        <nav>
            <img class="logo" src="../../assets/logo.png" alt="" @click="redirectHome" />
        </nav>
        <h1 class="title">{{ title }}</h1>
    </header>
</template>

<script>
export default {
    computed: {
        title() {
            const path = this.$route.path;
            switch (path) {
                case '/':
                    return 'Dashboard';
                case '/kunder':
                    return 'Kunder';
                case '/brukere':
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
            return this.$store.getters.role;
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
    grid-template-columns: 1fr 2fr 1fr;
    padding: 0px 2rem;
    width: 100%;
    height: 5rem;
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
</style>
