import { createStore } from 'vuex';

import authentication from './modules/authentication/index';
import users from './modules/users/index';

const store = createStore({
    modules: { authentication, users }
});

export default store;
