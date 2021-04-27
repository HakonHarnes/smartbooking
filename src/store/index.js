import { createStore } from 'vuex';
import { useToast } from 'vue-toastification';
const toast = useToast();

import authentication from './modules/authentication/index';
import buildings from './modules/buildings/index';
import general from './modules/general/index';
import policies from './modules/policies/index';
import reservations from './modules/reservations/index';
import rooms from './modules/rooms/index';
import users from './modules/users/index';

const store = createStore({
    modules: { authentication, buildings, general, policies, users, reservations, rooms },
    getters: {
        toast() {
            return toast;
        }
    }
});

export default store;
