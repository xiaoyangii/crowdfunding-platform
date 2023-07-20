import Vue from 'vue'
import VueRouter from 'vue-router'
import pathArr from '@/router/pathArr.js'

//登录
import Login from '@/components/Login.vue'
//注册
import Register from '@/components/Register.vue'
import Admin from '@/components/Admin.vue'
import Home from '@/components/Home.vue'

import Users from '@/components/menus/MyUsers.vue'
import Rights from '@/components/menus/MyRights.vue'
import Content from '@/components/menus/MyContent.vue'
import Settings from '@/components/menus/MySettings.vue'
import UserDetail from '@/components/user/MyUserDetail.vue'
import UserDetails from '@/components/user/UserDetails.vue'

import Homepage from '@/components/menusUser/Homepage.vue'
import Raise from '@/components/menusUser/Raise.vue'
import AuditStatus from '@/components/menusUser/AuditStatus.vue'


Vue.use(VueRouter)

// 路由规则的数组
const defaultRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  // 登录的路由规则
  {
    path: '/login',
    component: Login 
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    component: Home,
    redirect: '/home/homepage',
    meta:{ title:'主页', roles: ['0'] },
    children: [
      { path: 'homepage', component: Homepage, meta:{ title:'主页内容', roles: ['0'] } },
      { path: 'raise', component: Raise, meta:{ title:'发起众筹', roles: ['0'] } },
      { path: 'auditstatus', component: AuditStatus, meta:{ title:'审核状态', roles: ['0'] } },
      { path: 'userdetails/:id', component: UserDetails, props: true, meta:{ title:'众筹详情', roles: ['1','0'] } },
    ]
  },
  {
    path: '/admin',
    component: Admin,
    redirect: '/admin/users',
    meta: { title:'管理员', role: ['1'] },
    children: [
      { path: 'users', component: Users, meta: { title:'用户', roles: ['1'] } },
      { path: 'rights', component: Rights, meta: { title:'权限', roles: ['1'] } },
      { path: 'content', component: Content, meta: { title:'内容', roles: ['1'] } },
      { path: 'settings', component: Settings, meta: { title:'设置', roles: ['1'] } },
      // 用户详情页的路由规则
      { path: 'userinfo/:id', component: UserDetails, props: true, meta: { title:'众筹详情', roles: ['1','0'] } }
    ]
  }
]

const addRoutes = [
]

// 创建路由实例对象 defaultRouter, addRouter
const router = new VueRouter({
  routes: defaultRoutes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (pathArr.indexOf(to.path) !== -1) {
    let tag = localStorage.getItem('tag')
    if (to.meta.roles.includes(tag)) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
export { defaultRoutes, addRoutes }
