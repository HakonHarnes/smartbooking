<template>
    <base-modal v-if="showModal" @close="toggleModal">
        <template #body><edit-user @close-modal="toggleModal" :user_id="user_id"></edit-user></template>
    </base-modal>
    <base-search @search="search"></base-search>
    <base-card>
        <base-spinner v-if="loading"></base-spinner>
        <ul v-else>
            <base-list-description :columns="columns"></base-list-description>
            <user-list-item
                v-for="user in filteredUsers"
                :key="user.user_id"
                :user_id="user.user_id"
                :first_name="user.first_name"
                :last_name="user.last_name"
                :email="user.email"
                :active="user.is_active"
                @edit-user="editUser"
            ></user-list-item>
        </ul>
    </base-card>
</template>

<script>
import EditUser from '../../forms/users/EditUser.vue';
import UserListItem from './UserListItem.vue';

export default {
    components: { EditUser, UserListItem },
    data() {
        return {
            searchKeyword: '',
            showModal: false,
            user_id: null
        };
    },
    computed: {
        users() {
            return this.$store.getters['users/users'];
        },
        filteredUsers() {
            return this.users?.filter(user => {
                return `${user.first_name} ${user.last_name}`.toLowerCase().includes(this.searchKeyword);
            });
        },
        columns() {
            return ['Navn', 'E-post', 'Status', 'Rediger'];
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        search(keyword) {
            this.searchKeyword = keyword;
        },
        toggleModal() {
            this.showModal = !this.showModal;
        },
        editUser(user_id) {
            this.user_id = user_id;
            this.toggleModal();
        }
    },
    created() {
        this.$store.dispatch('users/getUsers');
    }
};
</script>

<style scoped>
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
</style>
