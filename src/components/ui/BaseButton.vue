<template>
    <button v-if="!link" :class="mode">
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
        }
    }
};
</script>

<style scoped>
button,
a {
    text-decoration: none;
    padding: 0.4rem 1.5rem;
    border: 0px;
    font: inherit;
    background-color: #386881;
    color: white;
    cursor: pointer;
    text-align: center;
    display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
    background-color: #5588a3;
    color: white;
}

.sidebar {
    background-color: transparent;
    width: 100%;
    text-align: left;
    color: black;
    padding: 1rem 2rem;
    margin: 0.5px 0px;
}

.sidebar:active,
.sidebar.router-link-active {
    background-color: #386881;
    color: white;
}
</style>
