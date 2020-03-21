import axios from 'axios';
// 拦截器
axios.interceptors.request.use(
  config => {
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
            options.params = {data}
        }
        if(method !== 'get' || method !== 'delete' ){
            options.data = data;
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