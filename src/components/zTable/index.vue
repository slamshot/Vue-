<template>
    <div id="zTable" class="dataTable">
        <component :is="SearchPage"></component>
        <div id="zToolBar" class="zToolBar">
            <el-button v-for="item in toolBarConfig.top" :key="item.id" :id=item.id type="primary" :style="item.style" size="small" :icon=item.icon @click=item.click>{{item.text}}</el-button>
        </div>
        <div class="page-table" :style="'height: '+tableHeight+';'">
            <el-table ref="table" :data="tableData" @sort-change="sorting" :default-sort="currentSort[0]" :row-style="{cursor:'pointer'}" border fit 
            highlight-current-row @current-change="handleCurrentChange" @selection-change="handleSelectionChange" 
            @select="selectRow" @select-all="selectAll" @clearSelection="clearSelect" height="100%" v-loading.body="listLoading" element-loading-text="Loading">
                <el-table-column align="center" type="selection" v-if="selectModel == 'Multi'"></el-table-column>
                <el-table-column align="center" type="index" width="50" label="序号"></el-table-column>
                <el-table-column v-for="(item,index) in tableColumnConfig" :key="index" :prop="item.id" :label="item.text" 
                :sortable="item.sortable?'custom':false" :align="item.align" :min-width="item.width" :formatter="item.formatter"></el-table-column>
                <el-table-column align="center" label="操作" :width="opertionColumnWidth" v-if="tableBaseConfig.showOperation == undefined?true:tableBaseConfig.showOperation">
                    <template slot-scope="scope">
                        <el-button v-for="item in toolBarConfig.eachRow.default" :key="item.id" :id="item.id" type="primary" :style="item.style" size="small" :icon="item.icon" @click="item.click(scope.row)" :title="item.text"></el-button>
                        <!-- <i v-for="item in toolBarConfig.eachRow.default" :key="item.id" :id="item.id" type="primary" :style="item.style" size="small" :icon="item.icon" @click="item.click(scope.row)" :title="item.text"></i> -->
                        <el-dropdown trigger="click" v-show="toolBarConfig.eachRow.dropdown.length > 0">
                            <el-button type="primary" size="small">
                                ...<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item class="clearfix">
                                    <el-button v-for="item in toolBarConfig.eachRow.dropdown" :key="item.id" :id="item.id" :style="item.style" type="primary" size="small" :icon="item.icon" @click="item.click(scope.row)" :title="item.text"></el-button>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-box" v-if="tableBaseConfig.showPageBar == undefined?true:tableBaseConfig.showPageBar">
            <el-pagination :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total" :page-sizes="[15, 20, 50, 100]" @size-change="handleSize" @current-change="handlePage">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name:'zTable',
    components:{
        
    },
    provide:function(){
       return {
            "search":this.toSearch
       }
    },
    inject: ["rowSelected","rowsSelected","rowsSelectedAll","getList","SearchPage","beforeGetListData"],
    props:{
        // 列表列配置
        tableColumnConfig:{
            type: Array,
            required: true,
            default:[]
        },
        // 工具栏配置 列表行内按钮
        toolBarConfig:{
            type: Object,
            required: true,
            default:{
                top:{},
                eachRow:{
                    default:[],
                    dropdown:[]
                }
            }
        },
        // 列表基本配置
        tableBaseConfig:{
            type: Object,
            required: true,
            default:{}
        }
       
    },
    data:function(){
        return {
            // 是否有加载动画
            listLoading: false,
            // 列表数据
            tableData:[],
            // 当前页
            currentPage: 1,
            // 数据总数
            total: 0,
            // 当前条件
            currentFilters:{},
            // 列表的选择模式：多选Multi 单选Single
            selectModel:this.tableBaseConfig.selectModel || 'Single',
            // table 默认高度
            tableHeight: this.tableBaseConfig.tableHeight || 50,
            // 每页条数 默认值为15
            pageSize: this.tableBaseConfig.pageSize || 15,
            // 默认排序
            currentSort:this.tableBaseConfig.currentSort || [],
            // 操作列宽
            opertionColumnWidth:this.tableBaseConfig.opertionColumnWidth || 200,
        }
    },
    methods:{
        // 获取列表数据
        getListData(){
            // 请求列表数据之前
            if(this.beforeGetListData){
                this.beforeGetListData(this.currentPage,this.pageSize,this.currentSort,this.currentFilters);
            }
            this.listLoading = true;
            this.getList(this.currentPage,this.pageSize,this.currentSort,this.currentFilters).then((res)=>{
                console.log(res.data);
                
                let showPageBar = this.tableBaseConfig.showPageBar;
                if(showPageBar == undefined ?true:showPageBar){
                    this.total = res.data.totalElements;
                    this.tableData = res.data.content;

                    this.currentPage = currentPage;
                    this.pageSize = pageSize;
                    this.currentSort = order;
                    this.currentFilters = filters;
                }else{
                    this.tableData = res.data;
                }

                this.listLoading = false;
            }).catch(() => {
                this.listLoading = false;
            });
        },
        // 查询
        toSearch(filters){
            this.currentFilters = filters;
            this.getListData();
        },
        // 排序
        sorting(data){
            this.currentSort = [{order:data.order,prop:data.prop}];
            this.getListData();
        },
        // 选择 条/页
        handleSize(pageSize) {
            this.pageSize = pageSize;
            this.getListData();
        },
        // 页码改变时都会触发
        handlePage(currentPage) {
            this.currentPage = currentPage;
            this.getListData();
        },
        refresh(){
            this.getListData();
        },
        // 选中行(点击行时触发)：用于单选
        handleCurrentChange(currentRow,oldCurrentRow){
            if(Object.is(this.selectModel,"Single")){
                this.rowSelected(currentRow,oldCurrentRow);
            }
        },
        // 多选时触发
        handleSelectionChange(rows){
            this.rowsSelected(rows);
        },
        // 多选时触发 与上面handleSelectionChange一样
        selectRow(rows){
            // console.log(rows);
        },
        // 点击全选的checkbox触发
        selectAll(rows){
            this.rowsSelectedAll(rows);
        },
        // 清空选中：需要手动调用
        clearSelect(){
            return Promise.resolve([]);
        },
    },
    computed:{
        
    },
    mounted:function(){
        // if(this.tableBaseConfig.tableHeight == undefined){
        //     // 列表高度自适应
        //     this.$nextTick(function () {
        //         this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 50;
        //         // 监听窗口大小变化
        //         let self = this;
        //         window.onresize = function() {
        //             self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 50
        //         }
        //     })
        // }
        
    },
    created:function(){// 组件创建后
        // DOTO 获取数据等
        this.getListData(this.currentPage,this.pageSize,this.currentSort);
        // this.showOperation = this.tableBaseConfig.showOperation || true;
        // this.showPageBar = this.tableBaseConfig.showPageBar || true
    },
    watch:{

    }
}
</script>
<style>
.dataTable{
    height: 100%;
    position: relative;
}
.page-table{
    position: relative;
    overflow: auto;
}
.page-box{
    padding: 10px;
    /* width: 100%; */
    text-align: right;
    border: 1px solid #ebeef5;
    border-top: none;
    background: #fdfdfd;
}
.zToolBar{
    position: absolute;
    top:5px;
    right: 20px;
}
</style>


