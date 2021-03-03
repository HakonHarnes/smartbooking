<template>
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
            ></user-list-item>
        </ul>
    </base-card>
</template>

<script>
import UserListItem from './UserListItem.vue';

export default {
    components: { UserListItem },
    data() {
        return {
            searchKeyword: ''
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
