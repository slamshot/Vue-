import request from '@/utils/request'
/* 主表接口 */
export function getList(currentPage,pageSize,order,filters){
    return request({
        url: '/furniture/getFurnitureList',
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
        url: '/furniture/addFurniture',
        data,
        method: 'POST'
    })
}

export function get(guid){
    return request({
        url: '/furniture/getFurnitureById',
        data:{
            guid
        },
        method: 'POST'
    })
}

export function update(data){
    return request({
        url: '/furniture/updateFurniture',
        data,
        method: 'POST'
    })
}

export function deleted(guid){
    console.log(guid);
    return request({
        url: '/furniture/deleteFurniture',
        data:{
            guid
        },
        method: 'POST'
    })
}

/* 明细表接口 */
export function getDetailList(fkguid){
    return request({
        url: '/furniture/getFurnitureDetailList',
        data:{
            fkguid
        },
        method: 'POST'
    })
}