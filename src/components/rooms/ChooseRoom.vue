<template>
    <choose-room-search @load-room="loadRoom"></choose-room-search>
    <base-spinner v-if="loading && buildings.length"></base-spinner>
    <room-calendar
        v-else-if="!loading && room_id && currentDays.length"
        :bookableTimes="bookableTimes"
        :buildingPolicy="buildingPolicy"
        :days="currentDays"
        :perPage="7"
        @book-room="bookRoom"
    ></room-calendar>
</template>

<script>
import { dayOfWeekMapperEng, getDateString } from '../utils';
import ChooseRoomSearch from '../forms/rooms/ChooseRoomSearch';
import RoomCalendar from '../calendar/RoomCalendar';

export default {
    components: { ChooseRoomSearch, RoomCalendar },
    data() {
        return {
            room_id: '',
            currentDays: [],
            bookingAvailableInterval: {
                from: null,
                to: null
            },
            bookableTimes: {
                min: null,
                max: null
            },
            buildingPolicy: null
        };
    },
    computed: {
        buildings() {
            return this.$store.getters['buildings/buildings'];
        },
        loading() {
            return this.$store.getters.loading;
        },
        reservations() {
            return this.$store.getters['reservations/reservations'];
        },
        policy() {
            return this.$store.getters['policies/policy'];
        }
    },
    watch: {},
    methods: {
        async loadRoom(room_id, building_id) {
            await this.getBuildingPolicy(building_id);
            this.findTimespan();
            this.initialiseCalendar();
            this.room_id = room_id;
            this.loadReservations(room_id);
        },
        async getBuildingPolicy(building_id) {
            this.buildingPolicy = await this.$store.dispatch('policies/getBuildingPolicy', { building_id });
            console.log(this.buildingPolicy);
        },
        findTimespan() {
            if (this.buildingPolicy) {
                const numbers = Object.values(this.buildingPolicy)
                    .filter(num => typeof num === 'string')
                    .map(num => parseInt(num.replace(':', '')));
                const minNum = ('0' + Math.min(...numbers)).slice(-4);
                const maxNum = ('0' + Math.max(...numbers)).slice(-4);
                const min = `${minNum.substring(0, 2)}:${minNum.substring(2, 4)}`;
                const max = `${maxNum.substring(0, 2)}:${maxNum.substring(2, 4)}`;
                this.bookableTimes = {
                    min,
                    max
                };
            }
        },
        async bookRoom(date, from, to) {
            const dateString = getDateString(date, false);

            const reservation = {
                room_id: this.room_id,
                start: new Date(`${dateString}T${from}:00.000Z`),
                end: new Date(`${dateString}T${to}:00.000Z`)
            };

            await this.$store.dispatch('reservations/createReservation', { reservation });
            this.loadReservations(this.room_id);
        },
        initialiseCalendar() {
            const today = new Date();
            const first = today.getDate() - today.getDay() + 1;

            const daysAhead = this.policy?.max_days_lookup;

            this.currentDays = new Array(daysAhead).fill(0).map((_, idx) => {
                const date = new Date(new Date(today).setDate(first + idx));
                return {
                    date,
                    weekday: dayOfWeekMapperEng[date.getDay()],
                    reservations: []
                };
            });
            this.bookingAvailableInterval = {
                from: getDateString(new Date(this.currentDays[0].date), false),
                to: getDateString(
                    new Date(new Date(this.currentDays[this.currentDays.length - 1].date).setDate(first + daysAhead)),
                    false
                )
            };
        },
        renderReservations() {
            this.reservations.forEach(reservation => {
                const currDates = this.currentDays.map(day => day.date.toISOString().substring(0, 10));
                if (currDates.includes(reservation.start.toISOString().substring(0, 10))) {
                    const idx = currDates.indexOf(reservation.start.toISOString().substring(0, 10));
                    this.currentDays[idx].reservations.push({
                        ...reservation
                    });
                }
            });
        },
        async loadReservations(room_id) {
            await this.$store.dispatch('reservations/getReservationsByRoom', {
                room_id,
                ...this.bookingAvailableInterval
            });
            this.renderReservations();
        }
    },
    created() {
        const roomId = +this.$route.query.romId;
        console.log(roomId);
        if (roomId) {
            console.log('ID');
            console.log(this.$store);
            const { building_id } = this.$store.getters['rooms/buildingByRoom'](roomId);
            this.loadRoom(roomId, building_id);
        }
    }
};
</script>
