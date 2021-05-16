<template>
    <li>
        <div class="room">Rom</div>
        <div class="area">Område</div>
        <div class="size">Plasser</div>
        <div class="date">Dato</div>
        <div class="from">Fra</div>
        <div class="to">Til</div>
        <div class="action">{{ action }}</div>
    </li>
</template>

<script>
export default {
    props: {
        action: String
    }
};
</script>

<style scoped>
li {
    margin: 0.2rem 0;
    padding: 0.4rem 1rem;
    display: grid;
    grid-template-columns: 0.9fr 1fr 0.5fr 1fr 0.6fr 0.6fr 0.25fr;
    justify-content: space-between;
    align-items: center;
    grid-gap: 0.2rem;
    grid-column-gap: 0.8rem;
    background-color: #fff;
    font-weight: 500;
    background-color: transparent;
    border-bottom: 1px solid #222;
}

@media only screen and (max-width: 700px) {
    li {
        grid-template-columns: 1fr 0.65fr 1fr 0.5fr 0.25fr;
        grid-template-rows: 1fr 1fr;
    }

    .action {
        grid-column: 5;
        grid-row: 1 / span 2;
    }

    .area {
        grid-row: 2;
    }

    .from {
        grid-column: 4;
        grid-row: 1;
    }

    .to {
        grid-column: 4;
        grid-row: 2;
    }
}

@media only screen and (max-width: 500px) {
    li {
        grid-template-columns: 1fr 1fr 0.2fr;
        grid-template-rows: 1fr 1fr 1fr;
    }

    .action {
        grid-column: 3;
        grid-row: 1 / span 3;
    }

    .from {
        grid-column: 2;
        grid-row: 2;
    }

    .to {
        grid-column: 2;
        grid-row: 3;
    }

    .size {
        grid-row: 3;
    }
}

.action {
    justify-self: center;
}
</style>
