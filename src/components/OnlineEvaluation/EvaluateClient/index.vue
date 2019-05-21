<template>
    <div id="evaluateClientList" class="content-height">
        <z-table ref="table" :tableColumnConfig=tableColumnConfig :toolBarConfig=toolBarConfig
        :tableBaseConfig=tableBaseConfig></z-table>
        <router-view></router-view>
    </div>
</template>
<script>
import ZTable from '../../zTable'
import SearchPage from './search'
import {getList,deleted} from './evaluateClient.js'
import { formatDate } from '@/utils/common.js'

// 路由的名称
const routerName = 'evaluateClient'
// 主键字段
const key = 'id'
export default {
    name:'evaluateClientList',
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
                tableHeight:'calc(100% - 159.2px)',
                opertionColumnWidth:150,
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
                    id:"groupName",
                    text:"制表部门",
                    align:"center",
                    width:120,
                    sortable:true
                },
                {
                    id:"inputDate",
                    text:"制表时间",
                    align:"center",
                    width:80,
                    sortable:true,
                    formatter:function(row,column){
                        return formatDate(row.inputDate);
                    }
                },
                {
                    id:"inputerFullName",
                    text:"制表人",
                    align:"center",
                    width:60,
                    sortable:true
                },
                {
                    id:"doUserCount",
                    text:"评价人数",
                    align:"center",
                    width:70,
                    sortable:true
                },
                {
                    id:"doneUserCount",
                    text:"被评价人数",
                    align:"center",
                    width:80,
                    sortable:true
                },
                {
                    id:"state",
                    text:"状态",
                    align:"center",
                    width:60,
                    sortable:true
                }
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
                            id:"default_delete",
                            text:"删除",
                            icon:"el-icon-delete",
                            click:(row) => {
                                this.deleteButtonClick(row[key],row.state);
                            }
                        },
                        {
                            id:"default_view",
                            text:"浏览",
                            icon:"el-icon-view",
                            click:(row) => {
                                console.log(row);
                                console.log(row[key]);
                                
                                this.viewButtonClick(row[key],row.state);
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
           switch(state){
                case '暂存':
                    let that = this;
                    this.$store.commit("setData",{callback:function(){
                        that.$refs.table.refresh();
                    }});
                    this.$router.push(
                        {
                            name:'evaluateClient',
                            query:{
                                useType:'modify',
                                id
                            }
                        }
                    );
                    break;
                case '分发':
                    this.$message({
                        message: '分发状态下不可查看',
                        type: 'warning'
                    });
                    break;
                case '完成':
                    this.$router.push(
                        {
                            name:'evaluateClientView',
                            query:{
                                useType:'view',
                                id
                            }
                        }
                    );
                    break;
           }
        },
        // 删除按钮点击事件
        deleteButtonClick(id,state){
            if(!Object.is('暂存',state)){
                this.$message({
                    message: '评价表已经分发或完成，不能删除',
                    type: 'warning'
                });
                return;
            }
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
        // 请求列表数据之前
        beforeGetListData(currentPage,pageSize,order,filters){
            filters.state = '暂存,分发,完成';
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
