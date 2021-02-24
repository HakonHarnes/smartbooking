<template>
    <div></div>
</template>

<script>
import userService from './UserService.js';

export default {};

userService
    .test()
    .then(result => console.log(result))
    .catch(error => console.error(error));
</script>
