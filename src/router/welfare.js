// 彩票溯源
const welfare = () => import(/* webpackChunkName: "welfare" */ '@/pages/welfare/index.vue')
const welfareDetail = () => import(/* webpackChunkName: "welfare" */ '@/pages/welfare/detail.vue')

export default [
  {
    path: '/welfare',
    component: welfare,
    meta: { title: '彩票溯源' }
  },
  {
    path: '/welfareDetail/:hash',
    component: welfareDetail,
    meta: { title: '彩票溯源详情' }
  }
]
