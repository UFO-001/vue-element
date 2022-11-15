import Mock from 'mockjs'

export default {
  loginData: ({ body }) => {
    const { name, password } = JSON.parse(body)
    if (name == 'admin' && password == '123456') {
      return {
        data: {
          code: 200,
          menu: [
            {
              path: 'home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home.vue'
            },
            {
              path: 'mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'mall.vue'
            },
            {
              path: 'user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'user.vue'
            },
            {
              label: '销售',
              icon: 'location',
              children: [
                {
                  path: 'page1',
                  name: 'page1',
                  label: '实时销售量',
                  icon: 'setting',
                  url: 'page1.vue'
                },
                {
                  path: 'page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'page2.vue'
                }
              ]
            }
          ],
          personal: {
            path: 'personal',
            name: 'personal',
            url: 'personal.vue'
          },
          token: Mock.mock('@guid()'),
          message: '获取成功'
        }
      }
    } else if (name == 'admin' && password != '123456') {
      return {
        data: {
          code: 401,
          message: '401 验证错误'
        }
      }
    } else {
      return {
        data: {
          code: 200,
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home.vue'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'mall.vue'
            },
            {
              path: 'personal',
              name: 'personal',
              url: 'personal.vue'
            }
          ],
          personal: {
            path: 'personal',
            name: 'personal',
            url: 'personal.vue'
          },
          token: Mock.mock('@guid()'),
          message: '获取成功'
        }
      }
    }
  }
}
