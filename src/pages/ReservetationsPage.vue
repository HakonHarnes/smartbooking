<template>
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
            <ul>
                <base-list-description :columns="columns"></base-list-description>
                <reservation-list-item
                    v-for="res in reservations"
                    :key="res.id"
                    :id="res.id"
                    :roomName="res.roomName"
                    :building="res.building"
                    :seats="res.seats"
                    :description="res.description"
                    :start="res.start"
                    :end="res.end"
                    :type="'delete'"
                    :dateSubstringChars="[0, -3]"
                    @handle-action="deleteReservation"
                ></reservation-list-item>
            </ul>
        </base-card>
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
            return ['Rom', 'Bygg', 'Plasser', 'Romtype', 'Start', 'Slutt', 'Slett'];
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
            console.log(resId);
            this.resId = resId;
            this.toggleModal();
        },
        confirmDelete() {
            this.$store.dispatch('reservations/deleteReservation', { resId: this.resId });
            this.resId = null;
            this.toggleModal();
        }
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
