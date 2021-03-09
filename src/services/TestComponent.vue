<template>
    <div></div>
</template>

<script>
import userService from './UserService.js';

export default {};

userService
    .register('svein@svein.steig', 'jaeller', 'Svein', 'Homo', '1', 'user')
    .then(result => console.log(result))
    .catch(error => console.error(error));
</script>
