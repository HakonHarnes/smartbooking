<template>
    <div class="backdrop" @mousedown.self="close">
        <div class="modal">
            <header v-if="title">
                <slot name="header">
                    <h3>{{ title }}</h3>
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
    z-index: 2;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    padding: 0.4rem 1.6rem;
    overflow: hidden;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    display: flex;
    flex-direction: column;
}

header {
    border-bottom: 1px solid #eeeeee;
    color: #386881;
    justify-content: space-between;
}

footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
}

section {
    position: relative;
    padding: 10px;
}

.close {
    margin-top: auto;
}
</style>
