<template>
    <div id="customerSatisfactionView">
        <el-dialog :title="title"
        width="60%" 
        :visible.sync="dialogFormVisible"
        :before-close="handleClose" :close-on-click-modal="false">
            <h4>在线评价——{{modelName}}</h4>
            <div class="pDiv"><span>评价类别：{{evaluKind}}</span>    <span>模板名称：{{modelName}}</span></div>
            <div class="pDiv"><span>评价表名：{{evaluateTname}}</span>  <span>制表部门：{{groupName}}</span>   <span>制表时间：{{inputDate}}</span>   <span>催办提前期：{{emailDay}}天</span></div>
            <el-table
                :data="tableData"
                height="250"
                border
                style="width: 100%">
                <el-table-column
                type="index"
                align="center">
                </el-table-column>
                <el-table-column
                prop="doUserNo"
                label="评价人员工号"
                align="center">
                </el-table-column>
                <el-table-column
                prop="doFullName"
                label="评价人姓名"
                align="center">
                </el-table-column>
                <el-table-column
                prop="groupName"
                label="部门"
                align="center">
                </el-table-column>
                <el-table-column
                prop="inputDate"
                label="填表时间"
                align="center">
                </el-table-column>
                <el-table-column
                prop="state"
                label="状态"
                align="center">
                </el-table-column>
                <el-table-column
                label="删除"
                align="center">
                    <template slot-scope="scope">
                        <el-button
                        icon="el-icon-delete"
                        size="mini"
                        type="primary"
                        @click="handleDelete(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column
                label="催办"
                align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        icon="el-icon-s-promotion"
                        type="primary"
                        @click="handleCb(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import {clientList,deletePeople,sendEmail} from './customerSatisfactionViewApi.js'
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
            tableData:[],
        }
    },
    methods:{// 自定义方法
        handleClose(done) {
            this.$router.back();
        },
        // 删除评价人
        handleDelete(index,row){
            console.log(row);
            if(row.state!='完成'){
                this.$confirm('是否删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deletePeople(row.pkid).then((result) => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        clientList(this.$route.query.id).then((result) => {
                            this.tableData=result.data
                            for(let i=0;i<this.tableData.length;i++){
                                this.tableData[i].inputDate=this.tableData[i].inputDate.substring(0,10);
                                switch (this.tableData[i].state){
                                    case 'finish':
                                        this.tableData[i].state='完成';
                                        break;
                                    case 'save':
                                        this.tableData[i].state='暂存';
                                        break;
                                    case 'start':
                                        this.tableData[i].state='待填';
                                        break;
                                    case 'consign':
                                        this.tableData[i].state='委托';
                                        break;
                                }
                            }
                        }).catch((err) => {
                            
                        });
                    }).catch((err) => {
                        
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }else{
                this.$message({
                    message: '已完成，不可删除!',
                    type: 'warning'
                });
            }
        },
        // 催办
        handleCb(index,row){
            console.log(row);
            sendEmail().then((result) => {
                if(result.status == 200){
                    this.$message({
                        type: 'success',
                        message: '发送邮件成功!'
                    });
                }else{
                    this.$message.error('发送邮件失败!');
                }
            }).catch((err) => {
                
            });
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
        
    },
    created:function(){// 组件创建后
        this.evaluateTname=this.$route.query.evaluateTname;
        this.modelName=this.$route.query.modelName;
        this.emailDay=this.$route.query.emailDay;
        this.evaluKind=this.$route.query.evaluKind;
        this.groupName=this.$route.query.groupName;
        this.inputDate=this.$route.query.inputDate.substring(0,10);
        clientList(this.$route.query.id).then((result) => {
            this.tableData=result.data
            for(let i=0;i<this.tableData.length;i++){
                this.tableData[i].inputDate=this.tableData[i].inputDate.substring(0,10);
                switch (this.tableData[i].state){
                    case 'finish':
                        this.tableData[i].state='完成';
                        break;
                    case 'save':
                        this.tableData[i].state='暂存';
                        break;
                    case 'start':
                        this.tableData[i].state='待填';
                        break;
                    case 'consign':
                        this.tableData[i].state='委托';
                        break;
                }
            }
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
    td{
        
    }
</style>