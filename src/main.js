/* eslint-disable no-unused-vars */
import Vue from 'vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h()
}).$mount('#app');
