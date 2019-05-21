<template>
    <div id="evaluateClientSec">
        <el-dialog width='60%' :title="title" 
        :visible.sync="dialogFormVisible"
        :before-close="handleClose" :close-on-click-modal="false">
            <h4>{{StartYear}}——{{nowUserName}}</h4>
            <div class="blockDiv">
                <div>
                    <span>评价类别：</span> <em>{{EvaluKind}}</em>
                </div>
                <div>
                    <span>评价表名：</span> <em>{{EvaluateTname}}</em>
                </div>
                <div>
                    <span>开始时间：</span> <em>{{StartDate}}</em>
                </div>
            </div>
            
            <!-- <div class="bothDiv">
                <div id="ddiv">
                    <div class="leftDiv">
                        <span></span>
                        <span v-for="(item,index) in tableTarget" :key="index">{{item.targetName}}</span>
                    </div>
                    <div class="rightDiv">
                        <span v-for="(item,index) in tableHead" :key="index">
                            <em>{{item}}</em>
                            <span v-for="(itemSon,indexSon) in tableArr" :key="indexSon" class="selSpan">
                                <select v-model="tableArr[index]['target'+(indexSon+1)]">
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                </select>
                            </span>
                        </span>
                        
                    </div>
                </div>
            </div> -->
            <el-table border :data="tableTarget">
                <el-table-column v-for="(item,index) in tableArr" :key="index" :label="item.depart" :prop="'target'+(index+1)">
                    <template class="iiiii" slot-scope="scope">
                        <el-select :disabled="isDisabled" v-if="index != 0" v-model="tableArr[index]['target'+(scope.$index+1)]">
                            <el-option value="A">A</el-option>
                            <el-option value="B">B</el-option>
                            <el-option value="C">C</el-option>
                            <el-option value="D">D</el-option>
                            <el-option value="E">E</el-option>
                        </el-select>
                        <label class="labelBlue" @mouseover="hoverTitle(scope.$index)" v-else>{{ scope.row.targetName }}</label>
                    </template>
                </el-table-column>
            </el-table>
            <div class="rightBtnGroup">
                <el-button v-show="!isDisabled" type="primary" @click="submit">提交</el-button>
                <el-button v-show="!isDisabled" @click="temporaryStorage">暂存</el-button>
                <el-button type="info" @click="handleClose">关闭</el-button>
            </div>
            <h5>“A”对应100%，“B”对应85%，“C”对应70%，“D”对应65%，“E”对应50%</h5>
            <footer v-show="description!=''">
                <div>{{evaluKind}}</div>
                <div>{{description}}</div>
            </footer>
        </el-dialog>
    </div>
</template>

