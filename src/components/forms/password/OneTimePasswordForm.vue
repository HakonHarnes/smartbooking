<template>
    <form @submit.prevent="submitForm" ref="inputs">
        <input
            v-for="index in length"
            :key="index"
            @input="onInput"
            @paste="onPaste"
            @keydown="onKeydown"
            type="number"
        />
    </form>
</template>

<script>
export default {
    props: ['length'],
    emits: ['submit-form'],
    mounted() {
        this.$refs.inputs[0].focus();
    },
    methods: {
        submitForm(code) {
            this.$emit('submit-form', { code });
        },

        getVerificationCode() {
            let code = '';
            for (const input of this.$refs.inputs) code += input.value;

            return code;
        },

        onInput(event) {
            // Accept input if it is a digit
            if (parseInt(event.data) >= 0) event.target.value = event.data;
            else return;

            // Submits the form if all inputs are filled
            const code = this.getVerificationCode();
            if (code.length === this.length) return this.submitForm(code);

            // Focuses on next input if there is one
            if (event.target.nextElementSibling) return event.target.nextElementSibling.focus();
        },

        onPaste(event) {
            event.preventDefault();

            // Splits the paste event into separate input events
            const input = (event.clipboardData || window.clipboardData).getData('Text');
            for (let i = 0; i < input.length && i < this.$refs.inputs.length; i++) {
                this.$refs.inputs[i].dispatchEvent(
                    new InputEvent('input', {
                        data: input.charAt(i)
                    })
                );
            }
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

            // Prevents 'e' from being accepted as a valid digit
            if (event.key === 'e') event.preventDefault();
        }
    }
};
</script>

<style scoped>
input {
    display: inline-block;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
    background-color: #184c68;
    border: none;
    border-radius: 5px;
    width: 45px;
    padding: 8px;
    margin: 4px;
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

@media only screen and (max-width: 420px) {
    input {
        font-size: 2rem;
        width: 2.5rem;
    }
}

@media only screen and (max-width: 330px) {
    input {
        font-size: 1.5rem;
        width: 2rem;
        margin: 3px;
    }
}
</style>
