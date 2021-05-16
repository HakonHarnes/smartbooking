<template>
    <ul>
        <li class="description">
            <div class="area">Område</div>
            <div class="status">Status</div>
            <div class="edit">Rediger</div>
        </li>
        <li v-for="b in buildings" :key="b.building_id">
            <div class="area">{{ b.building_name }}</div>
            <base-active-attribute
                class="status"
                :active="b.building_is_active === 1"
                :text="{ true: 'Aktiv', false: 'Inaktiv' }"
            ></base-active-attribute>
            <div class="edit" @click="$emit('edit-area', b.building_id)">
                <base-icon class="icon" name="edit"></base-icon>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        buildings: Array
    },
    emits: ['edit-area']
};
</script>

<style scoped>
ul {
    margin-top: 0.5rem;
    list-style: none;
    padding: 0;
}

li {
    padding: 6px 12px;
    margin: 0.2rem 0;
    display: grid;
    grid-template-columns: 1fr 5rem 5rem;
    grid-column-gap: 0.2rem;
    align-items: center;
    justify-content: space-between;
    justify-items: center;
    background-color: #fff;
}

.description {
    background-color: transparent;
    border-bottom: 1px solid #222;
}

.description div {
    font-weight: 500;
}

.icon {
    color: #386881;
    cursor: pointer;
}

.icon:hover {
    color: #0f3a52;
}

.area {
    justify-self: start;
}
</style>
