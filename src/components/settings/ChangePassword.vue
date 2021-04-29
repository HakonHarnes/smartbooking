<template>
    <div>
        <h2>Endre passord</h2>
        <form>
            <div class="control">
                <input type="password" placeholder="nåværende passord" />
            </div>
            <div class="control">
                <input type="password" placeholder="nytt passord" />
            </div>
            <div class="control">
                <input type="password" placeholder="gjenta nytt passord" />
            </div>
            <base-button>Lagre</base-button>
        </form>
    </div>
</template>

<style scoped>
.control {
    margin: 1rem 0;
}

input[type='password'] {
    font-size: 1.1rem;
    padding: 0.4rem 0.8rem;
    text-align: center;
    font-family: inherit;
}
</style>
