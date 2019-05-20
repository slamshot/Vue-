<template>
    <div id="search" class="search">
        <el-form style="width:100%;display: flex;justify-content: space-between;" :inline="true" :model="searchData" class="demo-form-inline">
            <el-form-item>
                <el-select v-model="searchData.evaluKind" placeholder="请选择评价类别" size="small" clearable>
                    <el-option v-for="item in evaluKindOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchData.targetName" placeholder="输入指标名称" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searching" size="small" icon="el-icon-search">筛选</el-button>
                <!-- <el-button type="primary" @click="clear" size="small" icon="el-icon-refresh">清空</el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { getEvaluKind } from '../onlineEvaluation.js'
export default {
    name:'search',
    inject: ["search"],
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        return {
            searchData:{},
            evaluKindOptions: []
        }
    },
    methods:{// 自定义方法
        searching(){
            this.search(this.searchData);
        },
        clear(){
            this.searchData = {
                evaluKind:'',
                targetName:''
            };
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
        getEvaluKind().then((res) => {
            if(res.status == 200){
                this.evaluKindOptions = res.data;
            }
        })
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
.search{
    /* text-align: right; */
    padding-right: 250px;
}
</style>
