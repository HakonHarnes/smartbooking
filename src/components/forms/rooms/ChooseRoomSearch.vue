<template>
    <base-card class="card">
        <form>
            <div>
                <label>Bygg</label>
                <select></select>
            </div>
            <div>
                <label>Rom</label>
                <select></select>
            </div>
            <div>
                <base-button>Søk</base-button>
            </div>
        </form>
    </base-card>
</template>

<style scoped>
.card {
    margin: 0;
    width: 50%;
    min-width: 25rem;
    max-width: 50rem;
}

form {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

form div {
    display: flex;
    flex-direction: column;
    align-items: start;
}

select {
    min-width: 4rem;
}

label {
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 500;
}
</style>
