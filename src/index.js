import Vue from 'vue'
import App from './App'
import router from './router'
import filters from './filters'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
