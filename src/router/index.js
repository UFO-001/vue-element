import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/home.vue'
import Main from '../pages/main.vue'
import Mall from '../pages/mall.vue'
import User from '../pages/user.vue'
import Page1 from '../pages/page1.vue'
import Page2 from '../pages/page2.vue'
import Login from '../pages/login.vue'
import Personal from '../pages/personal.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Main,
      name: 'main',
      redirect: '/home',
      children: [
        // { path: 'home', name: 'home', component: Home },
        // { path: 'mall', component: Mall },
        // { path: 'user', component: User },
        // { path: 'page1', component: Page1 },
        // { path: 'page2', component: Page2 }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
