import request from '@/utils/request'
/* 获取在线评价列表 */
export function clientList(id){
    return request({
        url: '/evaluateClientList/clientList',
        params:{
            evaluateId:id,
        },
        method: 'GET'
    })
}

// 删除
export function deletePeople(pkid){
    return request({
        url: '/evaluateClientList/delete/'+pkid,
        method: 'GET'
    })
}


// 
export function sendEmail(){
    return request({
        baseURL: process.env.USER_API,
        url: '/service-message/message/email',
        transformRequest: [(data) => {
            return data
        }],
        data:JSON.stringify({
            // reqMap:{
                // 邮件内容
                content:'您有一个新任务【'+'内部客户满意度测评'+'】，请及时查看！点击链接查看详情<a href=\"http://hoon.ecidi.com\">查看流程详情</a>！',
                // 标题
                subject:'【IT项目管理平台】内部客户满意度测评',
                // 收件人
                to:'987082641@qq.com'
            // }
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'JSESSIONID':'745597CB1248A7801A968B6466A063AC',
            'io':'F3AOkbjuesRlZFyOAAQu'
        }
    })
}
// // state:提交0,暂存1    被委托人的信息
// export function saveConsignFillContent(data){
//     return request({
//         url: '/evaluateClientList/saveConsignFillContent',
//         data:JSON.stringify(data),
//         method: 'POST',
//         transformRequest: [(data) => {
//             return data
//         }],
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8'
//         }
//     })
// }

// // 查看，获取填写内容
// export function getFillContent(id){
//     return request({
//         url: '/evaluateClientList/getFillContent',
//         method: 'GET',
//         params:{
//             evaluateListPKID:id
//         }
//     })
// }

// // 获取指定评价指标信息
// export function getTargetItem(pkid){
//     return request({
//         url: '/evaluateTarget/get/'+pkid,
//         method: 'GET',
//     })
// }