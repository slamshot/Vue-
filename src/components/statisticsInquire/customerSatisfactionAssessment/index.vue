<template>
    <div id="customerSatisfactionAssessment">
        <div class="exportedDataFormat">
            <span>导出的数据格式：</span>
            <el-radio-group v-model="exportedDataFormat">
                <el-radio label="1">基本数据</el-radio>
                <el-radio label="2">总分统计</el-radio>
                <el-radio label="3">单项指标统计表</el-radio>
                <el-radio label="4">统计图</el-radio>
            </el-radio-group>
        </div>
        <div class="year">
            <span>年度：</span>
            <el-radio-group class="yearRadioGroup" @change="yearChange" v-model="year">
                <el-radio label="1">单选年度</el-radio>
                <el-radio label="2">连续年度</el-radio>
            </el-radio-group>
            <el-select @change="startYearChange" v-model="startYear" placeholder="请选择初始年度">
                <el-option
                v-for="item in yearShowData"
                :key="item.pkid"
                :label="item.evaluPlan"
                :value="item.pkid">
                </el-option>
            </el-select>
            <span style="margin-right:10px;margin-left:10px;width:10px;">至</span>
            <el-select @change="endYearChange" v-model="endYear" :disabled="year==1" placeholder="请选择结束年度">
                <el-option
                v-for="item in yearShowData"
                :key="item.pkid"
                :label="item.evaluPlan"
                :value="item.pkid">
                </el-option>
            </el-select>
        </div>
        <div class="lastDiv">
            <div>
                <el-select v-model="evaluationForm" placeholder="评价表">
                    <el-option
                    v-for="item in evaluationFormSel"
                    :key="item.evaluateId"
                    :label="item.evaluateTname"
                    :value="item.evaluateId">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-select :disabled="exportedDataFormat!=3" @change="getTarget" v-model="evaluKind" placeholder="指标类型">
                    <el-option
                    v-for="item in indicatorTypeSel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-select :disabled="exportedDataFormat!=3" v-model="specificTarget" placeholder="具体指标">
                    <el-option
                    v-for="(item,index) in specificIndicatorsSel"
                    :key="index"
                    :label="item.targetName"
                    :value="index+1">
                    </el-option>
                </el-select>
            </div>
        </div>
        <footer>
            <el-button @click="confirm" type="primary">确定</el-button>
            <el-button @click="clear">清空</el-button>
        </footer>
        <iframe :src="srcUrl" frameborder="0" style="width:100%;height:500px;"></iframe>
    </div>
</template>

<script>
import {gets,getByYear,getByEvaluKind,exportExcel} from './customerSatisfactionAssessment.js'
import {getLoginInfo} from '../../OnlineEvaluation/onlineEvaluation.js'

