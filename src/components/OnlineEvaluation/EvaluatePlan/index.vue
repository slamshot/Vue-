<template>
    <div id="evaluatePlanList" class="content-height">
        <z-table ref="table" :tableColumnConfig=tableColumnConfig :toolBarConfig=toolBarConfig
        :tableBaseConfig=tableBaseConfig></z-table>
        <router-view></router-view>
    </div>
</template>
<script>
import ZTable from '../../zTable'
import DefaultButtons from '../../zTable/zTable.js'
import SearchPage from './search'
import {getList,deleted,complete} from './evaluatePlan.js'
import { formatDate } from '@/utils/common.js'
import { planStates } from '../onlineEvaluation.js'

// 表单的路由路径
const pageUrl = '/evaluatePlan'
// 路由的名称
const routerName = 'evaluatePlan'
// 主键字段
const key = 'pkid'
export default {
    name:'evaluatePlanList',
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
                // 默认排序
                currentSort:[{prop: 'pkid', order: 'descending'}]
            },
            // 列表配置
            tableColumnConfig:[
                {
                    id:"evaluKind",
                    text:"评价类别",
                    align:"center",
                    width:120,
                    sortable:true
                },
                {
                    id:"evaluPlan",
                    text:"计划名称",
                    align:"center",
                    width:200,
                    sortable:true
                },
                {
                    id:"startDate",
                    text:"开始时间",
                    align:"center",
                    width:100,
                    sortable:true,
                    formatter:function(row,column){
                        return formatDate(row.startDate);
                    }
                },
                {
                    id:"endDate",
                    text:"结束时间",
                    align:"center",
                    width:100,
                    sortable:true,
                    formatter:function(row,column){
                        return formatDate(row.endDate);
                    }
                },
                {
                    id:"alertDay",
                    text:"预警提前期",
                    align:"center",
                    width:80,
                    sortable:true
                },
                {
                    id:"inputerFullName",
                    text:"编制人",
                    align:"center",
                    width:80,
                    sortable:true
                },
                {
                    id:"flag",
                    text:"状态",
                    align:"center",
                    width:60,
                    sortable:true,
                    formatter:function(row,column){
                        return planStates[row.flag];
                    }
                }
            ],
            // 工具栏配置
            toolBarConfig:{
                // 列表上方按钮
                top:[
                    {
                        id:"default_add", // 编号
                        text:"添加", // 按钮名称
                        icon:"el-icon-plus", // 按钮图标
                        style:'background: #70d5e9;border-color: #70d5e9;color: #fff;',
                        click:() => { // 点击事件
                            this.addButtonClick();
                        }
                    },{
                        id:"completionPlan",
                        text:"完成计划",
                        style:'background: #70d5e9;border-color: #70d5e9;color: #fff;',
                        icon:"el-icon-success",
                        click:() => {
                            complete(this.selectedPkid).then((res) => {
                                if(res.status == 200){
                                    this.$refs.table.refresh();
                                }
                            });
                        }
                    },{
                        id:"refresh",
                        text:"刷新",
                        style:'background: #70d5e9;border-color: #70d5e9;color: #fff;',
                        icon:"el-icon-refresh",
                        click:(row) => {
                            this.$refs.table.refresh();
                        }
                    }
                ],
                // 列表行内按钮
                eachRow:{
                    // 默认显示
                    default:[
                        {
                            id:"default_modify",
                            text:"修改",
                            icon:"el-icon-edit",
                            click:(row) => {
                                this.modifyButtonClick(row[key]);
                            }
                        }
                    ],
                    // 下拉显示
                    dropdown:[
                        {
                            id:"default_delete",
                            text:"删除",
                            icon:"el-icon-delete",
                            click:(row) => {
                                this.deleteButtonClick(row[key],row.flag);
                            }
                        },
                        {
                            id:"default_view",
                            text:"浏览",
                            icon:"el-icon-view",
                            click:(row) => {
                                this.viewButtonClick(row[key]);
                            }
                        }
                    ]
                }
            },
            selectedPkid:''
        }
    },
    methods:{// 自定义方法
        /**
         * 添加按钮点击事件
         * pageUrl：页面的路由路径
         * routerName：路由名称
         * dialogWidth；窗口宽度
         */
        addButtonClick(id){
            this.$store.commit("setData",{callback:this.dialogCallback})
            DefaultButtons.addButton(pageUrl,routerName);
        },
        /**
         * 修改按钮点击事件
         * pageUrl：页面的路由路径
         * routerName：路由名称
         * dialogWidth；窗口宽度
         */
        modifyButtonClick(id){
            DefaultButtons.modifyButton(pageUrl,routerName,id,this.dialogCallback);
        },
        /**
         * 浏览按钮点击事件
         * pageUrl：页面的路由路径
         * routerName：路由名称
         * dialogWidth；窗口宽度
         */
        viewButtonClick(id){
            DefaultButtons.viewButton(pageUrl,routerName,id);
        },
        // 删除按钮点击事件
        deleteButtonClick(id,flag){
            if(flag == 0){
                this.$confirm('确定删除？').then((res) => {
                    deleted(id).then((res) => {
                        if(res.status == 200){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.$refs.table.refresh();
                        }
                    });
                }).catch((err) => {
                        
                });
            }else{
                this.$message({
                    message: '计划已经开始，不能删除计划',
                    type: 'warning'
                });
            }
            
        },
        // 弹出框回调函数
        dialogCallback(data){
            this.$refs.table.refresh();
        },
        /**
         * 行选中事件:单选时触发
         * currentRow:当前行 oldCurrentRow:上一次选中的行
         */
        rowSelected(currentRow,oldCurrentRow){
            this.selectedPkid = currentRow[key];
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
        // 请求列表数据之前
        beforeGetListData(currentPage,pageSize,order,filters){
            
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
