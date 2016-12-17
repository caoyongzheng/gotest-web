import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const Paper = resolve => require.ensure(['./routes/Paper'], (require) => {
//   resolve(require('./routes/Paper'))
// })

const routes = [
  { path: '/', component: require('./pages/Index') },
  { path: '/sign', component: require('./pages/Sign') },
]

const router = new VueRouter({ mode: 'hash', routes })

export default router
