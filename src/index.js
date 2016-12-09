import Vue from 'vue'
import VueRouter from 'vue-router'
import 'normalize.css'
import App from './components/App'
import store from './store'

Vue.use(VueRouter)

store.dispatch('getUser')

new Vue({
  store,
  el: '#app',
  render: h => h(App),
})
