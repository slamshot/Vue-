const rules = {
    evaluKind: [
        { required: true,message: '请输入评价类别', trigger: 'blur' }
    ],
    targetName: [
        { required: true, message: '请输入指标名称', trigger: 'blur' }
    ],
    description: [
        { required: true, message: '请选择指标含义', trigger: 'blur' }
    ]
}
export default rules;