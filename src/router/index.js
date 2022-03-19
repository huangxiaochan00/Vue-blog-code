import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Edit from '@/views/Edit'
import Detail from '@/views/Detail'
import Login from '@/views/Login'
import Personal from '@/views/Personal'
import Register from '@/views/Register'
import User from '@/views/User'
import Create from '@/views/Create'
import auth from '../api/auth'
Vue.use(Router)
import store from '../store'
// window.store = store
// console.log(store);
const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/detail/:blogId',
      component: Detail
    },
    {
      path: '/edit/:blogId',
      component: Edit,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/personal',
      component: Personal,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/user/:userId',
      component: User,
    },
    {
      path: '/create',
      component: Create,
      meta: { requiresAuth: true }
    }
  ]
})

// router.beforeEach((to, from) => {
//   // 而不是去检查每条路由记录
//   // to.matched.some(record => record.meta.requiresAuth)
//   if (!store.getters.isLogin) {
//     console.log('ddd');
//     // 此路由需要授权，请检查是否已登录
//     // 如果没有，则重定向到登录页面
//     return {
//       path: '/login',
//       // 保存我们所在的位置，以便以后再来
//       query: { redirect: to.fullPath },
//     }
//   }
// })
router.beforeEach((to, from, next) => {
  if (to.matched.some(item => {
    item.meta.requiresAuth
  })) {
    store.dispatch('checkLogin').then(isLogin => {
      console.log(isLogin);
      if (!isLogin) {
        console.log('dddddd');
        next(
          {
            path: '/login',
            // 保存我们所在的位置，以便以后再来
            query: { redirect: to.fullPath },
          }
        )
      } else {
        next()
      }
    })
  } else
    next()
})

export default router