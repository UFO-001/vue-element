import { number } from 'echarts'
import Mock from 'mockjs'

export default {
  getData: () => {
    const a = Mock.mock({
      'order|10': [
        {
          name: function () {
            return Mock.mock('@cname')
          },
          'brand|1': ['iPhone', 'vivo', 'oppo', '小米', '华为', '三星'],
          address: function () {
            return Mock.mock('@county(true)')
          }
        }
      ]
    })
    return {
      topList: [
        {
          id: Mock.mock('@id'),
          name: '活跃人数',
          icon: 'user-solid',
          percentage: Mock.mock('@integer(20, 90)'),
          number: Mock.mock('@float(5000, 15000, 0, 0)'),
          backgroundColor: 'rgb(224, 178, 122)'
        },
        {
          id: Mock.mock('@id'),
          name: '今日订单',
          icon: 's-claim',
          percentage: Mock.mock('@integer(20, 90)'),
          number: Mock.mock('@float(10000, 50000, 0, 0)'),
          backgroundColor: 'rgb(194, 228, 140)'
        },
        {
          id: Mock.mock('@id'),
          name: '未发货数',
          icon: 's-goods',
          percentage: Mock.mock('@integer(20, 90)'),
          number: Mock.mock('@float(10000, 50000, 0, 0)'),
          backgroundColor: 'rgb(142, 196, 244)'
        },
        {
          id: Mock.mock('@id'),
          name: '销售总额',
          icon: 's-marketing',
          percentage: Mock.mock('@integer(20, 90)'),
          number: Mock.mock('@float(300000, 800000, 0, 0)'),
          backgroundColor: 'rgb(238, 124, 157)'
        }
      ],
      StackedLine: [
        Mock.mock({
          name: 'iPhone',
          type: 'line',
          'data|7': [
            function () {
              return Mock.mock('@float(1000, 8000, 0, 0)')
            }
          ]
        }),
        Mock.mock({
          name: 'oppo',
          type: 'line',
          'data|7': [
            function () {
              return Mock.mock('@float(1000, 8000, 0, 0)')
            }
          ]
        }),
        Mock.mock({
          name: 'vivo',
          type: 'line',
          'data|7': [
            function () {
              return Mock.mock('@float(1000, 8000, 0, 0)')
            }
          ]
        }),
        Mock.mock({
          name: '小米',
          type: 'line',
          'data|7': [
            function () {
              return Mock.mock('@float(1000, 8000, 0, 0)')
            }
          ]
        }),
        Mock.mock({
          name: '华为',
          type: 'line',
          'data|7': [
            function () {
              return Mock.mock('@float(1000, 8000, 0, 0)')
            }
          ]
        }),
        Mock.mock({
          name: '三星',
          type: 'line',
          'data|7': [
            function () {
              return Mock.mock('@float(1000, 8000, 0, 0)')
            }
          ]
        })
      ],
      barChartData: [
        {
          value: Mock.mock('@float(30, 50, 0, 0)'),
          name: 'iPhone'
        },
        {
          value: Mock.mock('@float(20, 30, 0, 0)'),
          name: 'oppo'
        },
        {
          value: Mock.mock('@float(10, 20, 0, 0)'),
          name: 'vivo'
        },
        {
          value: Mock.mock('@float(20, 30, 0, 0)'),
          name: '小米'
        },
        {
          value: Mock.mock('@float(10, 20, 0, 0)'),
          name: '三星'
        },
        {
          value: Mock.mock('@float(20, 30, 0, 0)'),
          name: '华为'
        }
      ],
      orderData: a,
      code: 200,
      message: '成功'
    }
  }
}
