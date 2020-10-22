<template>
  <div>
    <div class="titleTop">
      <el-popover placement="bottom" title="安卓下载版" width="280" trigger="click">
        <img src="../../assets/img/android.png" />
        <el-button type="text" slot="reference" style="color:#fff">区块链彩票APP下载</el-button>
      </el-popover>
    </div>
    <div class="Nav">
      <h1 class="titleH1">
        <router-link :to="{path:'/index'}" style="color:#0022A9">
          <img src="../../assets/img/logo.png" />彩票区块链交易系统
        </router-link>
      </h1>
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        text-color="#8E9AB5"
        active-text-color="#213654"
        class="titleMenu"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">开奖溯源</el-menu-item>
        <el-menu-item index="3">彩票溯源</el-menu-item>
        <el-submenu index="4">
          <template slot="title">区块链</template>
          <el-menu-item index="4-1">区块信息</el-menu-item>
          <el-menu-item index="4-2">交易信息</el-menu-item>
          <!-- <el-menu-item index="4-3">账户信息</el-menu-item> -->
        </el-submenu>
        <!-- <el-menu-item index="5" disabled>数据导出</el-menu-item> -->
      </el-menu>
    </div>
    <div class="rot" v-if="flaOne.name !== '首页'">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: flaOne.path }">{{flaOne.name}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="parTwo">{{parTwo}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  components: {},
  data() {
    return {
      activeIndex: '1',
      flaOne: {
        name: '',
        path: ''
      },
      parTwo: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleSelect(key) {
      this.activeIndex = key
      switch (key) {
        case '1':
          this.$router.push('/index')
          break
        case '2':
          this.$router.push('/lottery')
          break
        case '3':
          this.$router.push('/welfare')
          break
        case '4-1':
          this.$router.push('/block')
          break
        case '4-2':
          this.$router.push('/deal')
          break
        // case "4-3":
        //   this.$router.push("/account");
        //   break;
        // case "5":
        //   this.$router.push("/export");
        //   break;
        default:
          this.$router.push('/index')
          break
      }
    }
  },
  computed: {},
  watch: {
    $route(to) {
      switch (to.matched[0].path) {
        case '/index':
          this.activeIndex = '1'
          this.flaOne.name = to.meta.title
          this.flaOne.path = to.path
          this.parTwo = ''
          break
        case '/lottery':
          this.activeIndex = '2'
          this.flaOne.name = to.meta.title
          this.flaOne.path = to.path
          this.parTwo = ''
          break
        case '/welfare':
          this.activeIndex = '3'
          this.flaOne.name = to.meta.title
          this.flaOne.path = to.path
          this.parTwo = ''
          break
        case '/block':
          this.activeIndex = '4-1'
          this.flaOne.name = to.meta.title
          this.flaOne.path = to.path
          this.parTwo = ''
          break
        case '/deal':
          this.activeIndex = '4-2'
          this.flaOne.name = to.meta.title
          this.flaOne.path = to.path
          this.parTwo = ''
          break
        case '/account/:hash':
          this.activeIndex = '4'
          this.parTwo = to.meta.title
          break
        case '/lotteryDetail/:id/:issue':
          this.activeIndex = '2'
          this.parTwo = to.meta.title
          break
        case '/blockDetail/:hash':
          this.activeIndex = '4-1'
          this.parTwo = to.meta.title
          break
        case '/dealDetail/:hash':
          this.activeIndex = '4-2'
          this.parTwo = to.meta.title
          break
        case '/welfareDetail/:hash':
          this.activeIndex = '3'
          this.parTwo = to.meta.title
          break
        default:
          this.activeIndex = '1'
          this.flaOne.name = '首页'
          this.flaOne.path = '/'
          this.parTwo = ''
          break
      }
    }
  }
}
</script>

