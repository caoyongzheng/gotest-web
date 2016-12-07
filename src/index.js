import Vue from 'vue'
import VueRouter from 'vue-router'
import 'normalize.css'
import app from './app'

Vue.use(VueRouter)

new Vue(app).$mount('#app')
