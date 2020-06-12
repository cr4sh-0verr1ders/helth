import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1bcc5058 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _a173d16a = () => interopDefault(import('../pages/new.vue' /* webpackChunkName: "pages/new" */))
const _05f46242 = () => interopDefault(import('../pages/pending.vue' /* webpackChunkName: "pages/pending" */))
const _4bb44088 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _287234bd = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _1bcc5058,
    name: "login"
  }, {
    path: "/new",
    component: _a173d16a,
    name: "new"
  }, {
    path: "/pending",
    component: _05f46242,
    name: "pending"
  }, {
    path: "/register",
    component: _4bb44088,
    name: "register"
  }, {
    path: "/",
    component: _287234bd,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
