import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './store/index.js';

import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseIcon from './components/ui/BaseIcon.vue';
import BaseListItem from './components/ui/BaseListItem.vue';
import BaseListDescription from './components/ui/BaseListDescription.vue';
import BaseSearch from './components/ui/BaseSearch.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-icon', BaseIcon);
app.component('base-list-item', BaseListItem);
app.component('base-list-description', BaseListDescription);
app.component('base-search', BaseSearch);

app.mount('#app');
