let validAlertDay = (rule, value, callback) => {
    if(!value){
        callback(new Error('请输入预警提前期'));
    }
    if (!Number.isInteger(value)) {
        callback(new Error('请输入数字'));
    }
};
let validEmailDay = (rule, value, callback) => {
    if(!value){
        callback(new Error('请输入催办提前期'));
    }
    if (!Number.isInteger(value)) {
        callback(new Error('请输入数字'));
    }
};
const rules = {
    evaluKind: [
        { required: true,message: '请输入评价类别', trigger: 'blur' }
    ],
    evaluPlan: [
        { required: true, message: '请输入计划名称', trigger: 'blur' }
    ],
    startDate: [
        { required: true, message: '请选择开始时间', trigger: 'blur' }
    ],
    endDate: [
        { required: true, message: '请选择结束时间', trigger: 'blur' }
    ],
    alertDay: [
        { required: true, message: '请输入预警提前期', trigger: 'blur' }
        // { validator: validAlertDay, trigger: 'blur' }
    ],
    emailDay: [
        { required: true, message: '请输入催办提前期', trigger: 'blur' }
        // { validator: validEmailDay, trigger: 'blur' }
    ]
}
export default rules;