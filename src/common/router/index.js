import Vue from 'vue'
import Router from 'vue-router'

import selectUser from '../../components/components/selectUser/selectUser.vue'
// import OnlineEvaluation from '../../components/OnlineEvaluation'
Vue.use(Router)

export const constantRouterMap = [
  {path:'/',component:() => import('../../components/OnlineEvaluation'),name:'onlineEvaluation',redirect:{name:'evaluatePlanList'},children:[
    {path:'/evaluatePlanList',component:()=>import('../../components/OnlineEvaluation/EvaluatePlan'),name:'evaluatePlanList',children:[
      { path: '/evaluatePlan', component: () => import('../../components/OnlineEvaluation/EvaluatePlan/EvaluatePlan.vue'),name: 'evaluatePlan' },
    ]},
    {path:'/evaluateTargetList',component:()=>import('../../components/OnlineEvaluation/EvaluateTarget'),name:'evaluateTargetList',children:[
      { path: '/evaluateTarget', component: () => import('../../components/OnlineEvaluation/EvaluateTarget/evaluateTarget.vue'),name: 'evaluateTarget' },
    ]},
    {path:'/evaluateModelList',component:()=>import('../../components/OnlineEvaluation/EvaluateModel'),name:'evaluateModelList',children:[
      { path: '/evaluateModel', component: () => import('../../components/OnlineEvaluation/EvaluateModel/evaluateModel.vue'),name: 'evaluateModel' },
    ]},
    {path:'/evaluateClientList',component:()=>import('../../components/OnlineEvaluation/EvaluateClient'),name:'evaluateClientList',children:[
      { path: '/evaluateClient', component: () => import('../../components/OnlineEvaluation/EvaluateClient/evaluateClient.vue'),name: 'evaluateClient' },
      { path: '/evaluateClientView', component: () => import('../../components/OnlineEvaluation/EvaluateClient/evaluateClientView.vue'),name: 'evaluateClientView' },
    ]},
  ]},
  { path: '/fillEvaluation', component: () => import('../../components/FillEvaluation'),name: 'fillEvaluation',redirect:{name:'fillEvaluationList'} ,children:[
    { path: '/fillEvaluation/fillEvaluationList', component: () => import('../../components/FillEvaluation/EvaluateClientList'),name: 'fillEvaluationList' ,children:[
      { path: '/fillEvaluation/evaluateClientSec', component: () => import('../../components/FillEvaluation/evaluateClientSec/evaluateClientSec.vue'),name: 'evaluateClientSec' },
      { path: '/fillEvaluation/evaluateConsign', component: () => import('../../components/FillEvaluation/evaluateConsign/evaluateConsign.vue'),name: 'evaluateConsign'},
    ]},
  ]},
  { path: '/processTracking', component: () => import('../../components/processTracking'),name: 'processTracking',redirect:{name:'customerSatisfactionList'} ,children:[
    { path: '/processTracking/customerSatisfactionList', component: () => import('../../components/processTracking/customerSatisfactionList'),name: 'customerSatisfactionList' ,children:[
      { path: '/processTracking/customerSatisfactionView', component: () => import('../../components/processTracking/customerSatisfactionView/customerSatisfactionView.vue'),name: 'customerSatisfactionView'},
    ]},
  ]},
  { path: '/statisticsInquire', component: () => import('../../components/statisticsInquire'),name: 'statisticsInquire',redirect:{name:'statisticalPreprocessingList'} ,children:[
    { path: '/statisticsInquire/statisticalPreprocessingList', component: () => import('../../components/statisticsInquire/statisticalPreprocessingList'),name: 'statisticalPreprocessingList' ,children:[
      { path: '/statisticsInquire/statisticalPreprocessingView', component: () => import('../../components/statisticsInquire/statisticalPreprocessingView/statisticalPreprocessingView.vue'),name: 'statisticalPreprocessingView'},
      { path: '/statisticsInquire/sendStatisticsTask', component: () => import('../../components/statisticsInquire/sendStatisticsTask/sendStatisticsTask.vue'),name: 'sendStatisticsTask'},
    ]},
    {path:'/statisticsInquire/customerSatisfactionAssessment',component: () => import ('../../components/statisticsInquire/customerSatisfactionAssessment'),name:'customerSatisfactionAssessment'}
  ]},
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  // 每次滚动后定位到页面的最顶端y=0
  routes: constantRouterMap
})

