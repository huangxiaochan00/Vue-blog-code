import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Edit from '@/views/Edit'
import Detail from '@/views/Detail'
import Login from '@/views/Login'
import Personal from '@/views/Personal'
import Register from '@/views/Register'
import Index from '@/views/Index'
import User from '@/views/User'
import Create from '@/views/Create'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '/edit',
      component: Edit
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/personal',
      component: Personal
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/create',
      component: Create
    },
    {
      path: '/index',
      component: Index
    }
  ]
})
