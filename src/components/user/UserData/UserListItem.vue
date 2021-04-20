<template>
    <li>
        <div>{{ `${first_name} ${last_name}` }}</div>
        <div>{{ email }}</div>
        <base-active-attribute :active="!!active" :text="text"></base-active-attribute>
        <div>
            <base-icon @click="editUser" name="edit" class="edit"></base-icon>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        user_id: Number,
        first_name: String,
        last_name: String,
        email: String,
        active: Number
    },
    emits: ['edit-user'],
    computed: {
        text() {
            return { true: 'Aktiv', false: 'Inaktiv' };
        }
    },
    methods: {
        deleteUser() {
            this.$store.dispatch('users/deleteUser', { user_id: this.user_id });
        },
        editUser() {
            this.$emit('edit-user', this.user_id);
        }
    }
};
</script>

<style scoped>
li {
    list-style: none;
    margin: 1rem 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

li div {
    text-align: center;
    flex: 1;
}

.edit {
    color: #386881;
    cursor: pointer;
}

.edit:hover {
    color: #aaa;
}
</style>
