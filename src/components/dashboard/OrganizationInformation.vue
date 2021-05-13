<template>
    <h2>Organisasjonsinformasjon</h2>
    <div :style="{ display: 'flex' }">
        <div class="column">
            <div>
                <h4>Navn</h4>
                <p>{{ organization_name }}</p>
            </div>
            <div>
                <h4>Adresse</h4>
                <p>{{ organization_address }}</p>
            </div>
        </div>
        <div class="column">
            <div>
                <h4>Org. nummer</h4>
                <p>{{ organization_number }}</p>
            </div>
            <div>
                <h4>Poststed</h4>
                <p>{{ postal_code }} {{ postal_zone }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        organization_name: String,
        organization_number: Number,
        organization_address: String,
        postal_code: Number,
        postal_zone: String
    }
};
</script>

<style scoped>
.card {
    height: 100%;
}

.column {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

h4 {
    margin: 0.6rem 0 0.2rem;
}

p {
    margin: 0 0 0.6rem;
    font-size: 1.2rem;
}
</style>
