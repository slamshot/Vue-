// 引入表单验证依赖文件，并且引入的是支持中文错误提示的文件。
import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN';//引入中文文件

// 进行中文错误提示的配置。
// 配置中文
Validator.addLocale(zh);
const config = {
  errorBagName: 'errors', // 属于高级应用，自定义errors
  fieldsBagName: 'fieldBags',
  delay: 0,// 输入多少ms之后进行校验
  locale: 'zh_CN',
  messages: null,// 代表自定义校验信息
  strict: true// 代表没有设置规则的表单不进行校验
};
Vue.use(VeeValidate,config);

// 自定义表单验证的提示语 
// 公共配置
const dictionary = {
   zh_CN: {
      messages: {
        email: () => '请输入正确的邮箱格式',
        required: ( field )=> "请输入" + field
      },
      attributes:{

      }
  }
};
Validator.updateDictionary(dictionary);

// 扩展自定义的验证
Validator.extend('isNumber', {
  messages: {
    zh_CN:field => field + '必须是数字',
  },
  validate: value => {
    return /^[0-9]*$/.test(value)
  }
});