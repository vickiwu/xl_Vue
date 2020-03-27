/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'abnormal-tracking-company-list',
      component: () => import('@/views/table/abnormal-tracking-company-list/index'),
      name: 'AbnormalTrackingCompanyList',
      meta: { title: '异常企业统计' }
      // hidden: true
    },
    {
      path: 'business-list/:orgId?/:indId?',
      component: () => import('@/views/table/business-list/index'),
      name: 'BusinessList',
      meta: { title: '企业列表' }
      // hidden: true
    },
    {
      path: 'company-info/:id',
      component: () => import('@/views/table/company-info/index'),
      name: 'CompanyInfo',
      meta: { title: '企业详情' }
      // hidden: true
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: 'Complex Table' }
    }
  ]
}
export default tableRouter
