<template>
    <h2>Velkommen til romreservering hos {{ organization_name }}.</h2>
    <div>For å finne ledige rom, naviger til 'finn rom' ved hjelp av menyen</div>
</template>

<script>
export default {
    props: {
        organization_name: String
    }
};
</script>

<style scoped>
h2 {
    margin: 0 0 1rem;
    color: #386881;
    font-weight: 500;
    font-size: 1.4rem;
    letter-spacing: 1px;
}

div {
    font-weight: 500;
}
</style>
