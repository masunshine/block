import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { https } from '@/common/utils/http'
import ElementUI from 'element-ui'
import '@/assets/sass/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
import Components from './components/index'
import { Message, Loading } from '@/common/utils/element-ui'
import moment from 'moment'
import * as filters from '@/common/utils/filter'

Vue.use(ElementUI)
Vue.use(Components)

// 导入样式
// import '@/assets/sass/index.scss'
// 注册全局组件
// import Titleplus from './components/title/index'
// import Input from './components/input/index'
// import Card from './components/card/index'
// import copyBottom from './components/copy/index'
// import lotImg from './components/lotteryImg/index'
// Vue.component('Title', Titleplus)
// Vue.component('Inputs', Input)
// Vue.component('Card', Card)
// Vue.component('copyBottom', copyBottom)
// Vue.component('lotImg', lotImg)

Vue.config.productionTip = false

moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.prototype.$http = https
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading

Vue.prototype.$filter = Object.keys(filters).reduce((s, key) => {
  Vue.filter(key, filters[key])
  s[key] = filters[key]
  return s
}, {})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
