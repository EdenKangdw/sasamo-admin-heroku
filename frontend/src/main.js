// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuesax from 'vuesax'
import axios from 'axios'

import 'vuesax/dist/vuesax.css'
import './assets/scss/style.scss'
import 'material-icons/iconfont/material-icons.css';

// Vuex Store
import store from './store/store'

// Theme Configurations
import 'prismjs'
import 'prismjs/themes/prism.css'
import VsPrism from './components/prism/VsPrism.vue';
Vue.component(VsPrism.name, VsPrism);

// Vue Router
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(Vuesax) 
Vue.prototype.$http = axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
