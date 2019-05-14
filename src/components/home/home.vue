<template>
    <el-container>
        <el-header class="header-container" style="height: 66px;">
            <header-left></header-left>
        </el-header>
        <el-container>
            <el-aside class="sidebar-container"></el-aside>
            <el-main class="main-container">
                <online-evaluation></online-evaluation>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import HeaderLeft from './header/headerLeft.vue'
import OnlineEvaluation from '@/components/OnlineEvaluation'
export default {
    name:'home',
    components:{
        HeaderLeft,OnlineEvaluation
    }
}
</script>
<style scoped>
/*  */
.sidebar-container{
    transition: width .28s;
    width: 260px!important;
    height: calc(100% - 66px);
    position: fixed;
    font-size: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    background-color: #D3DCE6;
}
.main-container{
    bottom: 0;
    position: absolute;
    top: 66px;
    transition: left .28s;
    left: 260px;
    right: 0;
    background-color: rgba(0,0,0,.01);
}
.header-container{
    position: absolute;
    top: 0;
    left: 0;
    line-height: 66px;
    width: 100%;
    margin: 0;
    padding: 0;
    box-shadow:0px 0px 8px 0px rgba(0, 0, 0, 0.08);
}
</style>


