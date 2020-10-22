// 首页
const homePage = () => import(/* webpackChunkName: "HomePage" */ '@/pages/home/index.vue')

export default [
  {
    path: '*',
    redirect: '/index'
  },
  {
    path: '/index',
    component: homePage,
    meta: { title: '首页', keepAlive: true }
  }
]
