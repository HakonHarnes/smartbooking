<template>
    <base-modal v-if="showModal" @close="toggleModal" title="Rediger bruker">
        <template #body><edit-user @close-modal="toggleModal" :id="userId"></edit-user></template>
    </base-modal>
    <base-search @search="search"></base-search>
    <base-card>
        <ul>
            <base-list-description :columns="columns"></base-list-description>
            <user-list-item
                v-for="user in filteredUsers"
                :key="user.id"
                :id="user.id"
                :name="user.name"
                :email="user.email"
                :active="user.active"
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
            userId: null
        };
    },
    computed: {
        users() {
            return this.$store.getters['users/users'];
        },
        filteredUsers() {
            return this.users.filter(user => {
                return user.name.toLowerCase().includes(this.searchKeyword);
            });
        },
        columns() {
            return ['Navn', 'E-post', 'Status', 'Rediger'];
        }
    },
    methods: {
        search(keyword) {
            this.searchKeyword = keyword;
        },
        toggleModal() {
            this.showModal = !this.showModal;
        },
        editUser(id) {
            this.toggleModal();
            this.userId = id;
        }
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
