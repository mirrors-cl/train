import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import index from '@/view/index'
import adminList from '@/view/Dredordlist'
import AthList from '@/view/AthleteList'
import AddAthletelist from '@/view/Athlete/AddAthletelist'
import Competitionlist from'@/view/Competitionlist'
import projectList from '@/components/projectList'
import scoreList from '@/components/scoreList'
Vue.use(Router)

export default new Router({
  routes: [
    //登陆
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/AddAthletelist',
      name: 'addath',
      component: AddAthletelist

    },
    //主页面
    {
      path: '/adminUser',
      name: 'admin',
      component: index,
      children: [{
          path: 'list',
          name: 'admin-list',
          component: adminList
        },
        {
          path: 'list2',
          name: 'admin-list-2',
          component: AthList,
        },
        {
          path:'clist',
          name:'Competition',
          component:Competitionlist
        },
        {
          path:'plist',
          name:'projectList',
          component:projectList
        },
        {
          path:'slsit',
          name:'scoreList',
          component:scoreList
        },
        {
          path: '/',
          redirect: 'list'
        }
      ]
    },
  ]
})
