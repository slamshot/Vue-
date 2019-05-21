<template>
    <div id="fillEvaluation">
        <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="收到的评价表" name="first">
                <evaluate-client-list></evaluate-client-list>
            </el-tab-pane>
        </el-tabs> -->
        <div id="pjbDiv">
            <router-link class="pjbDivSon" tag="div" :to="{name:'fillEvaluationList'}">收到的评价表</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import EvaluateClientList from './EvaluateClientList'
export default {
    name:'fillEvaluation',
    components:{
        EvaluateClientList
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
            
            let domArr=document.querySelector('#pjbDiv').querySelectorAll('.pjbDivSon');
            
            for(let i=0;i<domArr.length;i++){
                domArr[i].style.borderBottom='';
                domArr[i].style.color='';
            }
            
            switch(to.name){
                case "fillEvaluationList":
                    domArr[0].style.borderBottom='2px solid #66b1ff';
                    domArr[0].style.color='#66b1ff';
                    break;
            }
        }
    },
    created:function(){// 组件创建后
        // TODO
        
    },
    mounted:function(){// 组件加载完成
        // TODO
        let domArr=document.querySelector('#pjbDiv').querySelectorAll('.pjbDivSon')
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

#fillEvaluation{
    height:100%;
    width:100%
}
#pjbDiv{
    display: flex;
    border-bottom: 1px solid #ddd;
    height: 40px;
}
#pjbDiv>div{
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
