<template>
    <div class="container">
        <base-modal v-if="showModal" @close="toggleModal">
            <template #body><edit-user @close-modal="toggleModal" :user_id="user_id"></edit-user></template>
        </base-modal>
        <base-search @search="search"></base-search>
        <base-spinner v-if="loading"></base-spinner>
        <div v-else-if="!users.length">Fant ingen brukere</div>
        <ul v-else>
            <li class="description">
                <div class="name">Navn</div>
                <div>E-post</div>
                <div>Status</div>
                <div class="edit">Rediger</div>
            </li>
            <li v-for="u in users" :key="u.user_id">
                <div class="name">{{ u.first_name }} {{ u.last_name }}</div>
                <div>{{ u.email }}</div>
                <base-active-attribute
                    :active="u.is_active === 1"
                    :text="{ true: 'Aktiv', false: 'Inaktiv' }"
                ></base-active-attribute>
                <div class="edit" @click="editUser(u.user_id)"><base-icon class="icon" name="edit"></base-icon></div>
            </li>
        </ul>
    </div>
</template>

<script>
import EditUser from '../../forms/users/EditUser.vue';

export default {
    components: { EditUser },
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
.container {
    margin-top: 2rem;
}

ul {
    margin-top: 0.5rem;
    list-style: none;
    padding: 0;
}

li {
    padding: 0.4rem 1rem;
    margin: 0.2rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
    grid-column-gap: 0.2rem;
    align-items: center;
    justify-content: space-between;
    justify-items: start;
    background-color: #fff;
    transition: all 0.1s;
}

.description {
    background-color: transparent;
    border-bottom: 1px solid #222;
}

.description div {
    font-weight: 500;
}

.edit {
    justify-self: center;
}

.icon {
    color: #386881;
    cursor: pointer;
}

.icon:hover {
    color: #0f3a52;
}
</style>
