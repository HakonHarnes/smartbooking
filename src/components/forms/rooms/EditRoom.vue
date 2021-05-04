<template>
    <base-modal v-if="showModal">
        <template #body>Er du sikker?</template>
    </base-modal>
    <div class="header">
        <h3>Rediger rom</h3>
        <base-button class="delete" @click="deleteRoom" mode="delete" type="button">Slett</base-button>
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
            <label class="marginBottom">{{ activeText }}</label>
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
    align-items: center;
}

.actions {
    margin-top: 1rem;
}

.actions > * {
    margin: 0 0.2rem;
}

.control {
    display: flex;
    flex-direction: column;
    margin: 0.6rem 0;
}

.marginBottom {
    margin-bottom: 0.6rem;
}

input {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.2rem;
}

.switches {
    align-items: center;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #386881;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
