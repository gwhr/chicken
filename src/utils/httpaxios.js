import axios from 'axios';
import qs from 'qs';
import {_that} from '../main'
// 拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  })
  axios.interceptors.response.use(
    config => {
      if(config.data.code == 400){
        _that.$toast.fail(config.data.msg)
        _that.$router.replace({
          path:'/login'
        })
      }
      return config
    },
    err => {
      return Promise.reject(err)
    })
export default{
    request(url,method,data={}){
        let options = {
            url,
            method,
            baseURL: 'http://nifty.tjweimingkj.com/',
        }
        if(method == 'get' || method == 'delete' ){
            options.params = data
        }
        if(method !== 'get' || method !== 'delete' ){
            if(data.type == "formData"){
              options.headers= {'Content-Type': 'multipart/form-data;charset=UTF-8'}
              options.data=data.formData;
            }else{
              options.data = qs.stringify(data);
              options.headers= {'Content-Type': 'application/x-www-form-urlencoded'}
            }
          }
        if(sessionStorage.getItem('token')){
          options.url = `${options.url}?token=${JSON.parse(sessionStorage.getItem('token'))}`
        }
        return axios(options).then(res => {
          return res
        }).catch( (error)=> {
            return error
        });
    }
}