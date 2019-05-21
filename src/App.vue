<template>
  <div id="app" :style="'height:'+appHeight+'px;'">
      <!-- <online-evaluation></online-evaluation> -->
      <!-- <home></home> -->
      <div id="bothAll" style="height:100%;">
        <div id="firstJ">
          <router-link class="divHand" tag="div" :to="{name:'onlineEvaluation'}">评价计划</router-link>
          <router-link class="divHand" tag="div" :to="{name:'fillEvaluation'}">评价表</router-link>
          <router-link class="divHand" tag="div" :to="{name:'processTracking'}">过程跟踪</router-link>
          <router-link class="divHand" tag="div" :to="{name:'statisticsInquire'}">统计查询</router-link>
        </div>
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
// import OnlineEvaluation from './components/OnlineEvaluation'
import Home from './components/home/home.vue'
export default {
  name: 'App',
  components:{
      Home
  },
  data:function(){
    return {
        appHeight:window.innerHeight-70
    }
  },
  created(){
    
  },
  mounted(){
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
          self.appHeight = window.innerHeight-67
      }
  },
  watch:{
    $route(to,from){
      let domArr=document.querySelector('#firstJ').querySelectorAll('.divHand');
      for(let i=0;i<domArr.length;i++){
        domArr[i].style.background=''
      }
      
      if(to.name=='evaluatePlanList' || to.name=='evaluateTargetList' || to.name=='evaluateModelList' || to.name=='evaluateClientList'){
        domArr[0].style.background='rgb(112, 213, 233)';
      }else if(to.name=='fillEvaluationList'){
        domArr[1].style.background='rgb(112, 213, 233)';
      }else if(to.name=='customerSatisfactionList'){
        domArr[2].style.background='rgb(112, 213, 233)';
      }else if(to.name=='statisticalPreprocessingList' || to.name=='customerSatisfactionAssessment'){
        domArr[3].style.background='rgb(112, 213, 233)';
      }
    }
  }
}
</script>

<style>
body .el-table th.gutter{
  display: table-cell!important;
}
#bothAll{
  display: flex;
}
#firstJ{
  margin-right: 20px;
  background: #409EFF;
  color: #fff;
}
.divHand{
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  width: 100px;
  border-bottom: 1px solid #ddd;
}
</style>
