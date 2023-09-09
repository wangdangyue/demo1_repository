import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Home from '@/views/layout/home.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import Category from '@/views/layout/category.vue'

import store from '@/store'

const Login = () => import('@/views/login')
const Myorder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay')
const Prodetail = () => import('@/views/prodetail')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '/home', component: Home },
        { path: '/cart', component: Cart },
        { path: '/user', component: User },
        { path: '/category', component: Category }
      ],
      redirect: '/home'
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: Myorder },
    { path: '/pay', component: Pay },
    // 动态路由传参，通过id查询商品
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }

  ]
})

// 全局导航守卫
// 所有的路由在真正被访问到之前都会先经过全局前置守卫
// to :到哪儿去
// from :从那里来
// next() 直接放行
// next(路径) 拦截到next里面的路径去

// 定义数组存放需要拦截的页面
const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    // 非权限页面直接放行
    next()
    window.scrollTo(0, 0)
    return
  }
  // 是权限页面，需要判断token
  const token = store.getters.token
  if (token) {
    next()
    window.scrollTo(0, 0)
  } else {
    next('/login')
  }
})

export default router
