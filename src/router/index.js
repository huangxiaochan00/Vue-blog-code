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

router.beforeEach((to, from, next) => {
  if (to.matched.some(item => {
    item.meta.requiresAuth
  })) {
    store.dispatch('checkLogin').then(isLogin => {
      if (!isLogin) {
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