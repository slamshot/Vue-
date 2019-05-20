import request from '@/utils/request'
import store from '@/store/user.js'

// 评价类别
const evaluKindOptions = [
    {
        value: '员工达优测评',
        label: '员工达优测评'
    },{
        value: '内部顾客满意度测评',
        label: '内部顾客满意度测评'
    }
]
export function getEvaluKind(){
    return Promise.resolve({status:200,data:evaluKindOptions});
}

// 计划状态
export const planStates = {
    0:'暂存',
    1:'开始',
    2:'执行',
    3:'完成'
}
let planStateOptions = [];
Object.keys(planStates).forEach((key) => {
    planStateOptions.push({
        value:key,
        label:planStates[key]
    });
});
export function getPlanState(){
    return Promise.resolve({status:200,data:planStateOptions});
}

// 评价表状态
const evaluteTStateOptions = [
    {
        value: '暂存',
        label: '暂存'
    },{
        value: '分发',
        label: '分发'
    },{
        value: '完成',
        label: '完成'
    }
]
export function getEvaluteState(){
    return Promise.resolve({status:200,data:evaluteTStateOptions});
}

const loginInfo = {
    inputerUserNo:store.state.userInfo.id,
    inputerFullName:store.state.userInfo.name,
    groupId:store.state.userInfo.departmentId,
    groupFullId:store.state.userInfo.departmentId,
    groupName:store.state.userInfo.departmentName,
}
export function getLoginInfo(val){
    if(val){
        return loginInfo[val];
    }
    return loginInfo;
}
