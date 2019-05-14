<template>
    <div id="evaluationManage" class="content-height">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="评价计划" name="first">
                <evaluate-plan></evaluate-plan>
            </el-tab-pane>
            <el-tab-pane label="指标管理" name="second">
                <evaluate-target></evaluate-target>
            </el-tab-pane>
            <el-tab-pane label="模板表管理" name="third">
                <evaluate-model></evaluate-model>
            </el-tab-pane>
            <el-tab-pane label="分发历史查询" name="fourth">
                <evaluate-client></evaluate-client>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import EvaluatePlan from './EvaluatePlan'
import EvaluateTarget from './EvaluateTarget'
import EvaluateModel from './EvaluateModel'
import EvaluateClient from './EvaluateClient'
export default {
    name:'evaluationManage',
    components:{
        EvaluatePlan,EvaluateTarget,EvaluateModel,EvaluateClient
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
    created:function(){// 组件创建后
        // TODO
    },
    mounted:function(){// 组件加载完成
        // TODO
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
.el-tabs{
    height: 100%;
}
.el-tabs__content{
    height: 100%;
}
.el-tab-pane{
    height: 100%;
}
</style>
