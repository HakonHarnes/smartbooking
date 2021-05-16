<template>
    <base-modal v-if="showModal">
        <template #body>Er du sikker?</template>
    </base-modal>
    <div class="modal-header">
        <base-button class="delete" @click="deleteRoom" mode="delete" type="button">Slett</base-button>
        <h2 class="title">Rediger rom</h2>
    </div>
    <form @submit.prevent="save">
        <div class="control">
            <label>Romnavn</label>
            <input type="text" v-model.trim="room.room_name" />
        </div>
        <div class="control">
            <label>Plasser</label>
            <input type="number" v-model.number="room.size" />
        </div>
        <div class="control switches">
            <label>{{ activeText }}</label>
            <switches color="blue" @click="toggleActive" :value="!!room.is_active"></switches>
        </div>
        <div class="actions">
            <base-button>Lagre</base-button>
            <base-button @click="$emit('close-modal')" type="button" mode="outlined">Lukk</base-button>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        room_id: Number
    },
    emits: ['close-modal'],
    data() {
        return {
            showModal: false,
            room: {
                building_name: '',
                building_id: null,
                room_name: '',
                size: null,
                is_active: null
            }
        };
    },
    methods: {
        save() {
            if (this.room.room_name && this.room.size > 0) {
                this.$emit('close-modal');
                this.$store.dispatch('rooms/updateRoom', { room: { room_id: this.room_id, ...this.room } });
            } else {
                alert('Ugyldig data');
            }
        },
        toggleActive() {
            this.room.is_active = this.room.is_active ? 0 : 1;
        },
        async deleteRoom() {
            if (confirm('Sikker?')) {
                this.$emit('close-modal');
                await this.$store.dispatch('rooms/deleteRoom', { room_id: this.room_id });
            }
        },
        getSelectedRoom() {
            if (this.room_id) {
                this.room = { ...this.$store.getters['rooms/room'](this.room_id) };
            }
        }
    },
    computed: {
        activeText() {
            return this.room.is_active ? 'Tilgjengelig' : 'Utilgjengelig';
        }
    },
    mounted() {
        this.getSelectedRoom();
    }
};
</script>

<style scoped>
form {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
}

label {
    font-weight: 500;
}

.actions {
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
}

.control {
    text-align: left;
    display: grid;
    grid-gap: 0.2rem;
    margin: 0.6rem 0;
}

.modal-header {
    display: grid;
    grid-template-rows: 1.6rem 1fr;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 0.5rem;
}

.title {
    margin: 0;
}

.delete {
    justify-self: right;
}
</style>
