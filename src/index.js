import Vue from 'vue'
import 'normalize.css'
import './index.css'
import router from './router'
import App from './App'
import TopHeader from './components/TopHeader'
import store from './store'

store.dispatch('login')

Vue.component('top-header', TopHeader)

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
})
