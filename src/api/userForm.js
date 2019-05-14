import request from '@/utils/request'
/* 主表接口 */
export function getList(currentPage,pageSize,order,filters){
    return request({
        url: '/user/getUserList',
        data:{
            currentPage,
            pageSize,
            order:JSON.stringify(order),
            filters:JSON.stringify(filters)
        },
        method: 'POST'
    })
}

export function save(data){
    return request({
        url: '/user/addUser',
        data,
        method: 'POST'
    })
}

export function get(id){
    return request({
        url: '/user/getUserById',
        data:{
            id
        },
        method: 'POST'
    })
}

export function update(data){
    return request({
        url: '/user/updateUser',
        data,
        method: 'POST'
    })
}

export function deleted(id){
    return request({
        url: '/user/deleteUser',
        data:{
            id
        },
        method: 'POST'
    })
}