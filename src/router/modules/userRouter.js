import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/list',
  name: 'User',
  meta: {
    title: 'User',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/user/user-list/index'),
      name: 'userList',
      meta: { title: '用户列表' }
    }
  ]
}

export default userRouter
