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
    appointment(params){
        return http.request(`/port/index/adopt`, 'get',params).then(value=>{
            return value
        })
    },
    // 轮播图
    slide(){
        return http.request(`/port/slide/index`, 'get').then(value=>{
            return value
        })
    }
}
export const login = {
    login(params){
        return http.request(`/port/login`, 'post',params).then(value=>{
            return value
        })
    },
    // 获取验证码(注册)
    sms_reg(params){
        return http.request(`/port/login/verifycode`, 'get',params).then(value=>{
            return value
        })
    },
    // 注册
    register(params){
        return http.request(`/port/login/register`, 'post',params).then(value=>{
            return value
        })
    },
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
    },
    // 实名认证
    realname(params={}){
        return http.request(`/port/member/realname`, 'post',params).then(value=>{
            return value
        })
    },
    // 上传充值凭证
    rechargeSubmit(params={}){
        return http.request(`/port/member/rechargeSubmit`, 'post',params).then(value=>{
            return value
        })
    },
    // 获取用户验证码(添加银行卡)
    sms_reg(params){
        return http.request(`/port/member/verifycode`, 'get',params).then(value=>{
            return value
        })
    },
    // 添加充值方式
    submitMethod(params={}){
        return http.request(`/port/member/submitMethod`, 'post',params).then(value=>{
            return value
        })
    },
    // 我的资产
    myAssets(params={}){
        return http.request(`/port/member/myAssets`, 'get',params).then(value=>{
            return value
        })
    },
    // 收益记录
    incomeLog(params={}){
        return http.request(`/port/member/incomeLog`, 'get',params).then(value=>{
            return value
        })
    },
    // 团队收益
    myTeam(params={}){
        return http.request(`/port/member/myTeam`, 'get',params).then(value=>{
            return value
        })
    },
    // 生成链接
    inviteFriends(params={}){
        return http.request(`/port/member/inviteFriends`, 'get',params).then(value=>{
            return value
        })
    },
    // 获取充值范围
    recharge(params={}){
        return http.request(`/port/member/recharge`, 'get',params).then(value=>{
            return value
        })
    },
    // 轉增
    givingIntegral(params={}){
        return http.request(`/port/member/givingIntegral`, 'get',params).then(value=>{
            return value
        })
    },
    // 修改交易密碼
    changePwd2(params={}){
        return http.request(`/port/member/changePwd2`, 'get',params).then(value=>{
            return value
        })
    },
    // 修改交易密碼
    changePwd(params={}){
        return http.request(`/port/member/changePwd`, 'get',params).then(value=>{
            return value
        })
    },
}
export const record = {
    // 捕捉记录  1-捕捉中，2-已捕到，3-取消
    orderIndex(params={}){
        return http.request(`/port/order/index`, 'get',params).then(value=>{
            return value
        })
    },
    // 订单详情
    detail(params={}){
        return http.request(`/port/order/detail`, 'get',params).then(value=>{
            return value
        })
    },
    // 付款
    pay(params={}){
        return http.request(`/port/order/pay`, 'post',params).then(value=>{
            return value
        })
    },
    // 金幣記錄
    integralLog(params={}){
        return http.request(`/port/member/integralLog`, 'post',params).then(value=>{
            return value
        })
    },
}
export const helpCenter = {
    // 幫助中心
    article(params={}){
        return http.request(`/port/slide/article`, 'get',params).then(value=>{
            return value
        })
    },
}
