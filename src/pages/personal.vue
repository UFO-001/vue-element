<template>
  <div class="personal">
    <div class="personal-l">
      <div class="top">
        <el-card>
          <div class="top-t">
            <img src="../assets/logo.png" alt="" />
            <div class="top-t-r">
              <h2>管理员</h2>
              <span>{{ name }}</span>
            </div>
          </div>
          <div class="top-b">
            <h3>
              登录时间：<span>{{ date }}</span>
            </h3>
            <h3>
              登录地点：<span>{{ address }}</span>
            </h3>
          </div>
        </el-card>
      </div>
      <div class="bottom">
        <el-card style="width: 100%; height: 100%">
          <div>Vue:<el-progress :text-inside="true" :stroke-width="26" :percentage="53"></el-progress></div>
          <div>JavaScript:<el-progress :text-inside="true" :stroke-width="26" :percentage="33" status="success"></el-progress></div>
          <div>Html:<el-progress :text-inside="true" :stroke-width="26" :percentage="6" status="warning"></el-progress></div>
          <div>Css:<el-progress :text-inside="true" :stroke-width="26" :percentage="8" status="exception"></el-progress></div>
        </el-card>
      </div>
    </div>
    <div class="personal-r">
      <el-card style="width: 100%; height: 100%">
        <h3 class="one">留言信息</h3>
        <div class="active">
          <el-card v-for="item in testList" :key="item.id" style="margin-top: 30px">
            <div class="test">
              <img :src="item.picture" alt="" />
              <div class="test-r">
                <h3>{{ item.name }}</h3>
                <span>{{ item.text }}</span>
              </div>
            </div>
          </el-card>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Mock from 'mockjs'
import { getPersonal } from '../api'
export default {
  name: 'personal',
  data() {
    return {
      date: '',
      name: '',
      address: '',
      testList: []
    }
  },
  mounted() {
    let time = new Date()
    this.date = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
    this.name = Mock.mock('@cname()')
    this.address = Mock.mock('@city(true)')
    getPersonal().then(({ data }) => {
      this.testList = data.list
      console.log(this.testList, ' this.testList')
    })
  }
}
</script>

<style lang="less" scoped>
.personal {
  display: flex;
  justify-content: space-between;

  .personal-l {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 400px;
    .top {
      width: 400px;
      .top-t {
        display: flex;
        justify-content: space-around;
        width: 400px;
        img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
        }
        .top-t-r {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 20px;
          margin-top: 20px;
          span {
            font-size: 18px;
          }
        }
      }
      .top-b {
        h3 {
          font-size: 25px;
          span {
            font-size: 18px;
            margin-left: 10px;
          }
        }
      }
    }
    .bottom {
      margin-top: 20px;
      width: 400px;
      height: 500px;
      div {
        &:nth-child(-n + 4) {
          margin-top: 20px;
        }
      }
    }
  }
  .personal-r {
    width: 800px;
    .one {
      text-align: center;
    }
    .active {
      height: 50px;

      .test {
        display: flex;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
        }
        .test-r {
          display: flex;
          flex-direction: column;
          margin-left: 30px;
        }
      }
    }
  }
}
</style>
