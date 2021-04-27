<template>
    <form @submit.prevent="submitForm">
        <input
            v-for="index in length"
            :key="index"
            @focus="onFocus"
            @keydown="onKeydown"
            @paste="onPaste"
            type="number"
        />
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
        onPaste(event) {
            event.preventDefault();
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
            if (parseInt(event.key) && event.key !== 'e') {
                event.target.value = event.key;
                event.preventDefault();
                if (event.target.nextElementSibling) {
                    return event.target.nextElementSibling.focus();
                }
            }

            event.preventDefault();
        },
        onKeyup(event) {
            // Moves to previous input field if backspace or left arrow is pressed
            if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
                if (event.target.previousElementSibling) {
                    return event.target.previousElementSibling.focus();
                } else {
                    return;
                }
            }

            // Moves to next input field if enter, right arrow or a number is pressed
            const numbers = /^\d+$/;
            if (event.key === 'Enter' || event.key === 'ArrowRight' || numbers.test(event.key)) {
                if (event.target.nextElementSibling) {
                    event.target.nextElementSibling.focus();
                }
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
