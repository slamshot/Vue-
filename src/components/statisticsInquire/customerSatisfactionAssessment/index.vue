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
            <el-radio-group @change="yearChange" v-model="year" style="margin-right:30px;">
                <el-radio label="1">单选年度</el-radio>
                <el-radio label="2">连续年度</el-radio>
            </el-radio-group>
            <span style="margin-right:20px;">年度</span>
            <el-select @change="startYearChange" v-model="startYear" placeholder="请选择">
                <el-option
                v-for="item in yearShowData"
                :key="item.pkid"
                :label="item.evaluPlan"
                :value="item.pkid">
                </el-option>
            </el-select>
            <span style="margin-right:10px;margin-left:10px;">至</span>
            <el-select @change="endYearChange" v-model="endYear" :disabled="year==1" placeholder="请选择">
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
                <span>评价表：</span>
                <el-select v-model="evaluationForm" placeholder="请选择">
                    <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option> -->
                </el-select>
            </div>
            <div>
                <span>指标类型：</span>
                <el-select v-model="evaluKind" placeholder="请选择">
                    <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option> -->
                </el-select>
            </div>
            <div>
                <span>具体指标：</span>
                <el-select v-model="specificTarget" placeholder="请选择">
                    <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option> -->
                </el-select>
            </div>
        </div>
        <footer>
            <el-button @click="confirm" type="primary">确定</el-button>
            <el-button @click="clear">清空</el-button>
        </footer>
    </div>
</template>

<script>
import {gets,getByYear,exportExcel} from './customerSatisfactionAssessment.js'
import {getLoginInfo} from '../../OnlineEvaluation/onlineEvaluation.js'
export default {
    name:'customerSatisfactionAssessment',
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        return {
            // 显示数据
            yearShowData:[],
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
            specificTarget:''
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
                    }).catch((err) => {
                        
                    });
                }else{
                    this.$message({
                        message: '请选择初始年度选项!',
                        type: 'warning'
                    });
                }
            }
            console.log(111);
            
        },
        // 初始年度变化
        startYearChange(){
            if(this.year==1){
                let data={};
                data.planPKID=this.startYear;
                console.log(data);
                
                getByYear(data).then((result) => {
                    console.log(result.data)
                }).catch((err) => {
                    
                });
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
                    data.yearRange=yearArr.join('-');
                    console.log(data);
                    getByYear(data).then((result) => {
                        console.log(result.data)
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
                data.yearRange=yearArr.join('-');
                console.log(data);
                getByYear(data).then((result) => {
                    console.log(result.data)
                })
            }
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
            if(this.evaluKind==''){
                this.$message({
                    message: '请选择指标类型!',
                    type: 'warning'
                });
                return false;
            }
            if(this.specificTarget==''){
                this.$message({
                    message: '请选择具体指标!',
                    type: 'warning'
                });
                return false;
            }
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
        width: 950px;
    }
    .exportedDataFormat>span{
        font-size: 14px;
        line-height: -1px;
    }
    .year{
        display: flex;
        height: 50px;
        width: 950px;
        align-items: center;
    }
    .year>span{
        font-size: 14px;
        display: block;
        /* line-height: 13px; */
    }
    .lastDiv>div{
        margin-right: 20px;
    }
    .lastDiv{
        display: flex;
        align-items: center;
        height: 50px;
        width: 950px;
        margin-top: 10px;
    }
    .lastDiv>div>span{
        font-size: 14px;
    }
    footer{
        display: flex;
        justify-content: center;
        height: 50px;
        width: 900px;
        align-items: center;
        margin-top: 10px;
    }
    footer button{
        margin-right: 20px;
    }
</style>