import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ce7d72d4 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _29c362e6 = () => interopDefault(import('../pages/new.vue' /* webpackChunkName: "pages/new" */))
const _bf09aef8 = () => interopDefault(import('../pages/pending.vue' /* webpackChunkName: "pages/pending" */))
const _02064286 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _61ccb902 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _ce7d72d4,
    name: "login"
  }, {
    path: "/new",
    component: _29c362e6,
    name: "new"
  }, {
    path: "/pending",
    component: _bf09aef8,
    name: "pending"
  }, {
    path: "/register",
    component: _02064286,
    name: "register"
  }, {
    path: "/",
    component: _61ccb902,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
