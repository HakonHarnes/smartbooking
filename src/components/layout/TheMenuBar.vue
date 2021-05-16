<template>
    <section>
        <h1 v-if="!mobile" class="title">Meny</h1>
        <nav class="nav-buttons">
            <ul>
                <li v-if="admin || customer || user">
                    <base-button class="flex" link :mode="buttonMode" to="/">
                        <base-icon name="laptop"></base-icon>
                        <div v-if="!mobile">Dashboard</div>
                    </base-button>
                </li>
                <li v-if="admin">
                    <base-button class="flex" link :mode="buttonMode" to="/organisasjoner">
                        <base-icon name="domain"></base-icon>
                        <div v-if="!mobile">Organisasjoner</div>
                    </base-button>
                </li>
                <li v-if="admin">
                    <base-button class="flex" link :mode="buttonMode" to="/kontoer">
                        <base-icon name="people"></base-icon>
                        <div v-if="!mobile">Kontoer</div>
                    </base-button>
                </li>
                <li v-if="customer">
                    <base-button class="flex" link :mode="buttonMode" to="/brukere">
                        <base-icon name="person"></base-icon>
                        <div v-if="!mobile">Brukere</div>
                    </base-button>
                </li>
                <li v-if="user || customer">
                    <base-button class="flex" link :mode="buttonMode" :to="roomLink">
                        <base-icon name="domain"></base-icon>
                        <div v-if="!mobile">{{ roomsText }}</div>
                    </base-button>
                </li>
                <li v-if="user || customer">
                    <base-button class="flex" link :mode="buttonMode" to="/reservasjoner">
                        <base-icon name="event_note"></base-icon>
                        <div v-if="!mobile">Reservasjoner</div>
                    </base-button>
                </li>
                <li v-if="admin || customer || user">
                    <base-button class="flex" link :mode="buttonMode" to="/innstillinger">
                        <base-icon name="settings"></base-icon>
                        <div v-if="!mobile">Innstillinger</div>
                    </base-button>
                </li>
            </ul>
        </nav>
        <nav v-if="!mobile" class="log-buttons">
            <ul>
                <li>
                    <base-button @click="logout">Logg ut</base-button>
                </li>
            </ul>
        </nav>
    </section>
</template>

<script>
export default {
    props: ['mobile'],
    computed: {
        buttonMode() {
            return this.mobile ? 'bottombar' : 'sidebar';
        },
        role() {
            return this.$store.getters['auth/user'].role;
        },
        admin() {
            return this.role === 'admin';
        },
        customer() {
            return this.role === 'customer';
        },
        user() {
            return this.role === 'user';
        },
        roomsText() {
            return this.customer ? 'Rom og områder' : 'Finn rom';
        },
        roomLink() {
            return this.user ? '/finn-rom' : '/rom';
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
section {
    display: grid;
    grid-template-areas:
        'title'
        'nav-buttons'
        'log-buttons';
    grid-template-rows: auto 1fr auto;
    padding: 1rem 0rem 1rem 0rem;
    width: 16em;
    background-color: #dfdfdf;
    z-index: 10;
}
ul {
    display: grid;
    list-style: none;
    margin: 0;
    padding: 0;
}
.title {
    grid-area: title;
    margin-left: 2rem;
    color: rgb(27, 27, 27);
}
.nav-butttons {
    grid-area: nav-buttons;
    justify-self: top;
}
.log-buttons {
    grid-area: log-buttons;
    justify-self: bottom;
    padding: 0rem 1rem;
}
.log-buttons ul {
    display: grid;
    gap: 0.5em;
}
.log-buttons button {
    width: 100%;
}
.flex {
    display: flex;
    align-items: center;
}

@media only screen and (max-width: 1000px) {
    section {
        grid-template-areas: 'nav-buttons';
        grid-template-rows: 1fr;
        width: 100%;
        padding: 0px;
    }

    ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    }
}
</style>
