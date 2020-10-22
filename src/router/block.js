// 区块链
const block = () => import(/* webpackChunkName: "block" */ '@/pages/block/block-message/index.vue')
const blockDetail = () => import(/* webpackChunkName: "block" */ '@/pages/block/block-message/detail.vue')
const deal = () => import(/* webpackChunkName: "block" */ '@/pages/block/deal-message/index.vue')
const dealDetail = () => import(/* webpackChunkName: "block" */ '@/pages/block/deal-message/detail.vue')
const account = () => import(/* webpackChunkName: "block" */ '@/pages/block/account-message/index.vue')

export default [
  {
    path: '/block',
    component: block,
    meta: { title: '区块信息' }
  },
  {
    path: '/blockDetail/:hash',
    component: blockDetail,
    meta: { title: '区块信息详情' }
  },
  {
    path: '/deal',
    component: deal,
    meta: { title: '交易信息' }
  },
  {
    path: '/dealDetail/:hash',
    component: dealDetail,
    meta: { title: '交易信息详情' }
  },
  {
    path: '/account/:hash',
    component: account,
    meta: { title: '账户信息' }
  }
]
