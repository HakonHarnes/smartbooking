<template>
    <form @submit.prevent="submitForm" ref="inputs">
        <input v-for="index in length" :key="index" @keydown="onKeydown" @focus="onFocus" type="number" />
    </form>
</template>

<script>
export default {
    emits: ['submit-form'],
    mounted() {
        this.$refs.inputs[0].focus();
    },
    data() {
        return {
            length: 6
        };
    },
    methods: {
        getCode(input) {
            let code = '';

            while (input) {
                code = input.value + code;
                input = input.previousElementSibling;
            }

            return code;
        },
        onFocus(event) {
            event.target.select();
        },
        onKeydown(event) {
            // Deletes input and goes to previous input if backspace is pressed
            if (event.key === 'Backspace') {
                event.target.value = '';
                event.preventDefault();
                if (event.target.previousElementSibling) {
                    return event.target.previousElementSibling.focus();
                }
            }

            // Goes to previous input if left arrow is pressed
            if (event.key === 'ArrowLeft') {
                if (event.target.previousElementSibling) {
                    event.preventDefault();
                    return event.target.previousElementSibling.focus();
                }
            }

            // Goes to next input if right arrow is pressed
            if (event.key === 'ArrowRight' || event.key === 'Enter') {
                if (event.target.nextElementSibling) {
                    event.preventDefault();
                    return event.target.nextElementSibling.focus();
                }
            }

            if (event.key === 'e') {
                event.preventDefault();
            }

            // Goes to next input if valid number is entered
            if (parseInt(event.key) >= 0) {
                event.target.value = event.key;
                event.preventDefault();
                if (event.target.nextElementSibling) {
                    return event.target.nextElementSibling.focus();
                } else {
                    const code = this.getCode(event.target);
                    if (code.length === 6) this.submitForm(code);
                }
            }

            event.preventDefault();
        },
        submitForm(code) {
            this.$emit('submit-form', { code });
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
    background-color: #184c68;
    border: none;
    border-radius: 5px;
    width: 50px;
    padding: 8px;
    margin: 5px;
}

input:focus {
    outline: none;
    background-color: #467c99;
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
