import { createStore } from 'vuex';

import authentication from './modules/authentication/index';
import buildings from './modules/buildings/index';
import general from './modules/general/index';
import users from './modules/users/index';
import reservations from './modules/reservations/index';
import rooms from './modules/rooms/index';

const store = createStore({
    modules: { authentication, buildings, general, users, reservations, rooms }
});

export default store;
