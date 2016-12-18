import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const Paper = resolve => require.ensure(['./routes/Paper'], (require) => {
//   resolve(require('./routes/Paper'))
// })

const routes = [
  { path: '/', component: require('./pages/Index') },
  { path: '/sign', component: require('./pages/Sign') },
  { path: '/blog', component: require('./pages/Blog') },
  { path: '/blog/new', component: require('./pages/BlogNew') },
  { path: '/blog/:blogId', component: require('./pages/BlogView') },
]

routes.push({ path: '*', component: require('./pages/NotFound') })

const router = new VueRouter({ mode: 'hash', routes })

export default router
