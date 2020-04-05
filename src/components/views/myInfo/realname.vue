<template>
  <div>
      <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <!--  -->
      <div class="register">
          <div class="registerForm" v-if='userInfo.is_idverifly == 0'>
              <ul>
                  <li class="form_li">
                      <input class="form-control"  :placeholder="$t('info.entername')" v-model="registers.entername">
                  </li>
                 <li class="form_li">
                      <input class="form-control" type="number" :placeholder="$t('info.idnumber')" v-model="registers.idnumber">
                  </li>
              </ul>
              <div class="registerBtn" @click="register">
                  {{$t('info.submit')}}
              </div>

          </div>
          <div class="realNameStatus">
              <span v-if='userInfo.is_idverifly == 1'>{{$t('info.Verifiedbyrealname')}}</span>
              <span v-if='userInfo.is_idverifly == 2'>{{$t('info.inaudit')}}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        name:this.$t('info.Realnameauthentication'),
        userInfo:{},
        registers:{
            entername:'',
            idnumber:'',
        }
    };
  },
  computed: {},
  watch: {},
  methods: {
    //   注册
    register(){
        // 进行校验
        for(let v in this.registers){
            if(this.isNil(this.registers[v])){
                    // 校验为空
                    // this.$dialog.alert({
                    //     message: this.$t(`info.${v}`),
                    // })
                    this.$toast.fail(this.$t(`info.${v}`))
                    return
            } 
        }
        
        this.realname();
    },
    /* 
        实名认证
    */
    realname(){
        let params = {
            realname:this.registers.entername,
            idnum:this.registers.idnumber
        }
        this.globalApi.api.userinfo.realname(params).then(value=>{
              if(value.data.code == 1){
                  this.$toast.success(value.data.msg);
                  this.$router.go(-1);
              }else{
                  this.$toast.fail(value.data.msg)
              }
          })
    },
    /* 
        获取个人信息
      */
     memberInfo(){
         this.globalApi.api.userinfo.memberInfo().then(value=>{
            
              if(value.data.code == 1){
                  this.userInfo = value.data.data.member;
                  console.log(this.userInfo,'list')
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
        .realNameStatus{
            color:#fff;
            text-align:center;
        }
    }
</style>