<template>
    <div id="fillEvaluation" class="content-height">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="收到的评价表" name="first">
                <evaluate-client-list></evaluate-client-list>
            </el-tab-pane>
        </el-tabs>
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
