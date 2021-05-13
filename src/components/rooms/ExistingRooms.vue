<template>
    <base-button @click="saveQrs">Last ned QR-koder</base-button>
    <ul>
        <base-modal title="QR-kode" v-if="showModal" @close="closeModal">
            <template #body><vue-qrcode :value="qrUrl" :width="220"></vue-qrcode></template>
            <template #footer>
                <base-button class="button" @click="saveQr">Last ned</base-button>
                <base-button @click="closeModal" mode="outlined">Lukk</base-button>
            </template>
        </base-modal>
        <li class="description">
            <div class="room">Rom</div>
            <div>Plasser</div>
            <div>Område</div>
            <div>Tilgjengelig</div>
            <div class="qr">QR-kode</div>
            <div class="edit">Rediger</div>
        </li>
        <li v-for="r in rooms" :key="r.room_id">
            <div class="room">{{ r.room_name }}</div>
            <div>{{ r.size }}</div>
            <div>{{ r.building_name }}</div>
            <base-active-attribute
                :active="r.is_active === 1"
                :text="{ true: 'Ja', false: 'Nei' }"
            ></base-active-attribute>
            <div class="qr" @click="showQr(r)">
                <img src="../../assets/qr.png" alt="QR-code" class="qr-code" />
            </div>
            <div class="edit" @click="$emit('edit-room', r.room_id)">
                <base-icon class="icon" name="edit"></base-icon>
            </div>
        </li>
    </ul>
</template>

<script>
import VueQrcode from 'vue-qrcode';
import { saveQrToPdf } from '../utils';

export default {
    components: { VueQrcode },
    props: {
        rooms: Array
    },
    emits: ['edit-room'],
    data() {
        return {
            showModal: false,
            qrUrl: 'https://www.hoie.dev',
            room: {
                room_name: 'Vetles Badekar'
            }
        };
    },
    methods: {
        showQr(room) {
            this.qrUrl = `https://localhost:8080/finn-rom/velg?rom=${room.room_id}`;
            this.room = { ...room };
            this.showModal = true;
        },
        closeModal() {
            this.qrUrl = '';
            this.room = null;
            this.showModal = false;
        },
        async saveQr() {
            await saveQrToPdf([{ ...this.room }]);
        },
        async saveQrs() {
            await saveQrToPdf(this.rooms);
        }
    }
};
</script>

<style scoped>
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    padding: 6px 12px;
    margin: 8px 0;
    display: grid;
    grid-template-columns: 1fr 0.4fr 1fr 0.5fr 0.5fr 0.5fr;
    grid-column-gap: 0.2rem;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    transition: all 0.1s;
}

.button {
    margin-right: 1rem;
}

.description {
    background-color: transparent;
    border-bottom: 1px solid #222;
}

.description div {
    font-weight: 500;
}

.icon {
    color: #386881;
    cursor: pointer;
}

.icon:hover {
    color: #0f3a52;
}

.edit,
.qr {
    justify-self: center;
    cursor: pointer;
}

.qr-code {
    width: 26px;
    height: 26px;
}
</style>
