<template>
    <div id="evaluatePlan">
       <el-dialog title="添加评价计划" :visible=true @close="close" :width="dialogWidth" :close-on-click-modal="false">
           <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="fkid" label="编号" v-show="false">
                            <el-input v-model="formData.fkid" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="evaluKind" label="评价类别" class="item">
                            <el-select style="width:220px" v-model="formData.evaluKind" placeholder="请选择" :disabled="Object.is(type,'view')">
                                <el-option v-for="item in evaluKindOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="evaluPlan" label="计划名称" class="item">
                            <el-input style="width:220px" v-model="formData.evaluPlan" placeholder="输入用户名" :disabled="Object.is(type,'view')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="startDate" label="开始时间" class="item">
                            <el-date-picker type="date" v-model="formData.startDate" value-format="yyyy-MM-dd" 
                            placeholder="选择开始时间" :disabled="Object.is(type,'view')"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="endDate" label="完成时间" class="item">
                            <el-date-picker format="yyyy-MM-dd" type="date" v-model="formData.endDate" value-format="yyyy-MM-dd" placeholder="选择结束时间" :disabled="Object.is(type,'view')"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="alertDay" label="预警提前期" class="item">
                            <el-input style="width:120px" v-model.number="formData.alertDay" placeholder="" :disabled="Object.is(type,'view')"></el-input>天
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="emailDay" label="催办提前期" class="item">
                            <el-input style="width:120px" v-model.number="formData.emailDay" placeholder="" :disabled="Object.is(type,'view')"></el-input>天
                        </el-form-item>
                    </el-col>
                </el-row>
           </el-form>
           <div class="remarkText">
                 <p>
                    注：“预警提前期”的作用是评价计划开始后，若时间超过“预警提前期”后，计划仍处于“开始状态
                    （没有部门发出过评价表）系统自动向计划制定人发送提示信息；“催办提前期”，当评价人未在规定时
                    间内填写评价表时，系统自动向评价人发送催办信息。
                </p>
           </div>
           <div id="toolbar" class="toolbar" slot="footer" v-show="!Object.is(type,'view')">
               <el-button ref="saveButton" type="primary" @click="saveData('form',1)">保存</el-button>
               <el-button ref="saveButton" type="primary" @click="saveData('form',0)">暂存</el-button>
               <el-button @click="close" icon="el-icon-close">取消</el-button>
           </div>
       </el-dialog>
    </div>
</template>
<script>
import { save,get } from './evaluatePlan.js'
import { getEvaluKind,getLoginInfo,planStates } from '../onlineEvaluation.js'
import { formatDate } from '@/utils/common.js'
import Rules from './validate.js'
export default {
    name:'evaluatePlan',
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量 
        return {
            formRules: Rules,
            //表单类型
            type:'',
            // 表单数据
            formData:{},
            // 表单主键值
            id:'',
            // 弹出窗口宽度 默认为屏幕的50%
            dialogWidth:"50%",
            // 评价类别
            evaluKindOptions:[],
        }
    },
    methods:{// 自定义方法
        // 关闭弹出框
        close(){
            this.$router.back();
        },
        // 获取表单数据后事件
        afterGetData(){
            if(this.formData.flag != 0 && Object.is(this.type,"modify")){
                this.type = 'view';
                this.$message({
                    message: `计划已经${planStates[this.formData.flag]}，不能修改计划`,
                    type: 'warning'
                });
            }
        },
        // 表单提交前事件
        beforeSubmit(){
            // TODO
            return true;
        },
        saveData(formName,btnType){
            this.$refs[formName].validate((valid) => {
                if(valid && this.beforeSubmit()){
                    //this.$refs.saveButton.loading = true;
                    let data = Object.assign({}, this.formData,getLoginInfo());
                    data.flag = btnType;
                    save(data).then((res)=>{
                        if(res.status == 200){
                            if(res.data != ""){
                                this.$store.state.data.callback({type:this.type,data:res.data});
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                this.close();
                            }else{
                                this.$message({
                                    message: '此类型已有评价计划正在执行',
                                    type: 'warning'
                                });
                            }
                            
                        }
                    });
                }
            });
        },
        async getData(){
            await get(this.id).then((res) => {
                if(res.status == 200){
                    // 处理时间
                    this.formData = res.data;
                }
            });
            this.afterGetData();
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
        // DOTO
        this.type = this.$store.state.data.useType;
        this.id = this.$store.state.data.id;
        if(!Object.is(this.type,"add")){
            this.getData();
        }
        getEvaluKind().then((res) => {
            if(res.status == 200){
                this.evaluKindOptions = res.data;
            }
        })
        console.log('dialog');
        
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
.remarkText{
    padding: 0 20px 0 20px;
}
</style>
