<template>
    <div></div>
</template>

<script>
import reservationService from './reservationService.js';

export default {};

reservationService
    .getById(1)
    .then(result => console.log(result))
    .catch(error => console.error(error));
</script>
