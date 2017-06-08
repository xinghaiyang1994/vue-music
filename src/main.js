// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//css
import './assets/css/base.css';
import './assets/css/main.css';

//js
import './assets/js/rem.js';

import Vue from 'vue';
import App from './App';
import router from './router';


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
