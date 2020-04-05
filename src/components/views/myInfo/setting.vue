<template>
  <div>
       <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <div class='settinglayout'>
          <div class="avator">
              <!-- <img :src="timg2" alt=""> -->
          </div>
          <div class="register">
          <div class="registerForm">
              <ul>
                  <li class="form_li" style="color:#fff">
                      <input readonly class="form-control"  :placeholder="$t('login.username')" v-model="userInfo.nickname">
                  </li>
                  <li class="form_li">
                      <input readonly class="form-control" type="number" :placeholder="$t('login.PhoneNumber')" v-model="userInfo.account">
                  </li>
                  <!-- <li class="form_li">
                      <input class="form-control" type="number" :placeholder="$t('info.myinvitationcode')" v-model="registers.verificationCode">
                      <span class="getCode">{{$t('info.copymyinvitationcode')}}</span>
                  </li> -->
                  <li class="form_li" @click="tolink(1)">
                      <van-button size="small" type="info">修改登錄密碼</van-button>
                  </li>
                  <li class="form_li" @click="tolink(2)">
                      <van-button size="small" type="info">修改交易密码</van-button>
                  </li>
              </ul>
              <div class="registerBtn" @click="register">
                  {{$t('info.loginout')}}
              </div>

          </div>
      </div>
      </div>
      
  </div>
</template>

<script>
import timg2 from '@//assets/image/timg2.jpg'
export default {
  data() {
    return {
        timg2,
        name:this.$t('info.setting'),
        userInfo:{},
        registers:{
            username:'',
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
    // 修改交易密码
    tolink(type){
        this.$router.push({
            path:'/changePwd',
            query:{
                type
            }
        })
    },
    //   注册
    register(){
         // 注册成功
        console.log('注册成功')
        this.$router.push({
            path:'/login'
        })
    },
    /* 
        获取个人信息
      */
     memberInfo(){
         this.globalApi.api.userinfo.memberInfo().then(value=>{
              if(value.data.code == 1){
                  this.userInfo = value.data.data.member;
                  console.log(this.userInfo)
              }
          })
     }
  },
  created() {

  },
  mounted() {
      this.memberInfo();
  },
  components: {},
}
</script>

<style scoped lang='scss'>
.settinglayout{
    @include layout;
    .avator{
        text-align:center;
        img{
            width:80px;
            height:80px;
            border-radius:50%;
        }
        margin-bottom:30px;
    }
    .register{
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
}
</style>