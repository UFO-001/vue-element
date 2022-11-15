<template>
  <div class="header">
    <div class="l-box">
      <el-button icon="el-icon-menu" size="mini" @click="handBut"></el-button>
    </div>
    <div class="r-box">
      <el-dropdown @command="handleCommand">
        <img src="../assets/logo.png" alt="" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="person">个人信息</el-dropdown-item>
          <el-dropdown-item command="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  methods: {
    handBut() {
      this.$store.commit('changeCollapse')
    },
    handleCommand(command) {
      if (command === 'out') {
        Cookie.remove('token')
        Cookie.remove('menu')
        Cookie.remove('personal')
        this.$router.push('/login')
      } else {
        if (this.$route.path != '/personal') {
          this.$router.push('/personal')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  background-color: #062e2d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .l-box {
    margin-left: 20px;
  }
  .r-box {
    margin-right: 20px;
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }
}
</style>
