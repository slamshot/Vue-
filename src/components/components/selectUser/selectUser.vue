<template>
    <el-dialog id="selectUser" title="用户选择" :visible="visible" @close="close" :modal=false width="30%">
        <div class="head-area">
            <el-form ref="form" :inline="true">
                <!-- <el-form-item>
                    <el-input v-model="searchData.id" placeholder="员工号" size="small" style="width:100px;"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input v-model="searchData.name" placeholder="用户名或姓名" size="small" style="width:200px;" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table ref="userTable" :data="tableData" :row-style="{cursor:'pointer'}" border fit 
        highlight-current-row @selection-change="handleSelectionChange" height="300" v-loading.body="listLoading" element-loading-text="Loading">
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column align="center" type="index" width="50" label="序号"></el-table-column>
            <el-table-column v-for="(item,index) in tableColumnConfig" :key="index" :prop="item.id" :label="item.text" 
            :align="item.align" :min-width="item.width" :formatter="item.formatter"></el-table-column>
        </el-table>
        <div class="page-box">
            <el-pagination :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total" :page-sizes="[15, 20, 50, 100]" @size-change="handleSize" @current-change="handlePage">
            </el-pagination>
        </div>
        <div class="floot-area">
            <el-button type="primary" size="small" icon="el-icon-success" @click="determine">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import request from '@/utils/request'
export default {
    name:'selectUser',
    props:["callback"],
    data(){
        return {
            listLoading:false,
            tableData:[],
            tableColumnConfig:[
                {
                    id:"id",
                    text:"员工号",
                    align:"center",
                    width:80
                },
                {
                    id:"name",
                    text:"姓名",
                    align:"center",
                    width:80
                },
                {
                    id:"departmentName",
                    text:"部门",
                    align:"center",
                    width:100
                }
            ],
            // 选中的值
            selectedDatas:[],
            visible:false,
            currentPage:1,
            pageSize:15,
            total:0,
            searchData:{}
        }
    },
    methods:{
        open(){
            this.visible=true;
        },
        close(){
            this.$refs.userTable.clearSelection();
            this.visible=false;
        },
        // 查询
        search(){

        },
        // 确定
        determine(){
            this.callback(this.selectedDatas);
            this.close();
        },
        search(){
            let requestParams = {
                baseURL: process.env.USER_API,
                url: '/service-user/users/name',
                params:{
                    name:this.searchData.name
                },
                method: 'GET',
            }
            request(requestParams).then((res) => {
                this.tableData = res.data;
                this.total = res.data.length;
            });
        },
        // 获取数据
        getData(){
            let requestParams = {
                baseURL: process.env.USER_API,
                url: '/service-user/users/page',
                params:{
                    page:this.currentPage-1,
                    size:this.pageSize
                },
                method: 'GET',
                headers: {
                    'JSESSIONID':'8AA038C1637C7807E20019B9EE9E69C2',
                    'io':'APF8t256xI2zdM2ZAARI'
                }

            }
            request(requestParams).then((res) => {
                if(res.status == 200){
                    this.tableData = res.data.content;
                    this.total = res.data.totalElements;
                }
                
            });
            // let data = [
            //     {
            //         id:1,
            //         name:'张三',
            //         departmentName:'部门1'
            //     },
            //     {
            //         id:2,
            //         name:'张三2',
            //         departmentName:'部门2'
            //     },
            //     {
            //         id:3,
            //         name:'张三3',
            //         departmentName:'部门3'
            //     },
            //     {
            //         id:4,
            //         name:'张三4',
            //         departmentName:'部门4'
            //     },
            //     {
            //         id:5,
            //         name:'张三5',
            //         departmentName:'部门5'
            //     }
            // ]
            // this.tableData = data;
        },
        // 行选中事件
        handleSelectionChange(rows){
            this.selectedDatas = [];
            rows.forEach(({id,userName,name,departmentName}) => {
                 this.selectedDatas.push({id,userName,name,departmentName});
            });
        },
         // 选择 条/页
        handleSize(pageSize) {
            this.pageSize = pageSize;
            this.getData();
        },
        // 页码改变时都会触发
        handlePage(currentPage) {
            this.currentPage = currentPage;
            this.getData();
        },
    },
    created(){
        // 获取数据
        this.getData();
        this.selectedDatas = this.selected;
    }
}
</script>
<style scoped>
.el-form-item{
    margin-bottom: 10px;
}
.head-area{
    width: 100%;
    text-align: center;
}
.floot-area{
    width: 100%;
    text-align: center;
    margin-top: 10px;
}
</style>