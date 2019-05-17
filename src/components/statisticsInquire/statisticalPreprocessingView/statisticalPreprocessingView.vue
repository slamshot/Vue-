<template>
    <div id="customerSatisfactionView">
        <el-dialog :title="title"
        width="50%" 
        :visible.sync="dialogFormVisible"
        :before-close="handleClose">
            <el-transfer v-model="value" :data="data"></el-transfer>
        </el-dialog>
    </div>
</template>

<script>
import {clientList,deletePeople,sendEmail} from './statisticalPreprocessingView.js'
import {getLoginInfo} from '../../OnlineEvaluation/onlineEvaluation.js'
export default {
    name:'customerSatisfactionView',
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
            data.push({
                key: i,
                label: `备选项 ${ i }`,
                disabled: i % 4 === 0
            });
            }
            return data;
        }; 
        return {
            dialogFormVisible:true,
            title:'查看',
            data: generateData(),
            value: [1, 4]
        }
    },
    methods:{// 自定义方法
        handleClose(done) {
            this.$router.back();
        },
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
        
    },
    created:function(){// 组件创建后
        
    },
    mounted:function(){// 组件加载完成
        // DOTO
        
    },
    beforeUpdate:function(){// 组件数据更新之前
        // DOTO
    },
    updated:function(){// 组件数据更新之后
        // DOTO
    },
}
</script>
<style scope>
    h4{
        font-size: 18px;
        color: #409EFF;
    }
    .el-dialog__body{
        padding: 5px 20px;
        padding-bottom: 20px;
    }
    .pDiv{
        margin-bottom: 22px;
        display: flex;
    }
    .pDiv span{
        display: block;
        margin-right: 25px;
    }
    td{
        
    }
</style>