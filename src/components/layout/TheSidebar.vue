<template>
    <section>
        <h1 class="title">Meny</h1>
        <nav class="nav-buttons">
            <ul>
                <li v-if="admin || customer || user">
                    <base-button class="flex" link mode="sidebar" to="/">
                        <base-icon name="laptop"></base-icon>
                        <div>Dashboard</div>
                    </base-button>
                </li>
                <li v-if="admin">
                    <base-button link mode="sidebar" to="/kunder">
                        <base-icon name="people"></base-icon>
                        <div>Kunder</div>
                    </base-button>
                </li>
                <li v-if="customer">
                    <base-button class="flex" link mode="sidebar" to="/brukere">
                        <base-icon name="person"></base-icon>
                        <div>Brukere</div>
                    </base-button>
                </li>
                <li v-if="user || customer">
                    <base-button class="flex" link mode="sidebar" :to="roomLink">
                        <base-icon name="domain"></base-icon>
                        <div>{{ roomsText }}</div>
                    </base-button>
                </li>
                <li v-if="user">
                    <base-button class="flex" link mode="sidebar" to="/reservasjoner">
                        <base-icon name="event_note"></base-icon>
                        <div>Reservasjoner</div>
                    </base-button>
                </li>
                <li v-if="admin || customer">
                    <base-button class="flex" link mode="sidebar" to="/statistikk">
                        <base-icon name="poll"></base-icon>
                        <div>Statistikk</div>
                    </base-button>
                </li>
                <li v-if="admin || customer || user">
                    <base-button class="flex" link mode="sidebar" to="/innstillinger">
                        <base-icon name="settings"></base-icon>
                        <div>Innstillinger</div>
                    </base-button>
                </li>
            </ul>
        </nav>
        <nav class="log-buttons">
            <base-button class="button" v-if="customer">Logg inn som bruker</base-button>
            <base-button class="button" @click="logout">Logg ut</base-button>
        </nav>
    </section>
</template>

<script>
export default {
    computed: {
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
            return this.customer ? 'Rom og arealer' : 'Finn rom';
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
    height: 100%;
    display: grid;
    grid-template-areas:
        'title'
        'nav-buttons'
        'log-buttons';
    grid-template-rows: auto 1fr auto;
    padding: 1rem 0rem 1rem 0rem;
    background-color: #ededed;
}

.button {
    margin: 0.2rem 0;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

ul li {
    height: 65px;
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
</style>
