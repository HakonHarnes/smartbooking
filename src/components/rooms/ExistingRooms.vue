<template>
    <ul>
        <base-modal title="QR-kode" v-if="showModal" @close="closeModal">
            <template #body><vue-qrcode :value="qrUrl" :width="220"></vue-qrcode></template>
            <template #footer>
                <base-button class="button" @click="saveQr">Last ned</base-button>
                <base-button @click="closeModal" mode="outlined">Lukk</base-button>
            </template>
        </base-modal>
        <li class="description">
            <div class="area">Område</div>
            <div class="room">Rom</div>
            <div class="size">Plasser</div>
            <div class="status">Status</div>
            <div class="qr">QR</div>
            <div class="edit">Rediger</div>
        </li>
        <li v-for="r in rooms" :key="r.room_id">
            <div class="area">{{ r.building_name }}</div>
            <div class="room">{{ r.room_name }}</div>
            <div>{{ r.size }}</div>

            <base-active-attribute
                class="status"
                :active="r.is_active === 1"
                :text="{ true: 'Aktiv', false: 'Inaktiv' }"
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
    margin-top: 0.5rem;
    list-style: none;
    padding: 0;
}

li {
    padding: 6px 12px;
    margin: 0.2rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr 5rem 5rem 5rem 5rem;
    grid-column-gap: 0.2rem;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
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

@media only screen and (max-width: 750px) {
    ul {
        margin-top: -6rem;
    }

    li {
        grid-template-areas:
            'area   qr    edit'
            'room   qr    edit'
            'status qr      edit'
            'size   qr    edit';
        grid-template-columns: 1fr 2rem 2rem;
    }

    .area {
        grid-area: area;
    }

    .status {
        grid-area: status;
    }

    .qr {
        grid-area: qr;
        justify-self: left;
    }

    .room {
        grid-area: room;
    }

    .size {
        grid-area: size;
    }

    .edit {
        grid-area: edit;
        justify-self: left;
    }

    .description {
        visibility: hidden;
    }
}
</style>
