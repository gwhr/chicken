import http from '../../utils/httpaxios.js'
export const getsystemTime = {
    getsystemTime(){
        return http.request(`http://quan.suning.com/getSysTime.do`, 'get').then(value=>{
            return value
        })
    },
}
export const goods= {
    indexList(){
        return http.request(`/port/index/index`, 'get').then(value=>{
            return value
        })
    },
    // 预约捕捞
    appointment(){
        return http.request(`/port/index/appointment`, 'get').then(value=>{
            return value
        })
    },
}
export const login = {
    login(params){
        return http.request(`/port/login`, 'post',params).then(value=>{
            return value
        })
    },
    sms_reg(params){
        return http.request(`/port/login`, 'get',params).then(value=>{
            return value
        })
    }
}
export const userinfo = {
    getPaymentType(){
        return http.request(`/port/member/getPaymentType`, 'get').then(value=>{
            return value
        })
    },
    memberInfo(params){
        return http.request(`/port/member/info`, 'get',params).then(value=>{
            return value
        })
    },
    myPaymentMethod(params={}){
        return http.request(`/port/member/myPaymentMethod`, 'get',params).then(value=>{
            return value
        })
    }
}
