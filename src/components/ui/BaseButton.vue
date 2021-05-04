<template>
    <button :disabled="disabled" v-if="!link" :class="mode" :type="type">
        <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            required: false,
            default: null
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: '/'
        },
        type: {
            type: String,
            required: false
        },
        disabled: {
            type: Boolean,
            required: false
        }
    }
};
</script>

<style scoped>
button,
a {
    text-decoration: none;
    padding: 0.7rem 1.5rem;
    border: 0px;
    font: inherit;
    background-color: #386881;
    color: white;
    cursor: pointer;
    text-align: center;
    display: inline-block;
    border: 1px solid transparent;
}

button:disabled {
    background-color: #bbb;
    cursor: not-allowed;
}

a:hover,
a:active,
button:hover:enabled,
button:active {
    background-color: #5588a3;
    color: white;
}

button,
a {
    -webkit-user-drag: none;
}

.sidebar {
    background-color: transparent;
    width: 100%;
    text-align: left;
    color: black;
    padding: 0.9rem 1.5rem;
    margin: 0.5px 0px;
}

.sidebar:active,
.sidebar.router-link-active {
    background-color: #386881;
    color: white;
}

.bottombar {
    display: grid;
    justify-content: center;
    background-color: transparent;
    width: 100%;
    color: black;
}

.bottombar:active,
.bottombar.router-link-active {
    background-color: #386881;
    color: white;
}

.outlined {
    background-color: transparent;
    border: 1px solid #386881;
    color: #222;
}

.outlined:hover:enabled {
    background-color: #222;
}

.delete {
    background-color: rgb(207, 63, 63);
    font-size: 0.7rem;
    padding: 0.3rem 0.7rem;
    box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.2);
}

.delete:hover:enabled {
    background-color: rgb(155, 22, 22);
}
</style>