const reportBaseUrl = 'http://10.214.92.37:8075/WebReport/ReportServer?'
export default {
    name:'customerSatisfactionAssessment',
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        return {
            // 显示数据
            yearShowData:[],
            evaluationFormSel:[],
            indicatorTypeSel:[
                {
                    label:'员工达优测评',
                    value:'员工达优测评'
                },
                {
                    label:'内部顾客满意度测评',
                    value:'内部顾客满意度测评'
                },
            ],
            specificIndicatorsSel:[],
            // 导出的数据格式
            exportedDataFormat:'1',
            year:'1',
            startYear:'',
            endYear:'',
            // 评价表
            evaluationForm:'',
            // 指标类型
            evaluKind:'',
            // 具体指标
            specificTarget:'',
            // 链接
            evaluateIds:'1',
            srcUrl:'',
            // srcUrl:`http://10.214.93.90:8075/WebReport/ReportServer?reportlet=vue%2FBasicData.cpt&__bypagesize__=false&evaluateIds=${evaluateIds}`,
        }
    },
    methods:{// 自定义方法
        // 年度选择变化
        yearChange(){
            if(this.year==1){
                this.endYear='';
                if(this.startYear!=''){
                    let data={};
                    data.planPKID=this.startYear;
                    getByYear(data).then((result) => {
                        console.log(result.data)
                        this.evaluationFormSel=result.data;
                    })
                }else{
                    this.$message({
                        message: '请选择初始年度选项!',
                        type: 'warning'
                    });
                }
            }else{
                if(this.startYear==""){
                    this.$message({
                        message: '请选择初始年度选项!',
                        type: 'warning'
                    });
                }else{
                    this.$message({
                        message: '请选择结束年度选项!',
                        type: 'warning'
                    });
                }
            }
            
        },
        // 初始年度变化
        startYearChange(){
            if(this.year==1){
                let data={};
                data.planPKID=this.startYear;
                console.log(data);
                
                getByYear(data).then((result) => {
                    console.log(result.data)
                    this.evaluationFormSel=result.data;
                })
            }else{
                if(this.endYear==''){
                    this.$message({
                        message: '请选择结束年度选项!',
                        type: 'warning'
                    });
                }else{
                    let data={};
                    let yearArr=[]
                    for(let i=0;i<this.yearShowData.length;i++){
                        if(this.yearShowData[i].pkid==this.startYear){
                            yearArr.push(this.yearShowData[i].inputDate);
                            break;
                        }
                    }
                    for(let i=0;i<this.yearShowData.length;i++){
                        if(this.yearShowData[i].pkid==this.endYear){
                            yearArr.push(this.yearShowData[i].inputDate);
                        }
                    }
                    data.yearRange=yearArr.join(',');
                    console.log(data);
                    getByYear(data).then((result) => {
                        console.log(result.data)
                        this.evaluationFormSel=result.data;
                    })
                }
            }
        },
        // 结束年度变化
        endYearChange(){
            if(this.startYear==''){
                this.$message({
                    message: '请选择初始年度选项!',
                    type: 'warning'
                });
            }else{
                let data={};
                let yearArr=[]
                for(let i=0;i<this.yearShowData.length;i++){
                    if(this.yearShowData[i].pkid==this.startYear){
                        yearArr.push(this.yearShowData[i].inputDate);
                        break;
                    }
                }
                for(let i=0;i<this.yearShowData.length;i++){
                    if(this.yearShowData[i].pkid==this.endYear){
                        yearArr.push(this.yearShowData[i].inputDate);
                    }
                }
                data.yearRange=yearArr.join(',');
                console.log(data);
                getByYear(data).then((result) => {
                    console.log(result.data)
                    this.evaluationFormSel=result.data;
                })
            }
        },
        // 指标类型变化
        getTarget(){
            getByEvaluKind(this.evaluKind).then((result) => {
                console.log(result);
                this.specificIndicatorsSel=result.data;
            })
        },
        // 确定
        confirm(){
            
            if(this.startYear==''){
                this.$message({
                    message: '请选择初始年度选项!',
                    type: 'warning'
                });
                return false;
            }
            if(this.year==2 && this.endYear==''){
                this.$message({
                    message: '请选择结束年度选项!',
                    type: 'warning'
                });
                return false;
            }
            if(this.evaluationForm==''){
                this.$message({
                    message: '请选择评价表!',
                    type: 'warning'
                });
                return false;
            }
            
            if(this.evaluKind=='' && this.exportedDataFormat==3){
                this.$message({
                    message: '请选择指标类型!',
                    type: 'warning'
                });
                return false;
            }
            if(this.specificTarget=='' && this.exportedDataFormat==3){
                this.$message({
                    message: '请选择具体指标!',
                    type: 'warning'
                });
                return false;
            }
        
            let evaluateIdsArr=[];
            let evaluateIdsStr='';
            let taskId='';

            evaluateIdsArr=this.evaluationForm.split(',');
            for(let i=0;i<evaluateIdsArr.length;i++){
                evaluateIdsStr+="'"+evaluateIdsArr[i]+"',"
            }
            evaluateIdsStr=evaluateIdsStr.substring(0,evaluateIdsStr.length-1);

            console.log(this.evaluationForm);
            
            for(let i=0;i<this.evaluationFormSel.length;i++){
                if(this.evaluationForm==this.evaluationFormSel[i].evaluateId){
                    console.log('=====');
                    
                    taskId=this.evaluationFormSel[i].taskId;
                    break;
                }
            }
            
            console.log(evaluateIdsStr);
            console.log(taskId);
            

            switch (this.exportedDataFormat){
                case '1':
                    this.srcUrl=`${reportBaseUrl}reportlet=vue%2FBasicData.cpt&__bypagesize__=false&evaluateIds=${evaluateIdsStr}`
                    break;
                case '2':
                    this.srcUrl=`${reportBaseUrl}reportlet=vue%2FTotalScoreTable.cpt&evaluateIds=`+evaluateIdsStr
                    break;
                case '3':
                    this.srcUrl=`${reportBaseUrl}reportlet=vue%2FSingleTargetTable.cpt&evaluateIds=${evaluateIdsStr}&targetIndex${this.specificTarget}`
                    break;
                case '4':
                    this.srcUrl=`${reportBaseUrl}reportlet=vue%2FChart.cpt&taskIds=${taskId}`
                    break;
            }
            console.log(this.srcUrl);
            
        },
        // 清空
        clear(){
            this.startYear='';
            this.endYear='';
            this.evaluationForm='';
            this.evaluKind='';
            this.specificTarget='';
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
        gets().then((result) => {
            this.yearShowData=result.data.content
            console.log(this.yearShowData);
            
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
    #customerSatisfactionAssessment{
        padding: 30px;
    }
    .exportedDataFormat{
        display: flex;
        align-items: center;
        height: 50px;
        width: 690px;
        justify-content: space-between;
    }
    .exportedDataFormat>div{
        width: 552px;
        display: flex;
        justify-content: space-between;
    }
    .exportedDataFormat>span{
        font-size: 14px;
        line-height: -1px;
    }
    .year{
        display: flex;
        height: 50px;
        align-items: center;
    }
    .yearRadioGroup{
        display: flex;
        justify-content: space-between;
        width: 229px;
        margin-right: 68px;
    }
    .year>span{
        font-size: 14px;
        display: block;
        display: inline-block;
        width: 113px;
        text-align: right;
        margin-right: 25px;
    }
    .lastDiv>div:first-child{
        margin-right: 78px;
    }
    .lastDiv>div:nth-child(2){
        margin-right: 30px;
    }
    .lastDiv{
        display: flex;
        align-items: center;
        height: 50px;
        margin-top: 10px;
        padding-left: 140px;
    }
    .lastDiv>div>span{
        font-size: 14px;
    }
    footer{
        display: flex;
        padding-left: 140px;
        height: 50px;
        align-items: center;
        margin-top: 20px;
    }
    footer button{
        margin-right: 40px !important;
    }
</style>