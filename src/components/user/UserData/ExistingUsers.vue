<template>
    <base-search @search="search"></base-search>
    <base-card>
        <ul>
            <base-list-description :columns="columns"></base-list-description>
            <base-list-item
                v-for="user in filteredUsers"
                :key="user.name"
                :name="user.name"
                :email="user.email"
                :active="user.active"
            >
            </base-list-item>
        </ul>
    </base-card>
</template>

<script>
export default {
    data() {
        return {
            searchKeyword: '',
            columns: ['Navn', 'E-post', 'Status'],
            users: [
                { name: 'Steig', email: 'steig@live.no', active: true },
                { name: 'Gaute', email: 'gaute@live.no', active: true },
                { name: 'Vetle', email: 'vetle@live.no', active: false },
                { name: 'Vetle', email: 'vetle@live.no', active: false },
                { name: 'Vetle', email: 'vetle@live.no', active: false }
            ]
        };
    },
    computed: {
        filteredUsers() {
            return this.users.filter(user => {
                return user.name.toLowerCase().includes(this.searchKeyword);
            });
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
