<template>
    <base-card v-if="data.length > 0">
        <h2>{{ title }}</h2>
        <ul>
            <li :class="type" v-for="(user, index) in data" :key="index">
                <p>Bruker finnes allerede</p>
                <div>{{ user.firstName }} {{ user.lastName }}</div>
                <div>{{ user.email }}</div>
            </li>
        </ul>
    </base-card>
</template>

<script>
export default {
    props: ['data', 'type', 'title']
};
</script>

<style scoped>
ul {
    display: grid;
    grid-gap: 0.5rem;
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
}

li {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr 1fr;
    place-items: center center;
    padding: 0.5rem 1rem;
    width: 100%;
    height: 4.5rem;
    text-decoration: none;
}

li p {
    font-weight: 500;
    grid-row: 1;
    grid-column: 1/3;
    margin: 0;
}

li div {
    grid-row: 2;
}
.error {
    background-color: rgb(255, 86, 86);
}

.warning {
    background-color: rgb(245, 172, 37);
}

.success {
    background-color: rgb(112, 204, 76);
}

@media only screen and (max-width: 500px) {
    li {
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr;
        place-items: center left;
        height: 4.5rem;
    }

    li div:last-child {
        grid-row: 3;
    }
}
</style>
