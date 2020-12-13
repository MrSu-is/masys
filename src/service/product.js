import { post,get,put,del } from '../utils/request'

/*
*获取列表
*@param {*} page
*/

export function listApi(page=1){
    return get("api/v1/admin/products",{page, per:2})
}

/*
*创建数据
*@param {*} data
*/

export function createApi(data) {
    return post('/api/v1/products',data)
}

/*
*修改数据
*@param {*} ID
*@param {*} data
*/

export function change(id,data) {
    return put(`/api/v1/products/${id}`,data)
}

/*
*删除数据
*@param {*} ID
*@param {*} data
*/


export function delte(id,data) {
    return del(`/api/v1/products/${id}`)
}

export function getOneById(id) {
    return get(`/api/v1/admin/products/${id}`);
  }
  