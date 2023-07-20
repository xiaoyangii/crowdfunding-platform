<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <Header></Header>

    <!-- 页面主体区域 -->
    <div class="home-main-box">
      <!-- 左侧边栏 -->
      <Aside></Aside>
      <!-- 右侧内容主体区域 -->
      <div class="home-main-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// 头部区域组件
import Header from './subcomponents/Header.vue'
// 左侧边栏组件
import Aside from './subcomponents/Aside.vue'

export default {
  name: 'Home',
  // 注册组件
  components: {
    Header,
    Aside,
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .home-main-box {
    height: 100%;
    display: flex;
    .home-main-body {
      padding: 15px;
      flex: 1;
    }
  }
}
</style>
