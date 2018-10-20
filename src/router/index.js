import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import index from '@/view/index'
import adminList from '@/view/Dredordlist'
import AthList from '@/view/AthleteList'
import AddAthletelist from '@/components/AddAthletelist'
import Competitionlist from'@/view/Competitionlist'
import projectList from '@/components/projectList'
import scoreList from '@/components/scoreList'
import trainingList from '@/view/trainingList'
import test from '@/test/test'
import playerform from '@/view/Athlete/playerFormation'
import errors from '@/view/errorPage/errors'
// import errorfou from '@view/errorPage/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/errors',
      name:'errors',
      component:errors
    },
    //测试
    {
      path:'/test',
      name:'test',
      component:test
    },
    //登陆
    {
      path: '/login',
      name: 'login',
      component: login
    },
    //运动员界面
    {
      path:'/playerform',
      name:'playerform',
      component:playerform
    },
    //主页面
    {
      path: '/adminUser',
      name: 'admin',
      component: index,
      children: [
        {
          //运动员列表页
          path: 'list2',
          name: 'admin-list-2',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: AthList,
        },
        {
          path: 'list',
          name: 'admin-list',
          meta:{
            requireAuth: true
          },
          component: adminList
        },
        {
          path:'clist',
          name:'Competition',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component:Competitionlist
        },
        {
          path:'plist',
          name:'projectList',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component:projectList
        },
        {
          path:'slsit',
          name:'scoreList',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component:scoreList
        },
        {
          path:'tlist',
          name:'trainingList',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component:trainingList
        },
        {
          path: '/AddAthletelist',
          name: 'addath',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: AddAthletelist

        },
        {
          path: '/',
          redirect: 'list2'
        }
      ]
    },
    {
      path: '/',
      redirect: login
    }
  ]
})
