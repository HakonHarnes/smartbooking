import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './store/index.js';

import BaseButton from './components/ui/BaseButton.vue';
import BaseIcon from './components/ui/BaseIcon.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-button', BaseButton);
app.component('base-icon', BaseIcon);

app.mount('#app');
