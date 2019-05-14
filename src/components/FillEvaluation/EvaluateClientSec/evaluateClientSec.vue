<template>
    <div id="evaluateClientSec">
        <el-dialog title="填写" 
        :visible.sync="dialogFormVisible"
        :before-close="handleClose">
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
            <el-table :data="tableTarget">
                <el-table-column v-for="(item,index) in tableArr" :key="index" :label="item.depart" :prop="'target'+(index+1)">
                    <template slot-scope="scope">
                        <el-select v-if="index != 0" v-model="scope.row['target'+(index+1)]">
                            <el-option value="A">A</el-option>
                            <el-option value="B">B</el-option>
                            <el-option value="C">C</el-option>
                            <el-option value="D">D</el-option>
                        </el-select>
                        <label v-else>{{ scope.row.targetName }}</label>
                    </template>
                </el-table-column>
            </el-table>
            <div class="rightBtnGroup">
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="temporaryStorage">暂存</el-button>
                <el-button type="info" @click="handleClose">关闭</el-button>
            </div>
            <h5>“A”对应100%，“B”对应85%，“C”对应70%，“D”对应65%，“E”对应50%，</h5>
            <footer>
                <div></div>
                <div></div>
            </footer>
        </el-dialog>
    </div>
</template>

<script>
import {evaluateContent,saveFillContent} from './evaluateClientSecApi.js'
import {getLoginInfo} from '../../OnlineEvaluation/onlineEvaluation.js'
export default {
    name:'evaluateClientSec',
    props:{// 其他组件传入的值
       
    },
    data:function(){// 自定义变量
        return {
            nowUserName:'',
            dialogFormVisible:true,
            title:'',
            EvaluKind:"",
            EvaluateTname:"",
            StartDate:"",
            tableTarget:[],
            tableHead:[],
            tableArr:[],
            tableData:[]
        }
    },
    methods:{// 自定义方法
        handleClose(done) {
            this.$router.back();
        },
        // 暂存
        temporaryStorage(){

        },
        // 提交
        submit(){
            console.log(this.tableArr);
            
            // for(let i=0;i<this.tableArr.length;i++){
            //     this.tableArr[i].doneFullName=this.tableArr[i].depart;
            //     this.tableArr[i].doneUserNo=this.tableArr[i].depart;
            //     this.tableArr[i].evaluateId=this.$route.query.id;
            //     this.tableArr[i].evaluateListPKID=this.$route.query.EvaluateListPKID;
            //     this.tableArr[i].flag=0;
            // }
            
            // saveFillContent(this.tableArr).then((result) => {
            //     this.$router.push({name:'fillEvaluation'})
            // }).catch((err) => {
                
            // });
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
        if(this.$route.query.state == 'add'){
            this.title='填写';
        }else{
            this.title='查看';
        }
        this.EvaluKind=this.$route.query.EvaluKind;
        this.EvaluateTname=this.$route.query.EvaluateTname;
        this.StartDate=this.$route.query.StartDate.substring(0,10);
        this.StartYear=this.$route.query.StartDate.substring(0,4);
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
                console.log(tableTarget);
                console.log(tableHead);
                console.log(tableArr);
        }).catch((err) => {
            
        });;
        
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
        justify-content: space-around;
    }
    .blockDiv em{
        font-style: normal;
    }
    .rightBtnGroup{
        width: 200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
    h5{
        text-align: center;
    }
    .leftDiv{
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
    }
</style>