<template>
    <div>
        <div class="root">
            <base-search @search="handleSearch" :keyword="searchWord"></base-search>
            <base-spinner v-if="loading"></base-spinner>
            <div class="empty-response" v-else-if="!loading && !reservations.length">Fant ingen reservasjoner</div>
            <ul v-else-if="!loading && reservations.length">
                <li v-for="res in filteredReservations" :key="res.res_id">
                    <div class="room">{{ res.room_name }}</div>
                    <div class="name">{{ res.last_name }}, {{ res.first_name }}</div>
                    <div class="date">{{ res.date }}</div>
                    <div class="area">{{ res.building_name }}</div>
                    <div class="email">{{ res.email }}</div>
                    <div class="time">{{ res.start }} - {{ res.end }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchWord: '',
            reservations: []
        };
    },
    computed: {
        loading() {
            return this.$store.getters.loading;
        },
        user() {
            return this.$store.getters['auth/user'];
        },
        filteredReservations() {
            return this.reservations.filter(res => this.searchReservations(res));
        }
    },
    methods: {
        async getReservations() {
            this.reservations = await this.$store.dispatch('reservations/getReservationsAndUsers');
        },
        handleSearch(word) {
            this.searchWord = word;
        },
        searchReservations(res) {
            return `${res.first_name} ${res.last_name} ${res.room_name} ${res.building_name}`
                .toLowerCase()
                .includes(this.searchWord);
        }
    },
    created() {
        this.getReservations();
    }
};
</script>

<style scoped>
.empty-response {
    margin-top: 1rem;
}

h2 {
    font-weight: 400;
    font-size: 1.6rem;
}

ul {
    position: relative;
    list-style: none;
    padding: 0;
}

li {
    margin-top: 0.6rem;
    list-style: none;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    display: grid;
    grid-gap: 0.3rem;
    grid-template-columns: 1fr 1fr 8rem;
    grid-template-rows: 1fr 1fr;
    background-color: #fff;
}

.modalButton {
    margin: 1rem 0;
    margin-right: 0.5rem;
}

.room {
    font-weight: 500;
}

@media only screen and (max-width: 720px) {
    li {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
    }

    .area {
        grid-row: 2;
    }

    .name {
        grid-row: 3;
    }
}

@media only screen and (max-width: 500px) {
    li {
        grid-template-columns: 1fr;
    }

    .name {
        grid-row: 5;
    }
}
</style>
