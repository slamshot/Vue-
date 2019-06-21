<template>
    <div id="customerSatisfactionList" class="content-height">
        <z-table ref="table" :tableColumnConfig='tableColumnConfig' :toolBarConfig='toolBarConfig'
        :tableBaseConfig='tableBaseConfig'></z-table>
        <router-view></router-view>
    </div>
</template>
<script>
import ZTable from '../../zTable'
import SearchPage from './search'
import {getList,deleted,discard} from './customerSatisfactionList'
import { formatDate } from '@/utils/common.js'

// 表单的路由路径
// const pageUrl = '/evaluateClientList'
// // 路由的名称
// const routerName = 'evaluateClientList'
// 主键字段
const key = 'pkid'
export default {
    name:'customerSatisfactionList',
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
            // 单选当前行
            nowrow:{},
            // 列表的其他配置
            tableBaseConfig:{
                // selectModel:"Multi",
                tableHeight:'calc(100% - 120px)',
                // 默认排序
                currentSort:[{prop: 'evaluateTname', order: 'descending'}]
            },
            // 列表配置
            tableColumnConfig:[
                {
                    id:"evaluateTname",
                    text:"评价表名称",
                    align:"center",
                    width:150,
                    sortable:true
                },
                {
                    id:"planName",
                    text:"评价计划",
                    align:"center",
                    width:150,
                    sortable:true
                },
                {
                    id:"inputDate",
                    text:"制表时间",
                    align:"center",
                    width:150,
                    sortable:true,
                    formatter:function(row,column){
                        return formatDate(row.inputDate);
                    }
                },
                {
                    id:"doUserCount",
                    text:"评价人数",
                    align:"center",
                    width:120,
                    sortable:true
                },
                {
                    id:"doneUserCount",
                    text:"被评价部门数",
                    align:"center",
                    width:80,
                    sortable:true
                },
                {
                    id:"state",
                    text:"状态",
                    align:"center",
                    width:60,
                    sortable:true,
                    formatter:function(row,column){
                        let state = row.state
                        if(state == 'discard'){
                          state = '废弃'
                        }else if(state == 'start'){
                          state = '分发'
                        }else if(state == 'finish'){
                          state = '完成'
                        }
                        return state;
                    }
                },
            ],
            // 工具栏配置
            toolBarConfig:{
                // 列表上方按钮
                top:[
                    {
                        id:"refresh",
                        text:"废止当前计划",
                        icon:"el-icon-s-promotion",
                        style:'background: #70d5e9;border-color: #70d5e9;color: #fff;',
                        click:() => {
                            console.log(this.nowrow.id);
                            if(!this.nowrow.id){
                                this.$message({
                                    message: '请单击列表选择所要废弃的条目！',
                                    type: 'warning'
                                });
                            }else{
                                this.$confirm('此操作将废止计划, 是否继续?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    discard(this.nowrow.id).then((result) => {
                                        if(result.status==200){
                                            this.$message({
                                                type: 'success',
                                                message: '废止成功!'
                                            });
                                            this.$refs.table.refresh();
                                        }else{
                                            this.$message.error('废止失败!');
                                        }
                                    })
                                }).catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '已取消废止'
                                    });          
                                });
                            }
                        }
                    }
                ],
                // 列表行内按钮
                eachRow:{
                    // 默认显示
                    default:[
                        {
                            id:"fill",
                            text:"删除",
                            icon:"el-icon-delete-solid",
                            // disabled:!row.state=='start',
                            click:(row) => {
                                console.log(row);
                                if(row.state!='完成'){
                                    this.$confirm('是否删除, 是否继续?', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        deleted(row.id).then((result) => {
                                            if(result.status==200){
                                                this.$message({
                                                    type: 'success',
                                                    message: '删除成功!'
                                                });
                                                this.$refs.table.refresh();
                                            }else{
                                                this.$message.error('删除失败!');
                                            }
                                        })
                                    }).catch(() => {
                                        this.$message({
                                            type: 'info',
                                            message: '已取消删除'
                                        });          
                                    });
                                }else{
                                    this.$message({
                                        message: '已完成，不可删除!',
                                        type: 'warning'
                                    });
                                }
                            }
                        },
                        {
                            id:"view",
                            text:"查看",
                            icon:"el-icon-view",
                            click:(row) => {
                                this.$store.commit("setData",{callback:this.dialogCallback})
                                console.log(row);
                                this.$router.push({name:'customerSatisfactionView',query:{groupName:row.groupName,evaluKind:row.evaluKind,inputDate:row.inputDate,emailDay:row.emailDay,modelName:row.modelName,evaluateTname:row.evaluateTname,id:row.id}})
                            }
                        }
                    ],
                    // 下拉显示
                    dropdown:[
                        
                    ]
                }
            },
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
            this.nowrow=currentRow
            console.log(currentRow);
        },
        
        /**
         * 行选中事件:多选时触发
         * rows：选中的所有行
         */
        rowsSelected(rows){
             
        },
        // 弹出框回调函数
        dialogCallback(data){
            this.$refs.table.refresh();
        },
        /**
         * 点击全选的checkbox触发
         * rows：选中的所有行
         */
        rowsSelectedAll(rows){
            
        },
        // 请求列表数据之前
        beforeGetListData(currentPage,pageSize,order,filters){
            filters.state = 'start,finish,discard';
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
       console.log(111111111);
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

<style scope>
</style>
