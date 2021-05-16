<template>
    <div class="backdrop" @mousedown.self="close">
        <div class="modal">
            <header v-if="title">
                <slot name="header">
                    <h2>{{ title }}</h2>
                </slot>
            </header>
            <section>
                <slot name="body"></slot>
            </section>
            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    },
    emits: ['close'],
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 11;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    overflow: hidden;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    max-width: 350px;
    width: 100%;
    margin: 0.5rem;
    padding: 1rem;
}

header {
    display: grid;
    place-items: center center;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 1rem;
}

h2 {
    margin: 0;
}

footer {
    border-top: 1px solid #eeeeee;
    place-items: center center;
    width: 100%;
}

section {
    text-align: center;
}

.close {
    margin-top: auto;
}
</style>
