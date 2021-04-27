<template>
    <form>
        <div class="title">Åpningstider for rom</div>
        <div class="day">
            <div class="name">Mandag</div>
            <div><input type="text" /></div>
            <div><input type="text" /></div>
        </div>
        <div class="day">
            <div class="name">Tirsdag</div>
            <div><input type="text" /></div>
            <div><input type="text" /></div>
        </div>
        <div class="day">
            <div class="name">Onsdag</div>
            <div><input type="text" /></div>
            <div><input type="text" /></div>
        </div>
        <div class="day">
            <div class="name">Torsdag</div>
            <div><input type="text" /></div>
            <div><input type="text" /></div>
        </div>
        <div class="day">
            <div class="name">Fredag</div>
            <div><input type="text" /></div>
            <div><input type="text" /></div>
        </div>
        <div class="day">
            <div class="name">Lørdag</div>
            <div><input type="text" /></div>
            <div><input type="text" /></div>
        </div>
        <div class="day">
            <div class="name">Søndag</div>
            <div><input type="text" /></div>
            <div><input type="text" /></div>
        </div>
        <base-button>Oppdater</base-button>
    </form>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style scoped>
.day {
    display: flex;
    align-items: center;
    margin: 1.6rem 0;
}

.name {
    width: 15%;
}

.title {
    margin: 1rem 0;
}

input[type='text'] {
    font-family: inherit;
    font-size: 1.2rem;
    margin: 0 1rem;
    text-align: center;
}
</style>
