import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const Paper = resolve => require.ensure(['./routes/Paper'], (require) => {
//   resolve(require('./routes/Paper'))
// })

const routes = [
  // { path: '/paper', component: Paper },
]

const router = new VueRouter({ mode: 'hash', routes })

export default router
