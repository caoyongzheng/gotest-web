import Vue from 'vue'
import 'normalize.css'
import './index.css'
import router from './router'
import App from './App'
import store from './store'

store.dispatch('login')

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
})
