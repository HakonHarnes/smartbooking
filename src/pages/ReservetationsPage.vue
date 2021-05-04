<template>
    <div>
        <base-modal @close="toggleModal" v-if="showModal" title="Slette reservasjon">
            <template #body>Er du sikker?</template>
            <template #footer>
                <base-button @click="confirmDelete" class="modalButton">Ja</base-button>
                <base-button @click="toggleModal" mode="outlined">Avbryt</base-button>
            </template>
        </base-modal>
        <div class="root">
            <h2>Dine reservasjoner</h2>
            <base-card>
                <base-spinner v-if="loading"></base-spinner>
                <div v-else-if="!loading && !reservations.length">Fant ingen reservasjoner</div>
                <ul v-else-if="!loading && reservations.length">
                    <base-list-description :columns="columns"></base-list-description>
                    <reservation-list-item
                        v-for="res in reservations"
                        :key="res.res_id"
                        :id="res.res_id"
                        :room_name="res.room_name"
                        :building="res.building_name"
                        :date="true"
                        :start="res.start"
                        :end="res.end"
                        :type="'delete'"
                        :dateSubstringChars="[0, -3]"
                        @handle-action="deleteReservation"
                    ></reservation-list-item>
                </ul>
            </base-card>
        </div>
    </div>
</template>

<script>
import ReservationListItem from '../components/reservations/ReservationListItem';

export default {
    components: { ReservationListItem },
    data() {
        return {
            showModal: false,
            resId: null
        };
    },
    computed: {
        columns() {
            return ['Rom', 'Bygg', 'Dato', 'Start', 'Slutt', 'Slett'];
        },
        loading() {
            return this.$store.getters.loading;
        },
        reservations() {
            return this.$store.getters['reservations/reservations'];
        }
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal;
        },
        deleteReservation(resId) {
            this.resId = resId;
            this.toggleModal();
        },
        confirmDelete() {
            this.$store.dispatch('reservations/deleteReservation', { reservation_id: this.resId });
            this.resId = null;
            this.toggleModal();
        }
    },
    created() {
        this.$store.dispatch('reservations/getMyReservations');
    }
};
</script>

<style scoped>
.root {
    padding: 1.4rem;
}

h2 {
    font-weight: 400;
    font-size: 1.6rem;
}

ul {
    position: relative;
}

ul::before {
    height: 1px;
    width: 100%;
    top: 1.5rem;
    left: 0;
    background-color: rgb(136, 136, 136);
    content: ' ';
    position: absolute;
}

.modalButton {
    margin: 1rem 0;
    margin-right: 0.5rem;
}
</style>
