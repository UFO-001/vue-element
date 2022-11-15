<template>
  <div>这是tow组件</div>
</template>

<script>
import { getPage2 } from '../api'
export default {
  name: 'page2',
  mounted() {
    getPage2().then(() => {})
  }
}
</script>

<style></style>
