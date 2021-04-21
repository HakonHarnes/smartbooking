<template>
    <form @submit.prevent="submitForm">
        <input v-for="index in length" :key="index" @focus="onFocus" @keydown="onInput" type="number" />
    </form>
</template>

<script>
export default {
    emits: ['submit-form'],
    data() {
        return {
            length: 6
        };
    },
    methods: {
        onFocus(event) {
            event.target.select();
        },
        onInput(event) {
            // Limits input to one character
            console.log(event);
            if (event.target.value >= 1) {
                event.target.value = event.target.value.charAt(0);
            } else {
                return event.target.previousElementSibling.focus();
            }

            // Focuses on next input field if there is one
            if (event.target.nextElementSibling) {
                event.target.nextElementSibling.focus();
            }

            // Checks if all inputs are filled
        },
        submitForm() {
            this.$emit('submit-form', { token: '123456' });
        }
    }
};
</script>

<style scoped>
input {
    display: inline-block;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    color: white;
    border: none;
    border-bottom: 2px solid white;
    background-color: transparent;
    width: 40px;
    margin: 10px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type='number'] {
    -moz-appearance: textfield;
}
</style>
