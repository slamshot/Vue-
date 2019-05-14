import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/evaluatePlan', component: () => import('../../components/OnlineEvaluation/EvaluatePlan/EvaluatePlan.vue'), hidden: true,name: 'evaluatePlan' },
  { path: '/evaluateTarget', component: () => import('../../components/OnlineEvaluation/EvaluateTarget/evaluateTarget.vue'), hidden: true,name: 'evaluateTarget' },
  { path: '/evaluateModel', component: () => import('../../components/OnlineEvaluation/EvaluateModel/evaluateModel.vue'), hidden: true,name: 'evaluateModel' ,children: [
    // { path: '/evaluateClient', component: () => import('../../components/OnlineEvaluation/EvaluateClient/evaluateClient.vue'), hidden: true,name: 'evaluateClient' },
  ]},
  { path: '/evaluateClient', component: () => import('../../components/OnlineEvaluation/EvaluateClient/evaluateClient.vue'), hidden: true,name: 'evaluateClient' },
  { path: '/evaluateClientView', component: () => import('../../components/OnlineEvaluation/EvaluateClient/evaluateClientView.vue'), hidden: true,name: 'evaluateClientView' },
  { path: '/fillEvaluation', component: () => import('../../components/FillEvaluation'), hidden: true,name: 'fillEvaluation' },
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  // 每次滚动后定位到页面的最顶端y=0
  routes: constantRouterMap
})

