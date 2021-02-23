import { createStore } from 'vuex';

import authentication from './modules/authentication/index.js';

const store = createStore({
    modules: { authentication }
});

export default store;
