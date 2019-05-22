<template>
    <div id="evaluateModel">
       <el-dialog title="添加在线评价模板" :visible=true @close="close" :width="dialogWidth" :close-on-click-modal="false">
           <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
                <el-form-item prop="pkid" label="编号" v-show="false">
                    <el-input v-model="formData.pkid" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="evaluKind" label="评价类别" class="item">
                    <el-select v-model="formData.evaluKind" placeholder="请选择" :disabled="true">
                        <el-option v-for="item in evaluKindOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="modelName" label="模板名称" class="item">
                    <el-input v-model="formData.modelName" placeholder="输入模板名称" :disabled="Object.is(type,'view')"></el-input>
                </el-form-item>
           </el-form>
           <div class=detail>
                <div class="detail_toolbar" v-show="!Object.is(type,'view')">
                    <el-button type="primary" @click="addDetailRow" icon="el-icon-plus" size="mini" title="添加行"></el-button>
                </div>
                <el-table :data="formDataDetail" style="width: 100%" border>
                    <el-table-column align="center" label="指标名称" width="450">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.pkid" v-show="false"></el-input>
                            <!-- <el-input size="mini" :name="'targetName_'+scope.$index" v-model="scope.row.targetName" :disabled="Object.is(type,'view')"></el-input> -->
                            <label>{{ scope.row.targetName }}</label>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="指标权重" width="100">
                        <template slot-scope="scope">
                            <el-input size="mini" :name="'targetWeight_'+scope.$index" v-model="scope.row.targetWeight" :disabled="Object.is(type,'view')" v-validate="'required'" :class="{'error': errors.has('targetWeight_'+scope.$index)}"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" min-width="80">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" title="删除" :disabled="Object.is(type,'view')"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
           </div>
           <div id="toolbar" class="toolbar" slot="footer" v-show="!Object.is(type,'view')">
               <el-button ref="saveButton" type="primary" @click="saveData('form',0)">保存</el-button>
               <el-button type="primary" @click="saveData('form',1)" icon="el-icon-success">保存并使用模板</el-button>
               <el-button @click="close" icon="el-icon-close">取消</el-button>
           </div>
           <select-target ref="target" :callback=targetDialogCallback></select-target>
       </el-dialog>
    </div>
</template>
<script>
import { save,get } from './evaluateModel.js'
import { getEvaluKind,getLoginInfo } from '../onlineEvaluation.js'
import { guid } from '@/utils/common.js'
import Rules,{addDictionary} from './validate.js'
import SelectTarget from '../EvaluateTarget/selectTarget.vue'
export default {
    name:'evaluateModel',
    props:{// 其他组件传入的值
       
    },
    components:{
        SelectTarget
    },
    data:function(){// 自定义变量 
        return {
            formRules: Rules,
            //表单类型
            type:'',
            // 表单数据
            formData:{
                evaluKind:'内部顾客满意度测评'
            },
            // 明细数据
            formDataDetail:[],
            // 明细删除的数据
            deleteDetailData:[],
            // 表单主键值
            id:'',
            // 弹出窗口宽度 默认为屏幕的50%
            dialogWidth:"45%",
            // 评价类别
            evaluKindOptions:[],
        }
    },
    methods:{// 自定义方法
        // 关闭弹出框
        close(){
            this.$router.back(-1);
        },
        // 表单提交前事件
        beforeSubmit(){
            let sum = 0;
            this.formDataDetail.forEach(({targetWeight}) => {
                sum += Number.parseInt(targetWeight);
            });
            if(sum != 100){
                this.$message({
                    message: '所有指标的权重之和不为100',
                    type: 'error'
                });
                return false;
            }
            return true;
        },
        async saveData(formName,mark){
            let valid1 = false;
            let valid2 = false;
            await this.$validator.validateAll().then((valid) => {
                valid1 = valid;
            });
            await this.$refs[formName].validate((valid) => {
                valid2 = valid;
            });
            let data = this.formData;
            // 合并明细数据
            let newFormDataDetail = [...this.formDataDetail,...this.deleteDetailData];
            // 添加明细数据
            // 将明细的数据放在主表的childrens属性里面，后端的实体类也要有这个childrens属性
            data["childrens"] = Array.from(newFormDataDetail);
            if(valid1 && valid2 && this.beforeSubmit()){
                //this.$refs.saveButton.loading = true;
                let data = Object.assign({}, this.formData,getLoginInfo());
                save(data).then((res)=>{
                    if(res.status == 200){
                        // this.formData = res.data.main;
                        // this.formDataDetail = res.data.detail;
                        this.$store.state.data.callback({type:this.type,data:res.data});
                        if(mark == 0){
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.close();
                        }else{// 保存并使用
                            this.$store.commit("setData",{data:res.data});
                            this.$router.push(
                                {
                                    name:'evaluateClient',
                                    query:{
                                        useType:'add',
                                        mark:0
                                    }
                                }
                            );
                        }
                        
                    }
                });
            }
            // 弹出错误信息
            if(!valid1){
                this.$message({
                    message: "权重不能为空",
                    type: 'error'
                });
            }
        },
        getData(){
            get(this.id).then((res) => {
                if(res.status == 200){
                    this.formData = res.data.main;
                    this.formDataDetail = res.data.detail;
                }
            });
        },
        // 添加行
        addDetailRow(){
            this.$refs.target.open();
        },
        // 删除行
        handleDelete(index,row){
            this.formDataDetail.splice(index, 1);
            if(Object.is(row.doType,'add')){
                return;
            }
            this.deleteDetailData.push(Object.assign(row,{doType:"delete"}));
        },
        targetDialogCallback(data){
            data.forEach(({pkid:targetPKID,targetName}) => {
                this.formDataDetail.push({targetPKID,targetName,doType:'add'});
            });
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
        // 监听明细数据的变化，添加错误信息翻译
        "formDataDetail":function(curVal,oldVal){
            let dics = {};
            if(curVal){
                for(let index of curVal.keys()){
                    let count = index + 1;
                    dics["targetWeigth_"+index] = '第'+count+'行的指标权重';
                }
                addDictionary(dics);
            }
            
        }
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
