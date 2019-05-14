<template>
    <el-form>
        <el-form-item label="被委托人：">
            <el-input placeholder="请选择被委托人" suffix-icon="el-icon-circle-plus-outline" :disabled="true" :click="selectUsers" v-model="formData"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    name:'evaluateConsign',
    data(){
        return{
            formData:''
        }
    },
    methods:{
        selectUsers(){
            alert(1);
        }
    }
}
</script>
<style scoped>

</style>
