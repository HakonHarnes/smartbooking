<template>
    <base-card class="card">
        <form @submit.prevent="search">
            <div class="form-control">
                <label>Dato</label>
                <input type="date" />
            </div>
            <div class="form-control">
                <label>Fra kl.</label>
                <input type="time" />
            </div>
            <div class="form-control">
                <label>Til kl.</label>
                <input type="time" />
            </div>
            <div class="form-control">
                <label>Bygg</label>
                <select></select>
            </div>
            <div class="form-control">
                <base-button>Søk</base-button>
            </div>
        </form>
    </base-card>
</template>

<style scoped>
.card {
    margin: 2rem 0 1rem;
    width: min-content;
}

form {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

form div {
    display: flex;
    flex-direction: column;
    align-items: start;
}

select,
input[type='date'],
input[type='time'] {
    padding: 0.3rem 0.2rem;
    font-family: inherit;
    font-size: 0.9rem;
}

select {
    min-width: 10rem;
}

label {
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.3rem;
}
.form-control {
    margin: 0 1rem;
}
</style>
