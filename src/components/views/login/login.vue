<!--
 * @Author: your name
 * @Date: 2020-03-09 13:39:04
 * @LastEditTime: 2020-03-10 11:50:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bolg_webd:\私活\鸡-10K\chicken\src\components\views\login\login.vue
 -->
<template>
  <div>
       <!-- 头部 -->
      <BaseHeader
        :name='name'
        :backShow='false'
      ></BaseHeader>
      <!-- content -->
      <div class="login">
          <div class="logo">
              <img class="logoimg" :src="logo" alt="">
          </div>
          <ul class="login_form">
              <li>
                  <van-field v-model="loginInfo.username" :placeholder="$t('login.username')" />
              </li>
              <li>
                  <van-field v-model="loginInfo.password" :placeholder="$t('login.password')" type="password"/>
              </li>
          </ul>
          <div class="loginBtn" @click="login">
                  {{$t('login.login')}}
          </div>
          <div class="forget_password" @click="forget_password">
              {{$t('login.forgetpassword')}}
          </div>
          <div class="toregister">
              {{$t('login.nousername')}}?<span @click="toregister">{{$t('login.register')}}</span>
          </div>
      </div>
  </div>
</template>

<script>
import logo from '@//assets/image/logo.png'
export default {
  data() {
    return {
        name:this.$t('login.login'),
        logo,
        loginInfo:{
            username:'13800138000',
            password:'123456'
        },
    };
  },
  methods: {
      login(){
          for(let v in this.loginInfo){
              if(this.isNil(this.loginInfo[v])){
                  // 校验为空
                this.$dialog.alert({
                    message: this.$t(`login.${v}`),
                })
                return
              }
          }
          let params = {
              account:this.loginInfo.username,
              password:this.loginInfo.password,
          }
          this.globalApi.api.login.login(params).then(value=>{
              if(value.data.code == 1){
                  this.$toast.success(value.data.msg)
                  this.storeSession.save('token',value.data.data.token);
                  this.$router.push({
                      path:'/index'
                  })
              }
          })
        
      },
      forget_password(){
          this.$router.push({
              path:'/seekword'
          })
      },
      toregister(){
          this.$router.push({
              path:'/register'
          })
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
    .login{
        @include layout;
        .logo{
            width:100%;
            margin-bottom: 35px;
            text-align: center;
            .logoimg{
                width:100px;
                height:100px;
            }
            .login_form{
                li{
                    margin-bottom: 20px;

                }
            }
        }
        .loginBtn{
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
        .forget_password{
            color:#1881d2;
            margin-top:10px;
        }
        .toregister{
            color:#fff;
            margin-top:30px;
            span{
                color:#1881d2;
                margin-left:5px;
            }
        }
    }
</style>