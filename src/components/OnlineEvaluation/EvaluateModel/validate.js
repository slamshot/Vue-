import {Validator} from 'vee-validate'
// 自定义表单验证的提示语 
const dictionary = {
    zh_CN: {
            messages: {
                required: ( field )=> field + '不能为空'
            },
            attributes:{
                
            }
    }
};
Validator.updateDictionary(dictionary);

// 扩展自定义的验证

// 动态添加属性翻译
export const addDictionary = (attributes) => {
    let dictionary2 = {
        zh_CN: {
            attributes:attributes
        }
    };
    Validator.updateDictionary(dictionary2);
}

const rules = {
    evaluKind: [
        { required: true,message: '请输入评价类别', trigger: 'blur' }
    ],
    modelName: [
        { required: true, message: '请输入模板名称', trigger: 'blur' }
    ]
}
export default rules;

