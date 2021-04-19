<template>
    <li>
        <div>{{ name }}</div>
        <div>{{ size }}</div>
        <div>{{ building }}</div>
        <base-active-attribute :active="active" :text="text"></base-active-attribute>
        <div>
            <base-icon @click="editRoom" name="edit" class="edit"></base-icon>
        </div>
    </li>
</template>

<script>
export default {
    emits: ['edit-room'],
    props: {
        id: Number,
        name: String,
        size: Number,
        description: String,
        building: String,
        active: Boolean
    },
    computed: {
        text() {
            return { true: 'Ja', false: 'Nei' };
        }
    },
    methods: {
        editRoom() {
            this.$emit('edit-room', this.id);
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
}

li div {
    text-align: center;
    flex: 1;
}

.edit {
    cursor: pointer;
    color: #386881;
}
</style>
