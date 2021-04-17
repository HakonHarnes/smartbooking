import { createStore } from 'vuex';
import { useToast } from 'vue-toastification';
const toast = useToast();

import authentication from './modules/authentication/index';
import users from './modules/users/index';
import rooms from './modules/rooms/index';

const store = createStore({
    modules: { authentication, users, rooms },
    getters: {
        toast() {
            return toast;
        }
    }
});

export default store;
