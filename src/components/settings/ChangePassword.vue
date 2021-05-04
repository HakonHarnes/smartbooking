<template>
    <div>
        <h2>Endre passord</h2>
        <form @submit.prevent="handleSave">
            <div class="control">
                <input v-model="oldPassword" type="password" placeholder="Nåværende passord" />
            </div>
            <div class="control">
                <input v-model="newPassword" type="password" placeholder="Nytt passord" />
            </div>
            <div class="control">
                <input v-model="confirmNewPassword" type="password" placeholder="Gjenta nytt passord" />
            </div>
            <base-button>Lagre</base-button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            oldPassword: '',
            newpassword: '',
            confirmNewPassword: ''
        };
    },
    methods: {
        handleSave() {}
    }
};
</script>

<style scoped>
.control {
    margin: 1rem 0;
}

input[type='password'] {
    font-size: 1.1rem;
    padding: 0.5rem;
    font-family: inherit;
}
</style>
