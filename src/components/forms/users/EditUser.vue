<template>
    <base-modal v-if="showModal">
        <template #body>Er du sikker?</template>
    </base-modal>
    <div class="header">
        <h3>Rediger bruker</h3>
        <base-button class="delete" @click="deleteUser" mode="delete" type="button">Slett</base-button>
    </div>
    <form @submit.prevent="save">
        <div class="control">
            <label>Navn</label>
            <input type="text" v-model.trim="user.name" />
        </div>
        <div class="control">
            <label>E-post</label>
            <input type="email" v-model.trim="user.email" />
        </div>
        <div class="control">
            <label class="marginBottom">{{ activeText }}</label>
            <switches color="blue" @click="toggleActive" :value="user.active"></switches>
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
        id: Number
    },
    emits: ['close-modal'],
    data() {
        return {
            showModal: true,
            user: {
                name: '',
                email: '',
                active: false
            }
        };
    },
    methods: {
        save() {
            this.$emit('close-modal');
            this.$store.dispatch('users/updateUser', { user: { id: this.id, ...this.user } });
        },
        toggleActive() {
            this.user.active = !this.user.active;
        },
        deleteUser() {
            if (confirm('Sikker?')) {
                alert('sletta!');
            }
        }
    },
    computed: {
        activeText() {
            return this.user.active ? 'Aktiv' : 'Inaktiv';
        },
        findUser() {
            return this.$store.getters['users/user'];
        }
    },
    mounted() {
        this.user = { ...this.findUser(this.id) };
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

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #386881;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
