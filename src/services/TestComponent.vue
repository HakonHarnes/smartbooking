<template>
    <div></div>
</template>

<script>
import reservationService from './ReservationService.js';

export default {};

reservationService
    .getById(2)
    .then(result => console.log(result))
    .catch(error => console.error(error));
</script>
