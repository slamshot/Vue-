<template>
    <div id="evaluateClient">
        <el-dialog :title="formData.planName" :visible=true @close="close" :width="dialogWidth" :close-on-click-modal="false">
            <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="id" label="编号" v-show="false">
                            <el-input v-model="formData.id" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="evaluKind" label="评价类别" class="item">
                            <!-- <el-select style="width:220px" v-model="formData.evaluKind" placeholder="请选择" :disabled="Object.is(type,'view')">
                                <el-option v-for="item in evaluKindOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select> -->
                            <label>{{formData.evaluKind}}</label>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="modelName" label="模板名称" class="item">
                            <!-- <el-input style="width:220px" v-model="formData.evaluPlan" placeholder="输入用户名" :disabled="Object.is(type,'view')"></el-input> -->
                            <label>{{formData.modelName}}</label>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="evaluateTname" label="评价表名" class="item">
                            <!-- <el-date-picker v-model="formData.startDate" type="date" placeholder="选择开始时间" :disabled="Object.is(type,'view')"></el-date-picker> -->
                            <el-input v-model="formData.evaluateTname" placeholder="输入评价表名" :disabled="Object.is(type,'view')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="inputDate" label="制表时间" class="item">
                            <el-date-picker v-model="formData.inputDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择制表时间" :disabled="Object.is(type,'view')"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="emailDay" label="催办提前期" class="item">
                            <label>{{formData.emailDay}}天</label>
                        </el-form-item>
                    </el-col>
                </el-row>
           </el-form>
           <div class="evaluate-config">
               <div class="area evaluate-config-left">
                    <div>
                        <span class="detail_title">被评价部门</span>
                        <div class="detail_toolbar" v-show="!Object.is(type,'view')">
                            <el-button type="primary" @click="addDetailRow_group" icon="el-icon-plus" size="mini" title="添加行"></el-button>
                        </div>
                    </div>
                    <el-table :data="formDataDetail_group" style="width: 100%;" border height="360">
                        <el-table-column align="center" label="序号" width="50">
                            <template slot-scope="scope">
                                <label>{{ scope.$index+1 }}</label>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="部门" width="180">
                            <template slot-scope="scope">
                                <label>{{ scope.row.name }}</label>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" min-width="40">
                            <template slot-scope="scope">
                                <el-button :disabled="Object.is(type,'view')" size="mini" type="danger" @click="handleDelete_group(scope.$index, scope.row)" icon="el-icon-delete" title="删除"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
               </div>
               <div class="area evaluate-config-center">
                   <div style="position: relative;">
                        <span  class="detail_title">评价指标</span>
                        <div class="detail_toolbar" style="height:28px;" v-show="!Object.is(type,'view')">
                            <!-- <el-button type="primary" @click="addDetailRow_index" icon="el-icon-plus" size="mini" title="添加行"></el-button> -->
                        </div>
                   </div>
                    <el-table :data="formDataDetail_index" style="width: 100%;" border height="360">
                        <el-table-column align="center" label="指标名称" width="200">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.pkid" v-show="false"></el-input>
                                <label>{{ scope.row.targetName }}</label>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="权重" min-width="50">
                            <template slot-scope="scope">
                                <label>{{ scope.row.targetWeight }}</label>
                            </template>
                        </el-table-column>
                    </el-table>
               </div>
               <div class="area evaluate-config-right">
                   <div>
                        <span class="detail_title">被评价人</span>
                        <div class="detail_toolbar" v-show="!Object.is(type,'view')">
                            <el-button type="primary" @click="addDetailRow_evaluate" icon="el-icon-plus" size="mini" title="添加行"></el-button>
                        </div>
                   </div>
                    <el-table :data="formDataDetail_evaluate" style="width: 100%;" border height="360">
                        <el-table-column align="center" label="序号" width="50">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.pkid" v-show="false"></el-input>
                                <label>{{ scope.$index+1 }}</label>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="员工号" width="70">
                            <template slot-scope="scope">
                                <!-- <el-input size="mini" v-model="scope.row.id" :disabled="Object.is(type,'view')"></el-input> -->
                                <label>{{ scope.row.doUserNo }}</label>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="姓名" width="80">
                            <template slot-scope="scope">
                                <!-- <el-input size="mini" v-model="scope.row.name" :disabled="Object.is(type,'view')"></el-input> -->
                                <label>{{ scope.row.doFullName }}</label>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="部门" width="80">
                            <template slot-scope="scope">
                                <!-- <el-input size="mini" v-model="scope.row.groupName" :disabled="Object.is(type,'view')"></el-input> -->
                                <label>{{ scope.row.groupName }}</label>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" min-width="40">
                            <template slot-scope="scope">
                                <el-button :disabled="Object.is(type,'view')" size="mini" type="danger" @click="handleDelete_evaluate(scope.$index, scope.row)" icon="el-icon-delete" title="删除"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
               </div>
           </div>
            <div id="toolbar" class="toolbar" slot="footer" v-show="!Object.is(type,'view')">
               <!-- <el-button ref="saveButton" type="primary" @click="saveData">保存</el-button> -->
               <el-button @click="nextStep('form')" type="primary">下一步</el-button>
               <el-button @click="close" icon="el-icon-close">取消</el-button>
            </div>
            <select-depart ref="depart" :callback=departDialogCallback></select-depart>
            <select-user ref="user" :callback=userDialogCallback></select-user>
        </el-dialog>
    </div>
