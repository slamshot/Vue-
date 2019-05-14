<template>
  <div id="app" :style="'height:'+appHeight+'px;'">
      <online-evaluation></online-evaluation>
      <!-- <home></home> -->
      <router-view></router-view>
  </div>
</template>

<script>
import OnlineEvaluation from './components/OnlineEvaluation'
import Home from './components/home/home.vue'
export default {
  name: 'App',
  components:{
      Home,OnlineEvaluation
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

</style>
