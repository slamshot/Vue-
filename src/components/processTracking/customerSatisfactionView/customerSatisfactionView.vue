<template>
    <div id="customerSatisfactionView">
        <el-dialog :title="title" 
        :visible.sync="dialogFormVisible"
        :before-close="handleClose">
            <h4>在线评价——{{modelName}}</h4>
            <div class="pDiv"><span>评价类别：{{evaluKind}}</span>    <span>模板名称：{{modelName}}</span></div>
            <div class="pDiv"><span>评价表名：{{evaluateTname}}</span>  <span>制表部门：{{groupName}}</span>   <span>制表时间：{{inputDate}}</span>   <span>催办提前期：{{emailDay}}天</span></div>
        </el-dialog>
    </div>
</template>

<script>
import {clientList} from './customerSatisfactionViewApi.js'
import {getLoginInfo} from '../../OnlineEvaluation/onlineEvaluation.js'
export default {
    name:'customerSatisfactionView',
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        return {
            // 评价表名
            evaluateTname:'',
            // 模板名称
            modelName:'',
            // 催办提前期
            emailDay:'',
            // 制表日期
            inputDate:'',
            // 评价类别
            evaluKind:'',
            // 制表部门
            groupName:'',
            dialogFormVisible:true,
            title:'查看',
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
        this.evaluateTname=this.$route.query.evaluateTname;
        this.modelName=this.$route.query.modelName;
        this.emailDay=this.$route.query.emailDay;
        this.evaluKind=this.$route.query.evaluKind;
        this.groupName=this.$route.query.groupName;
        this.inputDate=this.$route.query.inputDate.substring(0,10);
        clientList(this.$route.query.id).then((result) => {
            console.log(result.data)
        }).catch((err) => {
            
        });
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
</style>