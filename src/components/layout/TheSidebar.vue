<template>
    <section>
        <h1 class="title">Meny</h1>
        <nav class="nav-buttons">
            <ul>
                <li v-if="admin || customer || user">
                    <base-button link mode="sidebar" to="/">Dashboard</base-button>
                </li>

                <li v-if="admin">
                    <base-button link mode="sidebar" to="/kunder">Kunder</base-button>
                </li>
                <li v-if="customer">
                    <base-button link mode="sidebar" to="/brukerdata">Brukerdata</base-button>
                </li>
                <li v-if="user || customer">
                    <base-button link mode="sidebar" to="/rom">Rom</base-button>
                </li>
                <li v-if="user">
                    <base-button link mode="sidebar" to="/reservasjoner">Reservasjoner</base-button>
                </li>
                <li v-if="admin || customer">
                    <base-button link mode="sidebar" to="/statistikk">Statistikk</base-button>
                </li>
                <li v-if="admin || customer || user">
                    <base-button link mode="sidebar" to="/innstillinger">Innstillinger</base-button>
                </li>
            </ul>
        </nav>
        <nav class="log-buttons">
            <ul>
                <li>
                    <base-button v-if="customer">Logg inn som bruker</base-button>
                </li>
                <li>
                    <base-button @click="logout">Logg ut</base-button>
                </li>
            </ul>
        </nav>
    </section>
</template>

<script>
export default {
    computed: {
        role() {
            return this.$store.getters.role;
        },
        admin() {
            return this.role === 'admin';
        },
        customer() {
            return this.role === 'customer';
        },
        user() {
            return this.role === 'user';
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
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
    background-color: #ededed;
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
</style>
