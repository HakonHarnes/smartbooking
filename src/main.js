import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './store/index.js';
import userService from './services/UserService';

import BaseButton from './components/ui/BaseButton.vue';

// Initializes the app
const initalize = async () => {
    const app = createApp(App);
    app.use(store);

    const response = await userService.getLoggedInUser();
    if (response.data) {
        store.dispatch('login', { role: response.data.user.role });
    }

    app.use(router);
    app.component('base-button', BaseButton);
    app.mount('#app');
};

initalize();
