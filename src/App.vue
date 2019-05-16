<template>
  <div id="app" :style="'height:'+appHeight+'px;'">
      <!-- <online-evaluation></online-evaluation> -->
      <!-- <home></home> -->
      <div id="bothAll" style="height:100%;">
        <div id="firstJ">
          <router-link class="divHand" tag="div" :to="{name:'onlineEvaluation'}">评价计划</router-link>
          <router-link class="divHand" tag="div" :to="{name:'fillEvaluation'}">评价表</router-link>
          <router-link class="divHand" tag="div" :to="{name:'fillEvaluation'}">评价表</router-link>
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
        appHeight:window.innerHeight-67
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
  background: #333;
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
