/* eslint-disable global-require */
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import { Icon } from 'leaflet';
import App from './App.vue';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'leaflet/dist/leaflet.css';

// Fix leaflet marker icon missing
// eslint-disable-next-line no-underscore-dangle
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
