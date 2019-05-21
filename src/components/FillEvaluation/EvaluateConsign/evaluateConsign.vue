<template>
    <div id="evaluateConsign">
        <el-dialog title="测评委托" 
        :visible.sync="dialogFormVisible"
        :before-close="handleClose" :close-on-click-modal="false">
            <h4>{{PlanName}}委托</h4>
            <el-input
                @focus="iptFocus"
                placeholder="请选择人选"
                suffix-icon="el-icon-plus"
                v-model="people">
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
        <select-user ref="selectSon" :callback="callback"></select-user>
    </div>
</template>

<script>
import {saveConsignInfo} from './evaluateConsignApi.js'
import selectUser from '../../components/selectUser/selectUser.vue'
export default {
    name:'evaluateConsign',
    props:{// 其他组件传入的值
       
    },
    components:{
        selectUser,
    },
    data:function(){// 自定义变量
        return {
            PlanName:'',
            dialogFormVisible:true,
            title:'',
            people:'',
            data:[],
        }
    },
    methods:{// 自定义方法
        handleClose(done) {
            this.$router.back();
        },

        // 文本框获得焦点事件
        iptFocus(){
            this.$refs.selectSon.open();
        },
        // 添加委托人
        callback(data){
            this.data=data;
            if(data.length>0){
                let peopleArr=[];
                for(let i=0;i<data.length;i++){
                    peopleArr.push(data[i].name);
                }
                
                this.people=peopleArr.join(',');
            }
        },
        confirm(){
            let apiData={};
            apiData.doUserCount=this.data.length;
            let doFullNameArr=[];
            let doUserNoArr=[];
            
            for(let i=0;i<this.data.length;i++){
                doFullNameArr.push(this.data[i].name)
                doUserNoArr.push(this.data[i].id)
            }
            let doFullNameStr=doFullNameArr.join(',');
            let doUserNoStr=doUserNoArr.join(',');
            apiData.doFullName=doFullNameStr;
            apiData.doUserNo=doUserNoStr;
            apiData.evaluateId=this.$route.query.EvaluateId;
            apiData.evaluateListPKID=this.$route.query.EvaluateListPKID;
            
            saveConsignInfo(apiData).then((result) => {
                if(result.status==200){
                    this.$router.back();
                    this.$message({
                        message: '委托成功!',
                        type: 'success'
                    });
                    this.$store.state.data.callback();
                }else{
                    this.$message.error('委托失败!');
                }
            })
            
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
        this.PlanName=this.$route.query.PlanName;
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
</style>