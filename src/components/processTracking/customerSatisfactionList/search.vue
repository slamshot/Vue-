<template>
    <div id="search">
        <el-form :inline="true" :model="searchData" class="demo-form-inline">
            <el-row type="flex" justify="space-between" id="searchFrom">
                <el-col :span="4">
                    <el-form-item label-width="100px">
                        <el-date-picker size="small" v-model="searchData.dateFrame" type="daterange" range-separator="至" 
                        start-placeholder="制表时间" end-placeholder="制表时间" style="width:230px;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-input v-model="searchData.evaluateTname" placeholder="请输入评测表名称" size="small" style="width:260px;" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <!-- <el-button type="primary" @click="clear" size="small" icon="el-icon-refresh">清空</el-button> -->
                    <el-button style="margin-top: 4px;" type="primary" @click="searching" size="small" icon="el-icon-search">查询</el-button>
                    <!-- <el-button style="margin-top: 4px;" type="primary" @click="clearFrom" size="small" icon="el-icon-circle-close">清空</el-button> -->
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { getEvaluKind } from '@/components/OnlineEvaluation/onlineEvaluation.js'
export default {
    name:'search',
    inject: ["search"],
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        return {
            searchData:{},
            evaluKindOptions: [],
        }
    },
    methods:{// 自定义方法
        searching(){
            this.search(this.searchData);
        },
        // clear(){
        //     this.searchData = {
        //         evaluKind:'',
        //         evaluPlan:'',
        //         flag:''
        //     };
        // }
        // 清空
        // clearFrom(){
        //     this.searchData={};
        // }
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
<style scoped>
.el-form-item {
    margin-bottom: 10px;
}
#searchFrom{
    padding-right: 18%;
}
</style>
