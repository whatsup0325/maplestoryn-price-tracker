import Layout from '../components/Layout.vue'
const Home = () => import('../components/Home.vue')

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      // 之後可在這裡加更多子路由
    ],
  },
] 