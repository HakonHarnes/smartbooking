<template>
    <choose-room-search></choose-room-search>
    <room-calendar></room-calendar>
</template>

<script>
import ChooseRoomSearch from '../forms/rooms/ChooseRoomSearch';
import RoomCalendar from '../calendar/RoomCalendar';

export default {
    components: { ChooseRoomSearch, RoomCalendar }
};
</script>
