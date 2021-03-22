<template>
    <div></div>
</template>

<script>
import reservationService from './reservationService.js';

export default {};

reservationService
    .delete(1)
    .then(result => console.log(result))
    .catch(error => console.error(error));
</script>
