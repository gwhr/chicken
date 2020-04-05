<!--
 * @Author: your name
 * @Date: 2020-03-07 11:02:27
 * @LastEditTime: 2020-03-10 10:03:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bolg_webd:\私活\鸡-10K\chicken\src\components\views\register\register.vue
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
                      <span class="getCode" v-if="codeFlag" @click="getCode">{{$t('login.verificationCodeGet')}}</span>
                      <span class="getCode" v-if="!codeFlag">{{time}}</span>
                  </li>
                  <li class="form_li">
                      <input class="form-control" type="password" :placeholder="$t('login.password')" v-model="registers.password">
                  </li>
                  <li class="form_li">
                      <input class="form-control" type="password" :placeholder="$t('login.passwordAgain')" v-model="registers.passwordAgain">
                  </li>
                  <li class="form_li">
                      <input class="form-control" type="password" :placeholder="$t('login.transactionPassword')" v-model="registers.pwd2">
                  </li>
                  <li class="form_li">
                      <input class="form-control" type="password" :placeholder="$t('login.my')" v-model="registers.parent_mid">
                  </li>
                  <!-- <li class="form_li">
                      <input class="form-control" type="number" :placeholder="$t('login.invitationCode')" v-model="registers.invitationCode">
                  </li> -->
                  <li class="form_li">
                      <input class="form-control" :placeholder="$t('login.nickname')" v-model="registers.nickname">
                  </li>
                  <li class="form_li" style="color:#fff">
                        我已閱讀並同意<span style="color:#1881d2;" @click="agreement">用戶協議</span>
                  </li>
              </ul>
              <div class="registerBtn" @click="toConfirm">
                  {{$t('login.register')}}
              </div>

          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        radio:1,
        name:this.$t('login.register'),
        time:60,
        codeFlag:true,
        urlIvate:'',
        registers:{
            PhoneNumber:'',
            verificationCode:'',
            password:'',
            passwordAgain:'',
            nickname:'',
            pwd2:'',
            parent_mid:''
            // transactionPassword:'',
            // transactionPasswordAgain:'',
            // invitationCode:''
        }
    };
  },
  computed: {},
  watch: {},
  methods: {
    //   注册
    toConfirm(){
        // 进行校验
        // for(let v in this.registers){
        //     if(v !='invitationCode' || v !="mid"){
        //         // if(this.isNil(this.registers[v])){
        //         //         // 校验为空
                     
        //         //         this.$toast.fail(this.$t(`login.${v}`))
        //         //         return
        //         // }
        //         var reg = new RegExp("^[0-9]*$");
                
        //         // 正则条件
        //         switch(v){
        //             case 'passwordAgain':
        //                 if(this.registers[v] != this.registers['password']){
        //                     this.$dialog.alert({
        //                             message: this.$t('login.inconsistent'),
        //                         })
        //                     break
        //                 }
                    
        //         }     
                
        //     }
        // }
        var reg = new RegExp("^[0-9]*$");
        if(!reg.test(this.registers.pwd2)){
            this.$toast.fail('密碼只能為數字')
            return
            }
        this.register()
         // 注册成功
        console.log('注册成功')
        
    },
    /* 
        注册
    */
    register(){
        let params = {
            account:this.registers.PhoneNumber,
            verifycode:this.registers.verificationCode || 942190,
            nickname:this.registers.nickname,
            pwd:this.registers.password,
            repwd:this.registers.passwordAgain,
            pwd2:this.registers.pwd2,
            repwd2:this.registers.pwd2,
            mid:this.$route.params.id
        }
        this.globalApi.api.login.register(params).then(value=>{
              if(value.data.code == 1){
                  this.$router.push({
                        path:'/login'
                    })
              }else{
                  this.$toast.fail(value.data.msg)
              }
          })
    },
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
            temp:'sms_reg'
        }
        this.globalApi.api.login.sms_reg(params).then(value=>{
              if(value.data.code == 1){

              }else{
                  this.$toast.fail(value.data.msg)
              }
          })
    },
    /* 
        獲取邀請碼
    */
    getCodeIvate(){
        console.log(window.location.href,this.$route.params)
        let url = window.location.href.split('/');
        console.log(url.indexOf('mid'))
        if(this.$route.params.id){
            this.urlIvate = this.$route.params.id
        }
        
    },
    // 用戶協議
    agreement(){
        this.$router.push({
            path:'/agreement'
        })
    }
  },
  created() {
      this.getCodeIvate();
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