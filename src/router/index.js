import Vue from 'vue'
import VueRouter from 'vue-router'

// 安装vue-router插件
Vue.use(VueRouter)

// 懒加载
const Home = () => import('views/home/Home')
const Detail = () => import('views/detail/Detail')
const Manage = () => import('views/manage/Manage')
const Delete = () => import('views/delete/Delete')
const More = () => import('views/more/More')
const AddCity = () => import('views/addCity/AddCity')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/manage',
    component: Manage
  },
  {
    path: '/delete',
    component: Delete
  },
  {
    path: '/more',
    component: More
  },
  {
    path: '/add_city',
    component: AddCity
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router