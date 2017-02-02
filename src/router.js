import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const BlogNew = resolve => require.ensure(['./pages/BlogNew'], (require) => {
//   resolve(require('./pages/BlogNew'))
// })
// const BlogEdit = resolve => require.ensure(['./pages/BlogEdit'], (require) => {
//   resolve(require('./pages/BlogEdit'))
// })

const routes = [
  { path: '/', component: require('./pages/Index') },
  { path: '/sign', component: require('./pages/Sign') },
  { path: '/blog', component: require('./pages/Blog') },
  { path: '/blog/new', component: require('./pages/BlogNew') },
  { path: '/blog/:blogId', component: require('./pages/BlogView') },
  { path: '/blog/:blogId/edit', component: require('./pages/BlogEdit') },
]

routes.push({ path: '*', component: require('./pages/NotFound') })

const router = new VueRouter({ mode: 'hash', routes })

export default router
