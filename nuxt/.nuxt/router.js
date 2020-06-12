import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

<<<<<<< HEAD
const _4a727d6d = () => interopDefault(import('../pages/details.vue' /* webpackChunkName: "pages/details" */))
const _1bcc5058 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _a173d16a = () => interopDefault(import('../pages/new.vue' /* webpackChunkName: "pages/new" */))
const _05f46242 = () => interopDefault(import('../pages/pending.vue' /* webpackChunkName: "pages/pending" */))
const _4bb44088 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _287234bd = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
=======
const _8738ed54 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _181b7d66 = () => interopDefault(import('../pages/new.vue' /* webpackChunkName: "pages/new" */))
const _6497bb44 = () => interopDefault(import('../pages/pending.vue' /* webpackChunkName: "pages/pending" */))
const _7d07f074 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _1a883382 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
>>>>>>> server_authentication

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
    path: "/details",
    component: _4a727d6d,
    name: "details"
  }, {
    path: "/login",
    component: _8738ed54,
    name: "login"
  }, {
    path: "/new",
    component: _181b7d66,
    name: "new"
  }, {
    path: "/pending",
    component: _6497bb44,
    name: "pending"
  }, {
    path: "/register",
    component: _7d07f074,
    name: "register"
  }, {
    path: "/",
    component: _1a883382,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
