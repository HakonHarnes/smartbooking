<template>
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
        },
        toggleActive() {
            this.user.active = !this.user.active;
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
    display: flex;
    flex-direction: column;
    align-items: center;
}

.actions {
    margin-top: 1rem;
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
</style>
