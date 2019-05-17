<template>
    <div id="customerSatisfactionView">
        <el-dialog :title="title"
        width="50%" 
        :visible.sync="dialogFormVisible"
        :before-close="handleClose">
            <el-transfer :titles="['待选评价表', '已选评价表']" style="margin:0 auto;" v-model="value" :data="data"></el-transfer>
            <div id="btnGroupDiv">
                <el-button @click="save" type="primary">保存</el-button><el-button @click="handleClose" type="info">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {gets,send} from './sendStatisticsTask.js'
import {getLoginInfo} from '../../OnlineEvaluation/onlineEvaluation.js'
export default {
    name:'customerSatisfactionView',
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        // const generateData = _ => {
        //     const data = [];
        //     for (let i = 1; i <= 15; i++) {
        //     data.push({
        //         key: i,
        //         label: `备选项 ${ i }`,
        //         // disabled: i % 4 === 0
        //     });
        //     }
        //     return data;
        // }; 
        return {
            dialogFormVisible:true,
            title:'统计任务发送',
            data:[],
            value: [],
        }
    },
    methods:{// 自定义方法
        handleClose(done) {
            this.$router.back();
        },
        // 保存
        save(){
            let saveData={};
            saveData.evaluateId=this.value.join(',');
            for(let i=0;i<this.value.length;i++){
                if(this.data[i].id==this.value[i]){
                    saveData.planPKID=this.data[i].planPKID;
                    saveData.evaluKind=this.data[i].evaluKind;
                    saveData.planPKID=this.data[i].evaluateTname;
                    break;
                }
            }
            send(saveData).then((result) => {
                if(result.status == 200){
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                    this.$router.back();
                    this.$store.state.data.callback();
                }else{
                    this.$message.error('保存失败!');
                }
            })
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
        let data='完成，统计中,已统计'
        gets(data).then((result) => {
            console.log(result.data.content)
            for(let i=0;i<result.data.content.length;i++){
                this.data.push(result.data.content[i]);
                this.data[i].key=result.data.content[i].id;
                this.data[i].label=result.data.content[i].evaluateTname+'——'+result.data.content[i].state;
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
    #btnGroupDiv{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    #btnGroupDiv button{
        margin-right: 15px;
    }
    .el-transfer-panel{
        width: 44%;
    }
</style>