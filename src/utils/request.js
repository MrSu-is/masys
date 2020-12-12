import axios from 'axios'
import { getToken } from './auth'

const instance = axios.create({
    baseURL: 'http://localhost:3009',
    timeout: 5000
})

//全区请求拦截 发送请求之前执行
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before 2request is sent
    config.headers['authorization'] = 'Bearer ' + getToken()
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  //全区响应拦截 请求返回以后拦截
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
 
/*get
*@param {*} url       地址
*@param {*} params    url参数
*/  
export function get(url,params){
    return instance.get(url, {
        params
    })
}

/*post
*@param {*} url       地址
*@param {*} data      数据
*/  

export function post(url,data){
    return instance.post(url,data)
}

/*put
*@param {*} url       地址
*@param {*} data      数据
*/  

export function put(url,data){
    return instance.put(url, data)
}

/*del
*@param {*} url       地址
*/  

export function del(url){
    return instance.del(url)
}

export function getOneById(ID){
  return get('/api/v1/admin/products/${ID}')
}
