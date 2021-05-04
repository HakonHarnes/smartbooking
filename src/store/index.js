import { createStore } from 'vuex';
import { useToast } from 'vue-toastification';
const toast = useToast();

import buildings from './modules/buildings/index';
import general from './modules/general/index';
import policies from './modules/policies/index';
import reservations from './modules/reservations/index';
import rooms from './modules/rooms/index';
import users from './modules/users/index';
import auth from './modules/auth/index';

const store = createStore({
    modules: { auth, buildings, general, policies, users, reservations, rooms },
    getters: {
        toast() {
            toast.clear();
            return toast;
        }
    }
});

export default store;
