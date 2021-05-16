<template>
    <base-modal v-if="showModal">
        <template #body>Er du sikker?</template>
    </base-modal>

    <div class="modal-header">
        <base-button class="delete" @click="deleteUser" mode="delete" type="button">Slett</base-button>
        <h2 class="title">Rediger bruker</h2>
    </div>
    <form @submit.prevent="save">
        <div class="control">
            <label>Fornavn</label>
            <input type="text" v-model.trim="user.first_name" />
        </div>
        <div class="control">
            <label>Etternavn</label>
            <input type="text" v-model.trim="user.last_name" />
        </div>
        <div class="control">
            <label>E-post</label>
            <input type="email" v-model.trim="user.email" />
        </div>
        <div class="control">
            <label>{{ activeText }}</label>
            <switches color="blue" @click="toggleActive" :value="!!user.is_active"></switches>
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
        user_id: Number
    },
    emits: ['close-modal'],
    data() {
        return {
            showModal: false,
            user: {
                first_name: '',
                last_name: '',
                email: '',
                is_active: null
            }
        };
    },
    methods: {
        save() {
            this.$emit('close-modal');
            this.$store.dispatch('users/updateUser', { user: { user_id: this.user_id, ...this.user } });
        },
        toggleActive() {
            this.user.is_active = this.user.is_active ? 0 : 1;
        },
        async deleteUser() {
            if (confirm('Sikker?')) {
                this.$emit('close-modal');
                await this.$store.dispatch('users/deleteUser', { user_id: this.user_id });
            }
        },
        getSelectedUser() {
            if (this.user_id) {
                this.user = { ...this.$store.getters['users/user'](this.user_id) };
            }
        }
    },
    computed: {
        activeText() {
            return this.user.is_active ? 'Aktiv' : 'Inaktiv';
        }
    },
    mounted() {
        this.getSelectedUser();
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
