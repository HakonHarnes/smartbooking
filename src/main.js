import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './store/index.js';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import BaseActiveAttribute from './components/ui/BaseActiveAttribute.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseIcon from './components/ui/BaseIcon.vue';
import BaseListDescription from './components/ui/BaseListDescription.vue';
import BaseLoading from './components/ui/BaseLoading.vue';
import BaseModal from './components/ui/BaseModal.vue';
import BaseSearch from './components/ui/BaseSearch.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseTimepicker from './components/ui/BaseTimepicker.vue';
import Switches from 'vue-switches';

(async () => {
    const app = createApp(App);

    app.use(Toast, {
        timeout: 5000,
        position: POSITION.TOP_CENTER,
        hideProgressBar: true
    });

    app.use(store);

    // Refreshes the access token
    await store.dispatch('auth/refresh');

    app.use(router);
    app.component('base-active-attribute', BaseActiveAttribute);
    app.component('base-button', BaseButton);
    app.component('base-card', BaseCard);
    app.component('base-icon', BaseIcon);
    app.component('base-list-description', BaseListDescription);
    app.component('base-loading', BaseLoading);
    app.component('base-modal', BaseModal);
    app.component('base-search', BaseSearch);
    app.component('base-spinner', BaseSpinner);
    app.component('base-timepicker', BaseTimepicker);
    app.component('switches', Switches);
    app.mount('#app');
})();
