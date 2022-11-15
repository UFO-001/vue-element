import Vue from 'vue'
import Vuex from 'vuex'

import Cookie from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    menu: []
  },
  mutations: {
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    changeMenu(state, res) {
      state.menu = res
      Cookie.set('menu', JSON.stringify(res))
    },
    addMenu(state, router) {
      if (!Cookie.get('menu')) return
      const menus = JSON.parse(Cookie.get('menu'))

      const personal = JSON.parse(Cookie.get('personal'))
      const menuRouter = []
      menus.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`../pages/${item.url}`)
            return item
          })
          menuRouter.push(...item.children)
        } else {
          item.component = () => import(`../pages/${item.url}`)
          menuRouter.push(item)
          console.log(menuRouter)
        }
      })
      personal.component = () => import(`../pages/${personal.url}`)
      router.addRoute('main', personal)
      menuRouter.forEach(item => {
        router.addRoute('main', item)
      })
    }
  }
})
