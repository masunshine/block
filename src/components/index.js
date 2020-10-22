import { version } from 'element-ui'

import Titleplus from './title/index'
import Inputs from './input/index'
import Card from './card/index'
import copyBottom from './copy/index'
import lotImg from './lotteryImg/index'
import searchTips from './searchTips/index'

const components = [
  Titleplus,
  Inputs,
  Card,
  copyBottom,
  lotImg,
  searchTips
]

const install = function (Vue) {
  window.$version = {
    vue: Vue.version,
    ele: version
  }
  components.filter(v => typeof v !== 'function').forEach(v => Vue.component(v.name, v))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
