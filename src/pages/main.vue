<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '../components/Aside.vue'
import Header from '@/components/Header.vue'
export default {
  name: 'myMain',
  components: { Aside, Header }
}
</script>

<style lang="less" scoped>
html,
body,
h3 {
  margin: 0;
  padding: 0;
}
.el-header {
  padding: 0;
}
</style>
