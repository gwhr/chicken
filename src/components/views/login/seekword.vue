<!--
 * @Author: your name
 * @Date: 2020-03-10 09:54:48
 * @LastEditTime: 2020-03-10 11:33:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bolg_webd:\私活\鸡-10K\chicken\src\components\views\login\seekword.vue
 -->
<template>
  <div>
       <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <!--  -->
      <div class="register">
          <div class="registerForm">
              <ul>
                  <li class="form_li">
                      <input class="form-control" type="number" :placeholder="$t('login.PhoneNumber')" v-model="registers.PhoneNumber">
                  </li>
                  <li class="form_li">
                      <input class="form-control" type="number" :placeholder="$t('login.verificationCode')" v-model="registers.verificationCode">
                      <span class="getCode" @click='getCode'>{{$t('login.verificationCodeGet')}}</span>
                  </li>
                  <li class="form_li">
                      <input class="form-control" type="password" :placeholder="$t('login.newpassword')" v-model="registers.pwd">
                  </li>
                  <li class="form_li">
                      <input class="form-control" type="password" placeholder="再次輸入密碼" v-model="registers.repwd">
                  </li>
              </ul>
              <div class="registerBtn"  @click="forgetpwd">
                  {{$t('login.confirm')}}
              </div>

          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        time:60,
        codeFlag:true,
        name:this.$t('login.Retrievepassword'),
        registers:{
            PhoneNumber:'',
            verificationCode:'',
            password:'',
            passwordAgain:'',
            transactionPassword:'',
            transactionPasswordAgain:'',
            invitationCode:''
        }
    };
  },
  methods: {
      // 获取验证码
    getCode(){
        this.codeFlag = false;
        if(!this.registers.PhoneNumber){
            this.$toast.fail('請輸入手機號')
        }
        this.sms_reg()
        var timer = setInterval(() => {
                    this.time--;
                    if (this.time === 0) {
                        clearInterval(timer);
                        this.codeFlag = true;
                    }
                }, 1000)
    },
    /*
        获取验证码 
     */
    sms_reg(){
        let params = {
            mobile:this.registers.PhoneNumber,
            temp:'sms_forget'
        }
        this.globalApi.api.login.sms_reg(params).then(value=>{
              if(value.data.code == 1){
                  this.$toast.success(value.data.msg)
              }else{
                  this.$toast.fail(value.data.msg)
              }
          })
    },
    /*
        找回密碼 
     */
    forgetpwd(){
        let params = {
            account:this.registers.PhoneNumber,
            verifycode:this.registers.verificationCode,
            pwd:this.registers.pwd,
            repwd:this.registers.repwd
        }
        this.globalApi.api.login.forgetpwd(params).then(value=>{
              if(value.data.code == 1){
                  this.$toast.success(value.data.msg)
                  this.$router.go(-1)
              }else{
                  this.$toast.fail(value.data.msg)
              }
          })
    },
    /* 
        修改密碼
    */
   confirm(){

   }
  },
  created() {

  },
  mounted() {

  },
  components: {},
}
</script>

<style lang="scss" scoped>
    .register{
        @include layout;
        .form_li{
            width:100%;
            position: relative;
            margin-bottom: 10px;
            .getCode{
                margin-top: 5px;
                position: absolute;
                right: 4px;
                bottom: 5px;
                background: #1881d2;
                color: #fff;
                padding: 3px 5px;
                border-radius: 4px;
                height:100%;
                height: 40px;
                line-height:40px;
                font-size: 16px;
            }
        }
        .form-control{
            display: block;
            width: 100%;
            height:55px;
            font-weight: 400;
            line-height: 1.5;
            background-color: transparent;
            padding: 6px 0;
            font-size: 12px;
            border:none;
            border-bottom:1px solid #3e536b;
            color:#fff;
            &::-webkit-input-placeholder{
                    color: #fff;
                }
            &::-moz-placeholder{  //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
                    color: #fff;        
            }
            &:-ms-input-placeholder{  //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
                    color: #fff;        
            }
        }
        .registerBtn{
                background: #1881d2;
                color: #fff;
                width: 100%;
                font-size: 14px;
                margin-top: 35px;
                border-radius: 3px;
                padding: 8px 0;
                font-weight: 400;
                line-height: 1.5;
                text-align: center;
        }
    }
</style>