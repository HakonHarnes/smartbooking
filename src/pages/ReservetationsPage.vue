<template>
    <customer-reservations v-if="user.role === 'customer'"></customer-reservations>
    <div v-else>
        <base-modal @close="toggleModal" v-if="showModal" title="Slette reservasjon">
            <template #body>Er du sikker?</template>
            <template #footer>
                <base-button @click="confirmDelete" class="modalButton">Ja</base-button>
                <base-button @click="toggleModal" mode="outlined">Avbryt</base-button>
            </template>
        </base-modal>
        <div class="root">
            <h2>Dine reservasjoner</h2>
            <base-spinner v-if="loading"></base-spinner>
            <div class="empty-response" v-else-if="!loading && !reservations.length">Fant ingen reservasjoner</div>
            <ul v-else-if="!loading && reservations.length">
                <reservation-description action="Slett"></reservation-description>
                <reservation-list-item
                    v-for="res in reservations"
                    :key="res.res_id"
                    :id="res.res_id"
                    :room_name="res.room_name"
                    :building="res.building_name"
                    :size="res.size"
                    :date="true"
                    :start="res.start"
                    :end="res.end"
                    :type="'delete'"
                    :dateSubstringChars="[0, -3]"
                    @handle-action="deleteReservation"
                ></reservation-list-item>
            </ul>
        </div>
    </div>
</template>

<script>
import CustomerReservations from '../components/customer/CustomerReservations';
import ReservationDescription from '../components/reservations/ReservationDescription';
import ReservationListItem from '../components/reservations/ReservationListItem';

export default {
    components: { ReservationDescription, ReservationListItem, CustomerReservations },
    data() {
        return {
            showModal: false,
            resId: null
        };
    },
    computed: {
        loading() {
            return this.$store.getters.loading;
        },
        reservations() {
            return this.$store.getters['reservations/reservations'];
        },
        user() {
            return this.$store.getters['auth/user'];
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

.modalButton {
    margin: 1rem 0;
    margin-right: 0.5rem;
}
</style>
