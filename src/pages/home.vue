<template>
  <div class="home">
    <!-- 顶部数据 -->
    <div class="top">
      <el-card v-for="item in topList" :key="item.id" :body-style="`backgroundColor:${item.backgroundColor}`">
        <div class="box">
          <div class="l-box">
            <el-progress type="circle" :percentage="item.percentage" :color="colors"> </el-progress>
          </div>
          <div class="r-box">
            <h2>{{ item.name }}</h2>
            <span><i :class="`el-icon-${item.icon} icon`"></i>{{ item.number }}</span>
          </div>
        </div>
      </el-card>
    </div>

    <div class="middle">
      <el-card style="height: 300px; background-color: rgb(163, 210, 231)">
        <div ref="echart1" style="height: 300px">1</div>
      </el-card>
    </div>
    <div class="footer">
      <div class="l-footer">
        <el-card>
          <div ref="echart2" style="height: 300px">1</div>
        </el-card>
      </div>
      <div class="r-footer">
        <el-card>
          <h3>新增订单</h3>
          <div style="height: 280px">
            <el-table :data="Order" height="280" stripe style="width: 100%">
              <el-table-column prop="name" label="姓名"> </el-table-column>
              <el-table-column prop="brand" label="品牌"> </el-table-column>
              <el-table-column prop="address" label="收货地址"> </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from '../api'
import * as echarts from 'echarts'

export default {
  name: 'home',
  data() {
    return {
      // 顶部数据
      topList: [],
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      Order: []
    }
  },
  mounted() {
    getData().then(({ data }) => {
      const { topList, StackedLine, barChartData, orderData } = data
      this.topList = topList
      this.Order = orderData.order

      // 折线图
      const echart1 = echarts.init(this.$refs.echart1)
      const lineChart = {
        title: {
          text: '销售量',
          left: 'left'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['iPhone', 'oppo', 'vivo', '小米', '华为', '三星']
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: StackedLine
      }
      echart1.setOption(lineChart)

      // 柱状图
      const echart2 = echarts.init(this.$refs.echart2)
      const barChart = {
        title: {
          text: '销售份额',
          left: 'left'
        },
        legend: {
          top: 'bottom'
        },

        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [10, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: barChartData
          }
        ]
      }
      echart2.setOption(barChart)
    })
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin: 0;
}
.home {
  .top {
    display: flex;
    justify-content: space-around;

    .el-card {
      width: 280px;

      .box {
        display: flex;
        justify-content: space-between;
        .r-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          h3 {
            margin-bottom: 20px;
          }
          span {
            font-size: 20px;
            .icon {
              font-size: 40px;
            }
          }
        }
      }
    }
  }
  .l-aside {
    margin-top: 20px;
    width: 500px;
  }
  .middle {
    margin: 20px;
  }
  .footer {
    display: flex;
    justify-content: space-around;
    padding: 0 20px;
    .l-footer {
      width: 49%;
    }
    .r-footer {
      width: 49%;
      background-color: rgb(163, 210, 231);
    }
  }
}
</style>