</template>
<script>
// 请求后端接口的方法
import { get,getCurrentEvaluate } from './evaluateClient.js'
// 这个是前端生成guid的方法，如果前端不生成guid，要在后端生成
import { guid } from '@/utils/common.js'
// 验证配置文件
import Rules from './validate.js'
import SelectDepart from '@/components/components/selectDepart/selectDepart'
import SelectUser from '@/components/components/selectUser/selectUser'
// 主表主键字段
const mainKey = "id";
export default {
    name:'evaluateClient',
    props:{// 其他组件传入的值
       
    },
    components:{
        SelectDepart,SelectUser
    },
    data:function(){// 自定义变量
        return {
            formRules:Rules,
            // 表单类型 add modify view
            type:'',
            mark:'',// 0 从表单进入 1 从列表进入
            // 主表主键值
            id:'',
            // 主表数据
            formData:{

            },
            // 明细数据
            formDataDetail_group:[],
            formDataDetail_index:[],
            formDataDetail_evaluate:[],
            // 明细删除的数据
            deleteDetailData_group:[],
            deleteDetailData_index:[],
            deleteDetailData_evaluate:[],
            // 弹出窗口宽度
            dialogWidth:"70%",
        }
    },
    methods:{// 自定义方法
        //关闭窗口返回的页面
        close(){
            if(Object.is(this.type,"add")){
                if(this.mark == 1){
                    this.$router.back();
                }else{
                    this.$router.push({name:"evaluateModelList"});
                }
                
            }else{
                this.$router.back();
            }
        },
        departDialogCallback(data){
            this.formDataDetail_group = [...this.formDataDetail_group,...data];
        },
        userDialogCallback(data){
            // 改变属性名
            let newData = [];
            data.forEach(({id:doUserNo,userName:doUserName,name:doFullName,departmentName:groupName}) => {
                newData.push({doUserNo,doUserName,doFullName,groupName,doType:'add'});
            });
            this.formDataDetail_evaluate = [...this.formDataDetail_evaluate,...newData];
        },
        async getData(){
            get(this.id).then((res) => {
                if(res.status == 200){
                    this.formData = res.data.main;
                    console.log(this.formData);
                    let groups = this.formData.doneFullName;
                    groups.split(',').forEach(val => {
                        this.formDataDetail_group.push(
                            {name:val}
                        );
                    });
                    let evaluateUsers = this.formData.doFullName;
                    evaluateUsers.split(',').forEach(val => {
                        this.formDataDetail_evaluate.push(
                            {name:val}
                        );
                    });
                    this.formDataDetail_index = res.data.headDetail;
                    this.formDataDetail_evaluate = res.data.listDetail;
                }
            });
        },
        // 添加行
        addDetailRow_group(){
            this.$refs.depart.open();
        },
        addDetailRow_index(){
            this.formDataDetail_index.push({doType:"add"});
        },
        addDetailRow_evaluate(){
            this.$refs.user.open();
        },
        // 删除行
        handleDelete_group(index,row){
            this.formDataDetail_group.splice(index, 1);
            if(Object.is(row.doType,'add')){
                return;
            }
            this.deleteDetailData_group.push(Object.assign(row,{doType:"delete"}));
        },
        // handleDelete_index(index,row){
        //     this.formDataDetail_index.splice(index, 1);
        //     this.deleteDetailData_index.push(Object.assign(row,{doType:"delete"}));
        // },
        handleDelete_evaluate(index,row){
            this.formDataDetail_evaluate.splice(index, 1);
            if(Object.is(row.doType,'add')){
                return;
            }
            this.deleteDetailData_evaluate.push(Object.assign(row,{doType:"delete"}));
        },
        // 下一步
        nextStep(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    if(this.formDataDetail_group.length>0 && this.formDataDetail_evaluate.length>0){
                        // 拼接部门
                        let doneFullNames = '';
                        this.formDataDetail_group.forEach(({name},index) => {
                            if(index != 0){
                                doneFullNames += `,`
                            }
                            doneFullNames += `${name}`;
                        });
                        // 拼接评价人
                        let doFullNames = '';
                        this.formDataDetail_evaluate.forEach(({doFullName},index) => {
                            if(index != 0){
                                doFullNames += `,`
                            }
                            doFullNames += `${doFullName}`;
                        });
                        this.formData = Object.assign(this.formData,{
                                                                        doFullName:doFullNames,
                                                                        doUserCount:this.formDataDetail_evaluate.length,
                                                                        doneFullName:doneFullNames,
                                                                        doneUserCount:this.formDataDetail_group.length,
                                                                        targetCount:this.formDataDetail_index.length
                                                                    });
                        // 合并评价人明细表
                        let newFormDataDetail_evaluate = [...this.formDataDetail_evaluate,...this.deleteDetailData_evaluate];
                        console.log(newFormDataDetail_evaluate);
                        let data = {
                            main:this.formData,
                            headDetail:this.formDataDetail_index,
                            listDetail:newFormDataDetail_evaluate
                        };
                        this.$store.commit("setData",{data,callback:this.$store.state.data.callback});
                        this.$router.push(
                            {
                                name:'evaluateClientView',
                                query:{
                                    useType:this.type,
                                }
                            }
                        );
                    }else{
                        this.$message({
                            message: `被评价部门和被评价人不能为空`,
                            type: 'warning'
                        });
                    }
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
    watch:{
        
    },
    created:function(){// 组件创建后
        // DOTO
        this.type = this.$route.query.useType;
        if(!Object.is(this.type,"add")){
            this.id = this.$route.query.id;
            this.getData();
        }else{
            this.mark = this.$route.query.mark;
            // 获取模板数据
            let data = this.$store.state.data.data;
            // 获取计划信息
            getCurrentEvaluate('内部顾客满意度测评').then((res) => {
                if(res.status == 200){
                    if(res.data != ""){
                        let {pkid:planPKID,evaluPlan:planName,evaluKind,emailDay} = res.data;
                        // let {targetPKID,targetName,TargetWeight} = data.detail;
                        data.detail.forEach(({targetPKID,targetName,targetWeight}) => {
                            this.formDataDetail_index.push({targetPKID,targetName,targetWeight,doType:'add'});
                        });
                        // this.formDataDetail_index = data.detail;
                        let {pkid:modelPKID,modelName} = data.main;
                        this.formData = Object.assign({modelPKID,modelName},{planPKID,planName,evaluKind,emailDay});
                    }else{
                        this.$message({
                            message: `没有开始的计划，请先添加计划`,
                            type: 'warning'
                        });
                        this.close();
                    }
                }
            });
        }
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
<style>
.evaluate-config{
    width: 100%;
    height: 400px;
    border: 1px solid #ccc;
    position: relative;
    text-align: center;
    background-color: #f0f8ff;
}
.area{
    height: 100%;
    display: inline-block;
}
.evaluate-config-left{
    width: 31%;
    position: absolute;
    left: 5px;
}
.evaluate-config-right{
    width: 34%;
    position: absolute;
    right: 5px;
}
.evaluate-config-center{
    width: 31%;
    margin-right: 30px;
}
</style>
