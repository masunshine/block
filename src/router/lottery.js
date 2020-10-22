// 开奖溯源
const lottery = () => import(/* webpackChunkName: "lottery" */ '@/pages/lottery/index.vue')
const lotteryDetail = () => import(/* webpackChunkName: "lottery" */ '@/pages/lottery/detail.vue')

export default [
  {
    path: '/lottery',
    component: lottery,
    meta: { title: '开奖溯源' }
  },
  {
    path: '/lotteryDetail/:id/:issue',
    component: lotteryDetail,
    meta: { title: '开奖溯源详情' }
  }
]
