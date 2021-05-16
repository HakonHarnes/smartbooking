<template>
    <base-card v-if="data.length > 0">
        <h2>{{ title }}</h2>
        <ul>
            <li :class="type" v-for="(user, i) in data" :key="i">
                <p>{{ subtitle }}</p>

                <div class="prop">{{ Object.values(user)[0] }}</div>
                <div class="prop">{{ Object.values(user)[1] }}</div>
                <div class="prop">{{ Object.values(user)[2] }}</div>
            </li>
        </ul>
    </base-card>
</template>

<script>
export default {
    props: ['data', 'type', 'title', 'subtitle']
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
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center center;
    padding: 0.5rem 1rem;
    width: 100%;
    height: 4.5rem;
    text-decoration: none;
}

li p {
    font-weight: 500;
    grid-row: 1;
    grid-column: 1/4;
    margin: 0;
}

.prop {
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
        grid-template-rows: repeat(4, 1fr);
        grid-template-columns: 1fr;
        place-items: center left;
        height: 6rem;
    }

    .prop:nth-last-child(2) {
        grid-row: 3;
    }
    .prop:nth-last-child(1) {
        grid-row: 4;
    }
}
</style>
