import { createStore } from 'vuex';

import authentication from './modules/authentication/index';
import users from './modules/users/index';
import rooms from './modules/rooms/index';

const store = createStore({
    modules: { authentication, users, rooms }
});

export default store;
