<template>
  <div class="page1">
    <el-card style="width: 1280px; height: 860px">
      <div ref="chart" style="width: 1280px; height: 860px"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getPage1 } from '../api'

export default {
  name: 'page1',
  methods: {
    getchart() {
      getPage1().then(() => {
        const myChart = echarts.init(this.$refs.chart)
        const data = []
        for (let i = 0; i < 6; ++i) {
          data.push(Math.round(Math.random() * 200))
        }
        const option = {
          title: {
            text: '实时销售量',
            left: 'left'
          },
          xAxis: {
            max: 'dataMax'
          },
          yAxis: {
            type: 'category',
            data: ['苹果', '华为', '三星', 'vivo', 'oppo', '小米'],
            inverse: true,
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 5 // only the largest 3 bars will be displayed
          },
          series: [
            {
              realtimeSort: true,
              name: '销售总量',
              type: 'bar',
              data: data,
              label: {
                show: true,
                position: 'right',
                valueAnimation: true
              }
            }
          ],
          legend: {
            show: true
          },
          animationDuration: 0,
          animationDurationUpdate: 3000,
          animationEasing: 'linear',
          animationEasingUpdate: 'linear'
        }
        function run() {
          for (var i = 0; i < data.length; ++i) {
            if (Math.random() > 0.9) {
              data[i] += Math.round(Math.random() * 500)
            } else {
              data[i] += Math.round(Math.random() * 100)
            }
          }
          myChart.setOption({
            series: [
              {
                type: 'bar',
                data
              }
            ]
          })
        }
        setTimeout(function () {
          run()
        }, 0)
        setInterval(function () {
          run()
        }, 3000)
        myChart.setOption(option)
      })
    }
  },
  mounted() {
    this.getchart()
  }
}
</script>

<style lang="less" scoped>
.page1 {
  width: 100%;
  height: 100%;
}
</style>
