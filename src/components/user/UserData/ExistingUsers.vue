<template>
    <div class="container">
        <base-modal v-if="showModal" @close="toggleModal">
            <template #body><edit-user @close-modal="toggleModal" :user_id="user_id"></edit-user></template>
        </base-modal>
        <base-search class="search" @search="search"></base-search>
        <base-spinner v-if="loading"></base-spinner>
        <div class="empty-response" v-else-if="!users.length">Fant ingen brukere</div>
        <ul v-else>
            <li class="description">
                <div class="name">Navn</div>
                <div class="email">E-post</div>
                <div class="status">Status</div>
                <div class="edit">Rediger</div>
            </li>
            <li class="content" v-for="u in users" :key="u.user_id">
                <div class="name">{{ u.first_name }} {{ u.last_name }}</div>
                <div class="email">{{ u.email }}</div>
                <base-active-attribute
                    class="status"
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
.empty-response {
    margin-top: 1rem;
}

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
    grid-template-columns: 1fr 1fr 5rem 4rem;
    align-items: center;
    background-color: #fff;
    max-width: 2500px;
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

.status {
    justify-self: center;
}

.icon {
    color: #386881;
    cursor: pointer;
}

.icon:hover {
    color: #0f3a52;
}

@media only screen and (max-width: 800px) {
    li {
        grid-template-areas:
            'name   status'
            'email  edit';
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 5rem;
    }

    .name {
        grid-area: name;
    }

    .status {
        grid-area: status;
    }

    .email {
        grid-area: email;
    }

    .edit {
        grid-area: edit;
    }
}

@media only screen and (max-width: 400px) {
    ul {
        margin-top: -3rem;
    }

    li {
        grid-template-areas:
            'name    name       name'
            'email   email      edit'
            'status  status     status';
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: auto auto 1fr;
    }

    .description {
        visibility: hidden;
    }

    .status {
        justify-self: left;
    }

    .edit {
        justify-self: right;
    }

    .search {
        max-width: none;
    }
}
</style>
