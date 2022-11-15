<template>
  <div>
    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#062e2d" text-color="#fff" active-text-color="#ffd04b">
      <h3>{{ isCollapse ? '后台' : '后台管理系统' }}</h3>
      <el-menu-item @click="changeMenu(item)" v-for="item in nochilder" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu v-for="item in childer" :key="item.label" :index="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item @click="changeMenu(res)" v-for="res in item.children" :key="res.name" :index="res.name">
            <i :class="`el-icon-${res.icon}`"></i>
            <span slot="title">{{ res.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'Aside',
  data() {
    return {
      menu: []
    }
  },
  methods: {
    changeMenu(res) {
      if (res.path !== this.$route.path) {
        this.$router.push(res.path)
      }
    }
  },

  computed: {
    nochilder() {
      return this.menu.filter(item => !item.children)
    },
    childer() {
      return this.menu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.isCollapse
    }
  },
  mounted() {
    this.menu = Cookie.get('menu') ? JSON.parse(Cookie.get('menu')) : this.$store.state.menu
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 960px;
  border: 0;
  h3 {
    margin: 0;
    padding: 0;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: white;
  }
}
</style>
