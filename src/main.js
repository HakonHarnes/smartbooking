import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './store/index.js';
import userService from './services/UserService';

import BaseActiveAttribute from './components/ui/BaseActiveAttribute.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseIcon from './components/ui/BaseIcon.vue';
import BaseListDescription from './components/ui/BaseListDescription.vue';
import BaseModal from './components/ui/BaseModal.vue';
import BaseSearch from './components/ui/BaseSearch.vue';
import Switches from 'vue-switches';

// Initializes the app
const initalize = async () => {
    const app = createApp(App);
    app.use(store);

    const response = await userService.getLoggedInUser();
    if (response.data) {
        store.dispatch('login', { role: response.data.user.role });
    }

    app.use(router);
    app.component('base-active-attribute', BaseActiveAttribute);
    app.component('base-button', BaseButton);
    app.component('base-card', BaseCard);
    app.component('base-icon', BaseIcon);
    app.component('base-list-description', BaseListDescription);
    app.component('base-modal', BaseModal);
    app.component('base-search', BaseSearch);
    app.component('switches', Switches);
    app.mount('#app');
};

initalize();
