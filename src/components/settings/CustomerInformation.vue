<template>
    <div class="card">
        <h2>Kundeinformasjon</h2>
        <div class="content">
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

.content {
    height: 70%;
    display: flex;
}

.column {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

p {
    margin: 0;
    font-size: 1.2rem;
}
</style>