<script>
import {evaluateContent,saveFillContent,getFillContent,getConsignFillContent,getTargetItem,saveConsignFillContent} from './evaluateClientSecApi.js'
import {getLoginInfo} from '../../OnlineEvaluation/onlineEvaluation.js'
export default {
    name:'evaluateClientSec',
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        return {
            isDisabled:false,
            nowUserName:'',
            dialogFormVisible:true,
            title:'',
            EvaluKind:"",
            EvaluateTname:"",
            StartDate:"",
            tableTarget:[],
            tableHead:[],
            tableArr:[],
            // 指标信息
            evaluKind:'',
            description:'',
            targeDescripts:{}
        }
    },
    methods:{// 自定义方法
        handleClose(done) {
            this.$router.back();
        },
        // 参数提示
        hoverTitle(index){
            if(!this.targeDescripts[index]){
                getTargetItem(this.tableTarget[index].targetPKID).then((result) => {
                    this.description=result.data.description;
                    this.targeDescripts[index] = this.description;
                }).catch((err) => {
                    
                });
            }else{
                this.description = this.targeDescripts[index];
            }
            this.evaluKind=this.tableTarget[index].targetName
            
        },
        // 暂存
        temporaryStorage(){
            let data=[];
            for(let i=1;i<this.tableArr.length;i++){
                data.push(this.tableArr[i])
            }
            console.log(data);
            
            for(let i=0;i<data.length;i++){
                data[i].doneFullName=data[i].depart;
                data[i].doneUserNo=data[i].depart;
                data[i].evaluateId=this.$route.query.id;
                data[i].evaluateListPKID=this.$route.query.EvaluateListPKID;
                data[i].flag=0;
                data[i].submitState=1;
                if(this.$route.query.type==1){
                    data[i].inputerUserNo=this.$route.query.inputerUserNo;
                    data[i].state='save'
                }
            }
            
            if(this.$route.query.type==0){
                saveFillContent(data).then((result) => {
                    if(result.status==200){
                        this.$router.back();
                        this.$message({
                            message: '暂存成功!',
                            type: 'success'
                        });
                        this.$store.state.data.callback();
                    }else{
                        this.$message.error('暂存失败!');
                    }
                })
            }else{
                saveConsignFillContent(data).then((result) => {
                    if(result.status==200){
                        this.$router.back();
                        this.$message({
                            message: '暂存成功!',
                            type: 'success'
                        });
                        this.$store.state.data.callback();
                    }else{
                        this.$message.error('暂存失败!');
                    }
                })
            }
        },
        // 提交
        submit(){
            
            let data=[];
            for(let i=1;i<this.tableArr.length;i++){
                data.push(this.tableArr[i])
            }
            
            for(let i=0;i<data.length;i++){
                data[i].doneFullName=data[i].depart;
                data[i].doneUserNo=data[i].depart;
                data[i].evaluateId=this.$route.query.id;
                data[i].evaluateListPKID=this.$route.query.EvaluateListPKID;
                data[i].flag=0;
                data[i].submitState=0;
                if(this.$route.query.type==1){
                    data[i].inputerUserNo=this.$route.query.inputerUserNo;
                    data[i].state='finish'
                }
            }
            if(this.$route.query.type==0){
                saveFillContent(data).then((result) => {
                    if(result.status==200){
                        this.$router.back();
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.$store.state.data.callback();
                    }else{
                        this.$message.error('保存失败!');
                    }
                })
            }else{
                saveConsignFillContent(data).then((result) => {
                    if(result.status==200){
                        this.$router.back();
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.$store.state.data.callback();
                    }else{
                        this.$message.error('保存失败!');
                    }
                })
            }
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
        this.EvaluKind=this.$route.query.EvaluKind;
        this.EvaluateTname=this.$route.query.EvaluateTname;
        this.StartDate=this.$route.query.StartDate.substring(0,10);
        this.StartYear=this.$route.query.StartDate.substring(0,4);
        console.log(this.$route.query.inputerUserNo);
        console.log(this.$route.query.type);
        
        if(this.$route.query.state == 'add'){
            this.title='填写';
            if(this.$route.query.nowState=='save'){
                evaluateContent(this.$route.query.id).then((result) => {
                    
                    this.tableTarget=result.data.evaluateTargets;
                    this.tableHead=result.data.doneFullNames.split(',');
                    if(this.$route.query.type==1){                    
                        getConsignFillContent(this.$route.query.EvaluateListPKID).then((result) => {
                            this.tableArr.push({'depart':''})
                            for(let i=0;i<this.tableHead.length;i++){
                                let json={};
                                json["depart"] = this.tableHead[i];
                                for(let j=0;j<this.tableTarget.length;j++){
                                    if(result.data[i]['target'+(j+1)]){
                                        json['target'+(j+1)]=result.data[i]['target'+(j+1)];
                                    }
                                    if(result.data[i].pkid){
                                        json.pkid=result.data[i].pkid
                                    }
                                }
                                this.tableArr.push(json)
                            }
                            
                        })
                    }else{
                        getFillContent(this.$route.query.EvaluateListPKID).then((result) => {
                            console.log(result.data);
                            this.tableArr.push({'depart':''})
                            for(let i=0;i<this.tableHead.length;i++){
                                let json={};
                                json["depart"] = this.tableHead[i];
                                for(let j=0;j<this.tableTarget.length;j++){
                                    if(result.data[i]['target'+(j+1)]){
                                        json['target'+(j+1)]=result.data[i]['target'+(j+1)];
                                    }
                                    if(result.data[i].pkid){
                                        json.pkid=result.data[i].pkid
                                    }
                                }
                                this.tableArr.push(json)
                            }
                        })
                    }
                })
            }else{
                evaluateContent(this.$route.query.id).then((result) => {
                    this.tableTarget=result.data.evaluateTargets;
                    this.tableHead=result.data.doneFullNames.split(',');
                    this.tableArr.push({"depart":''});
                    for(let j=0;j<this.tableHead.length;j++){
                        let json = {};
                        json["depart"] = this.tableHead[j];
                        for(let i=0;i<this.tableTarget.length;i++){
                            json["target"+(i+1)] = "A";
                        }
                        this.tableArr.push(json)
                    }
                })
            }
        }else{
            this.title='查看';
            this.isDisabled=true;
            
            evaluateContent(this.$route.query.id).then((result) => {
                this.tableTarget=result.data.evaluateTargets;
                this.tableHead=result.data.doneFullNames.split(',');
                if(this.$route.query.type==1){                    
                    getConsignFillContent(this.$route.query.EvaluateListPKID).then((result) => {
                        this.tableArr.push({'depart':''})
                        for(let i=0;i<this.tableHead.length;i++){
                            let json={};
                            json["depart"] = this.tableHead[i];
                            for(let j=0;j<this.tableTarget.length;j++){
                                if(result.data[i]['target'+(j+1)]){
                                    json['target'+(j+1)]=result.data[i]['target'+(j+1)];
                                }
                            }
                            this.tableArr.push(json)
                        }
                        
                    })
                }else{
                    getFillContent(this.$route.query.EvaluateListPKID).then((result) => {
                        this.tableArr.push({'depart':''})
                        for(let i=0;i<this.tableHead.length;i++){
                            let json={};
                            json["depart"] = this.tableHead[i];
                            for(let j=0;j<this.tableTarget.length;j++){
                                if(result.data[i]['target'+(j+1)]){
                                    json['target'+(j+1)]=result.data[i]['target'+(j+1)];
                                }
                            }
                            this.tableArr.push(json)
                        }
                    })
                }
            })
             
        }
        
        this.nowUserName=getLoginInfo('inputerFullName');
        
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
    .blockDiv{
        display: flex;
        margin-bottom: 15px;
    }
    .blockDiv>div{
        margin-right: 40px;
    }
    .blockDiv em{
        font-style: normal;
    }
    .rightBtnGroup{
        margin: 0 auto;
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .rightBtnGroup>button{
        margin-right: 15px;
    }
    h5{
        text-align: center;
    }
    footer div{
        margin-right: 40px;
        margin-left: 40px;
        border: 1px solid #ddd;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    footer div:first-child{
        border-bottom: none;
    }
    h4{
        font-size: 18px;
        color: #409EFF;
    }
    .labelBlue{
        color: #409EFF;
    }
    /* .leftDiv{
        display: flex;
        flex-wrap: wrap;
        width: 80px;
        margin: 0;
        padding: 0;
    }
    .leftDiv span{
        display: block;
        border: 1px solid #eee;
    }
    .leftDiv span{
        height: 30px;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
    .leftDiv span:first-child{
        height: 50px;
    }
    .bothDiv{
        display: flex;
        font-size: 12px;
        justify-content: center;
    }
    .bothDiv>div{
        display: flex;
    }
    .rightDiv{
        display: flex;
    }
    .rightDiv>span{
        display: flex;
        width: 70px;
        flex-wrap: wrap;
        flex-direction: column;
    }
    .rightDiv em{
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        widows: 70px;
        height: 50px;
        font-style: normal;
        border: 1px solid #eee;
    }
    .rightDiv select{
        display: block;
    }
    .selSpan{
        display: flex;
        width: 70px;
        justify-content: center;
        align-items: center;
        height: 30px;
        border: 1px solid #eee;
    } */
</style>