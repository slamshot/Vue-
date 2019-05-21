<template>
    <div id="evaluateTarget">
       <el-dialog title="添加评价指标" :visible=true @close="close" :width="dialogWidth" :close-on-click-modal="false">
           <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
                <el-form-item prop="fkid" label="编号" v-show="false">
                    <el-input v-model="formData.fkid" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="evaluKind" label="评价类别" class="item">
                    <el-select v-model="formData.evaluKind" placeholder="请选择" :disabled="Object.is(type,'view')">
                        <el-option v-for="item in evaluKindOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="targetName" label="指标名称" class="item">
                    <el-input v-model="formData.targetName" placeholder="输入指标名称" :disabled="Object.is(type,'view')"></el-input>
                </el-form-item>
                 <el-form-item prop="description" label="指标含义" class="item">
                    <el-input type="textarea" :rows="4" v-model="formData.description" placeholder="输入指标含义" :disabled="Object.is(type,'view')"></el-input>
                </el-form-item>
           </el-form>
           <div id="toolbar" class="toolbar" slot="footer" v-show="!Object.is(type,'view')">
               <el-button ref="saveButton" type="primary" @click="saveData('form')">保存</el-button>
               <el-button @click="close" icon="el-icon-close">取消</el-button>
           </div>
       </el-dialog>
    </div>
</template>
<script>
import { save,get } from './evaluateTarget.js'
import { getEvaluKind,getLoginInfo } from '../onlineEvaluation.js'
import { guid } from '@/utils/common.js'
import Rules from './validate.js'
export default {
    name:'evaluateTarget',
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
            evaluKindOptions:[]
        }
    },
    methods:{// 自定义方法
        // 关闭弹出框
        close(){
            this.$router.back(-1);
        },
        // 表单提交前事件
        beforeSubmit(){
            // TODO
            return true;
        },
        saveData(formName){
            this.$refs[formName].validate((valid) => {
                if(valid && this.beforeSubmit()){
                    //this.$refs.saveButton.loading = true;
                    let data = Object.assign({}, this.formData,getLoginInfo());
                    save(data).then((res)=>{
                        if(res.status == 200){
                            this.$store.state.data.callback({type:this.type,data:res.data});
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.close();
                        }
                    });
                }
            });
        },
        getData(){
            get(this.id).then((res) => {
                if(res.status == 200){
                    this.formData = res.data;
                }
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
    created:function(){// 组件创建后
        // DOTO
        this.type = this.$store.state.data.useType;
        this.id = this.$store.state.data.id;
        if(!Object.is(this.type,"add")){
            this.getData();
        }
    },
    mounted:function(){// 组件加载完成
        // TODO
        getEvaluKind().then((res) => {
            if(res.status == 200){
                this.evaluKindOptions = res.data;
            }
        })
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
