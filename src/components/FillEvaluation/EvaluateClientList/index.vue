<template>
    <div id="evaluateClientUser" class="content-height">
        <z-table ref="table" :tableColumnConfig='tableColumnConfig' :toolBarConfig='toolBarConfig'
        :tableBaseConfig='tableBaseConfig'></z-table>
        <router-view></router-view>
    </div>
</template>
<script>
import ZTable from '../../zTable'
import SearchPage from './search'
import {getList,deleted} from './evaluateClientList.js'
import { formatDate } from '@/utils/common.js'

// 路由的名称
const routerName = 'evaluateClientList'
// 主键字段
const key = 'pkid'
export default {
    name:'evaluateClientUser',
    components:{
        ZTable
    },
    props:{// 其他组件传入的值
       
    },
    provide:function(){
       return {
            "rowSelected":this.rowSelected,
            "rowsSelected":this.rowsSelected,
            "rowsSelectedAll":this.rowsSelectedAll,
            "getList":getList,
            "SearchPage":SearchPage,
            "beforeGetListData":this.beforeGetListData
       }
    },
    data:function(){// 自定义变量
        return {
            // 列表的其他配置
            tableBaseConfig:{
                tableHeight:'calc(100% - 120px)',
            },
            // 列表配置
            tableColumnConfig:[
                {
                    id:"EvaluateTname",
                    text:"评价表名称",
                    align:"center",
                    width:150,
                    sortable:true
                },
                {
                    id:"PlanName",
                    text:"评价计划",
                    align:"center",
                    width:150,
                    sortable:true
                },
                {
                    id:"EvaluKind",
                    text:"评价类别",
                    align:"center",
                    width:150,
                    sortable:true
                },
                {
                    id:"LevelType",
                    text:"评价方式",
                    align:"center",
                    width:120,
                    sortable:true
                },
                {
                    id:"InputDate",
                    text:"开始时间",
                    align:"center",
                    width:80,
                    sortable:true,
                    formatter:function(row,column){
                        return formatDate(row.InputDate);
                    }
                },
                {
                    id:"FinishDate",
                    text:"结束时间",
                    align:"center",
                    width:80,
                    sortable:true,
                    formatter:function(row,column){
                        if(row.FinishDate != null){
                            return formatDate(row.FinishDate);
                        }
                    }
                },
                {
                    id:"State",
                    text:"状态",
                    align:"center",
                    width:60,
                    sortable:true,
                    formatter:function(row,column){
                        if(row.State=='start'){
                            return '待填'
                        }else if(row.State=='finish'){
                            return  '完成'
                        }else if(row.State=='save'){
                            return '暂存'
                        }else{
                            return '委托'
                        }
                    }
                },
            ],
            // 工具栏配置
            toolBarConfig:{
                // 列表上方按钮
                top:[
                ],
                // 列表行内按钮
                eachRow:{
                    // 默认显示
                    default:[
                        {
                            id:"fill",
                            text:"填写",
                            icon:"el-icon-edit",
                            // disabled:!row.state=='start',
                            click:(row) => {
                                console.log(row);
                                if(row.State=='finish' || row.State=='consign'){
                                    this.$message({
                                        message: '根据该条目状态判定不可填写',
                                        type: 'warning'
                                    });
                                }else{
                                    this.$store.commit("setData",{callback:this.dialogCallback})
                                    this.$router.push(
                                        {
                                            name:'evaluateClientSec',
                                            query:{
                                                EvaluKind:row.EvaluKind,
                                                EvaluateTname:row.EvaluateTname,
                                                StartDate:row.InputDate,
                                                state:'add',
                                                nowState:row.State,
                                                id:row.EvaluateId,
                                                EvaluateListPKID:row.EvaluateListPKID,
                                                type:row.type,
                                                inputerUserNo:this.$route.query.doUserNo
                                            }
                                        }
                                    ); 
                                }
                            }
                        },
                        {
                            id:"consign",
                            text:"委托",
                            icon:"el-icon-caret-right",
                            click:(row) => {
                                this.$store.commit("setData",{callback:this.dialogCallback})
                                // this.viewButtonClick(row[key],row.state);
                                console.log(row);
                                
                                if(row.type==1 || row.State=='finish' || row.State=='consign'){
                                    this.$message({
                                        message: '根据该条目状态判定不可委托',
                                        type: 'warning'
                                    });
                                }else{
                                    this.$router.push({name:'evaluateConsign',query:{PlanName:row.PlanName,EvaluateId:row.EvaluateId,EvaluateListPKID:row.EvaluateListPKID}}); 
                                }
                            }
                        },
                        {
                            id:"view",
                            text:"查看",
                            icon:"el-icon-view",
                            click:(row) => {
                                console.log(row);
                                if(row.State=='finish' || row.State=='save'){
                                    this.$router.push(
                                        {
                                            name:'evaluateClientSec',
                                            query:{
                                                EvaluKind:row.EvaluKind,
                                                EvaluateTname:row.EvaluateTname,
                                                StartDate:row.InputDate,
                                                state:'look',
                                                id:row.EvaluateId,
                                                EvaluateListPKID:row.EvaluateListPKID,
                                                type:row.type,
                                            }
                                        }
                                    ); 
                                }else{
                                    this.$message({
                                        message: '根据该条目状态未完成，不能查看',
                                        type: 'warning'
                                    });
                                }
                            }
                        }
                    ],
                    // 下拉显示
                    dropdown:[
                        
                    ]
                }
            },
            doUserNo:'',
        }
    },
    methods:{// 自定义方法
        
        viewButtonClick(id,state){
           
        },
        /**
         * 行选中事件:单选时触发
         * currentRow:当前行 oldCurrentRow:上一次选中的行
         */
        rowSelected(currentRow,oldCurrentRow){
            
        },
        /**
         * 行选中事件:多选时触发
         * rows：选中的所有行
         */
        rowsSelected(rows){
            
        },
        /**
         * 点击全选的checkbox触发
         * rows：选中的所有行
         */
        rowsSelectedAll(rows){
            
        },
        // 弹出框回调函数
        dialogCallback(data){
            this.$refs.table.refresh();
        },
        // 请求列表数据之前
        beforeGetListData(currentPage,pageSize,order,filters){
            if(filters){
                filters = Object.assign(filters,{doUserNo:this.doUserNo});
            }else{
                filters = {doUserNo:this.doUserNo};
            }
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
    watch: {
        // 监听路由变化
        $route(to,from){
            
        }
    },
    created:function(){// 组件创建后
        this.doUserNo = this.$route.query.doUserNo;
    },
    mounted:function(){// 组件加载完成
        // DOTO
    },
    beforeUpdate:function(){// 组件数据更新之前
        // DOTO
    },
    updated:function(){// 组件数据更新之后
        // DOTO
    }
}
</script>

<style>

</style>
