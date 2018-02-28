import Vue from 'vue'
import Router from 'vue-router'
import logAndReg from '@/components/base/logAndReg.vue'
import companyReg from '@/components/companyReg/companyReg/companyReg.vue'
import findPsd from '@/components/base/findPsd.vue'
import blank from '@/components/base/blank.vue'
import Home from '@/components/base/Home.vue'
import homeMap from '@/components/base/homeMap.vue'
//数据中心
import realData from '@/components/dataCenter/realData/realData.vue'
import historyData from '@/components/dataCenter/historyData/base.vue'
import analyzeData from '@/components/dataCenter/analyzeData/analyzeData.vue'
// 报警中心
import cellInfo from '@/components/cellCenter/cellInfo/base.vue'
import cellSet from '@/components/cellCenter/cellSet.vue'
// 分析中心
import dataCreate from '@/components/anaylzeCenter/dataLoad/base.vue'
import testReport from '@/components/anaylzeCenter/testReport/base.vue'
// 注册模块
import confirmReg from '@/components/companyReg/confirmReg/confirmReg.vue'
// 系统日志
import systemLog from '@/components/systemLog/base.vue'
// 基础信息
import clientManage from '@/components/basic/clientManage/base.vue'
import organizationManage from '@/components/basic/groupManage/base.vue'
import boilerHouseManage from '@/components/basic/heatManage/base.vue'
import dictionaryManage from '@/components/basic/paramManage/base.vue'
import chinmeyManage from '@/components/basic/chimneyManage/base'
import chinmeyMap from '@/components/basic/chimneyManage/component/chimneyMap.vue'
import adminDivision from '@/components/basic/adminDivision/admin.vue'
// 系统权限
import userManage from '@/components/permission/userManage/base.vue'
import roleManage from '@/components/permission/roleManage/base.vue'


Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'logAndReg',
      meta: {
        title: '登录'
      },
      component: logAndReg
    },
  // 公司注册
  {
    path: '/companyReg',
    name: 'companyReg',
    meta: {
      title: '公司注册'
    },
    component: companyReg
  },
    {
      path: '/findPsd',
      name: 'findPsd',
      meta: {
        title: '找回密码'
      },
      component: findPsd
    },
    {
      path: '/blank',
      name: 'blank',
      component: blank
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
      // 首页地图
        {
          path: '/homeMap',
          name: 'homeMap',
          meta: {
            title: '首页',
          },
          component: homeMap
        },
      // 数据中心
        {
          path: '/realData',
          name: 'realData',
          meta: {
            title: '实时数据'
          },
          component: realData,
          children: [

          ]
        },
        {
          path: '/historyData',
          name: 'historyData',
          meta: {
            title: '历史数据'
          },
          component: historyData
        },
        {
          path: '/clientManage',
          name: 'clientManage',
          meta: {
            title: '客户管理'
          },
          component: clientManage
        },
        {
          path: '/analyzeData',
          name: 'analyzeData',
          meta: {
            title: '报表分析'
          },
          component: analyzeData
        },
        // 报警中心
        {
          path: '/cellInfo',
          name: 'cellInfo',
          meta: {
            title: '报警信息'
          },
          component: cellInfo
        },
        {
          path: '/cellSet',
          name: 'cellSet',
          meta: {
            title: '报警设置'
          },
          component: cellSet
        },
        // 分析中心
        {
          path: '/dataCreate',
          name: 'dataCreate',
          meta: {
            title: '数据生成'
          },
          component: dataCreate
        },
        {
          path: '/testReport',
          name: 'testReport',
          meta: {
            title: '检测报告查询'
          },
          component: testReport
        },
        {
          path: '/confirmReg',
          name: 'confirmReg',
          meta: {
            title: '注册审批'
          },
          component: confirmReg
        },
        // 系统日志
        {
          path: '/systemLog',
          name: 'systemLog',
          meta: {
            title: '系统日志'
          },
          component: systemLog
        },
        //基础信息
        {
          path: '/organizationManage',
          name: 'organizationManage',
          meta: {
            title: '组织机构管理'
          },
          component: organizationManage
        },
        {
          path: '/boilerHouseManage',
          name: '/boilerHouseManage',
          meta: {
            title: '热源管理'
          },
          component: boilerHouseManage
        },
        {
          path: '/dictionaryManage',
          name: 'dictionaryManage',
          meta: {
            title: '参数管理'
          },
          component: dictionaryManage
        },
        {
          path: '/chinmeyManage',
          name: 'chinmeyManage',
          meta: {
            title: '烟囱管理'
          },
          component: chinmeyManage
        },
        {
          path: '/chinmeyMap',
          name: 'chinmeyMap',
          meta: {
            title: '烟囱地图'
          },
          component: chinmeyMap
        },
        {
          path: '/adminDivision',
          name: 'adminDivision',
          meta: {
            title: '行政区划'
          },
          component: adminDivision
        },
        //系统权限
        {
          path: '/userManage',
          name: 'userManage',
          meta: {
            title: '用户管理'
          },
          component: userManage
        },
        {
          path: '/roleManage',
          name: 'roleManage',
          meta: {
            title: '角色管理'
          },
          component: roleManage
        }
      ]
    }
  ]
})
