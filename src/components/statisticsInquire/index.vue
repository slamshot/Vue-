<template>
    <div id="processTracking">
        <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="收到的评价表" name="first">
                <evaluate-client-list></evaluate-client-list>
            </el-tab-pane>
        </el-tabs> -->
        <div id="tjcxDiv">
            <router-link class="tjcxDivSon" tag="div" :to="{name:'statisticsInquire'}">统计预处理</router-link>
            <router-link class="tjcxDivSon" tag="div" :to="{name:'customerSatisfactionAssessment'}">顾客满意度测评</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
// import EvaluateClientList from './EvaluateClientList'
export default {
    name:'processTracking',
    components:{
        // EvaluateClientList
    },
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        return {
            activeName:'first'
        }
    },
    methods:{// 自定义方法
        handleClick(){

        }
    },
    /**
     * 计算属性（自定义方法）
     * 调用方式：是以属性的方式调用
     * 使用场景：对于任何复杂逻辑
     * 
     * computed是有缓存的功能
     */
    computed:{

    },
    watch:{
        $route(to,from){
            let domArr=document.querySelector('#tjcxDiv').querySelectorAll('.tjcxDivSon');
            
            for(let i=0;i<domArr.length;i++){
                domArr[i].style.borderBottom='';
                domArr[i].style.color='';
            }
            // console.log(domArr);
            // console.log(to.name);
            
            switch(to.name){
                case "statisticalPreprocessingList":
                    domArr[0].style.borderBottom='2px solid #66b1ff';
                    domArr[0].style.color='#66b1ff';
                    break;
                case "customerSatisfactionAssessment":
                    domArr[1].style.borderBottom='2px solid #66b1ff';
                    domArr[1].style.color='#66b1ff';
                    break;
            }
        }
    },
    created:function(){// 组件创建后
        // TODO
        
    },
    mounted:function(){// 组件加载完成
        // TODO
        let domArr=document.querySelector('#tjcxDiv').querySelectorAll('.tjcxDivSon')
        domArr[0].style.color='#66b1ff';
        domArr[0].style.borderBottom='2px solid #66b1ff';
    },
    beforeUpdate:function(){// 组件数据更新之前
        // TODO
    },
    updated:function(){// 组件数据更新之后
        // TODO
    }
}
</script>
<style>
/* .el-tabs{
    height: 100%;
}
.el-tabs__content{
    height: 100%;
}
.el-tab-pane{
    height: 100%;
} */

#processTracking{
    height:100%;
    width:100%
}
#tjcxDiv{
    display: flex;
    border-bottom: 1px solid #ddd;
    height: 40px;
}
#tjcxDiv>div{
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
