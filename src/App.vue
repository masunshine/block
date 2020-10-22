<template>
  <div id="app">
    <div class="main_layout">
      <Title></Title>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <copyBottom></copyBottom>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
#app {
  position: relative;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .main_layout {
    position: relative;
    min-height: calc(100% - 70px);
  }
}
</style>
