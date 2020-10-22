// 数据导出
const dataexports = () => import(/* webpackChunkName: "dataExport" */ '@/pages/dataExport/index.vue')

export default [
  {
    path: '/export',
    component: dataexports,
    meta: { title: '数据导出' }
  }
]
