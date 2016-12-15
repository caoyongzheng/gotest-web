import Vue from 'vue'
import 'normalize.css'
import router from './router'
import App from './App'
import store from './store'

store.dispatch('getUser')

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
})
