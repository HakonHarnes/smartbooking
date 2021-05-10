<template>
    <h2>Brukerinformasjon</h2>
    <div>
        <div class="firstname">
            <h4>Fornavn</h4>
            <p>{{ first_name }}</p>
        </div>
        <div class="lastname">
            <h4>Etternavn</h4>
            <p>{{ last_name }}</p>
        </div>
        <div class="email">
            <h4>E-post</h4>
            <p>{{ email }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        first_name: String,
        last_name: String,
        email: String
    }
};
</script>

<style scoped>
.firstname,
.lastname,
.email {
    margin: 1rem 0;
}

p {
    margin: 0;
    font-size: 1.2rem;
}
</style>
