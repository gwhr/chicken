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
                      <input class="form-control"  type='number' placeholder="輸入手機號" v-model="registers.PhoneNumber" >
                  </li>
                  <li class="form_li">
                      <input class="form-control"  :placeholder="$t('info.selectType')" v-model="registers.selectType" readonly @click="getCardType">
                      <van-action-sheet v-model="show" :title="$t('info.selectType')">
                        <van-picker  :columns="columns" @change="onChange" />
                      </van-action-sheet>
                  </li>
                  <li class="form_li">
                      <input class="form-control" type="number" :placeholder="$t('login.verificationCode')" v-model="registers.verificationCode">
                      <span class="getCode" v-if="codeFlag" @click="getCode">{{$t('login.verificationCodeGet')}}</span>
                      <span class="getCode" v-if="!codeFlag">{{time}}</span>
                  </li>
                 <li class="form_li">
                      <input class="form-control" type="number" :placeholder="$t('info.banknumber')" v-model="registers.account">
                  </li>
                  <li class="form_li">
                      <input class="form-control"  :placeholder="$t('info.bankname')" v-model="registers.titleofaccount">
                  </li>
              </ul>
              <div class="registerBtn" @click="register">
                  {{$t('info.submit')}}
              </div>

          </div>
      </div>
  </div>
</template>

<script>
import shangchuan from '@/assets/image/shangchuan.png';
export default {
  data() {
    return {
        show:false,
        columns: [],
        option1: [],
        shangchuan,
        name:this.$t('info.addbank'),
        time:60,
        codeFlag:true,
        bankCardList:[],
        registers:{
            titleofaccount:'',
            selectType:'',
            typeId:'',
            bankcard:'',
            banknumber:'',
            bankname:''
        }
    };
  },
  computed: {},
  watch: {},
  methods: {
    getCardType(){
        this.show = true
    },
    onConfirm(value,index){
        this.registers.selectType = value;
        this.show = false;
    },
    onCancel(value,index){
        this.registers.selectType = value;
        this.show = false;
    },
    onChange(picker, value, index) {
        this.registers.selectType = value;
    //   Toast(`当前值：${value}, 当前索引：${index}`);
    },
    //   注册
    register(){
        // 进行校验
        for(let v in this.registers){
            // if(!this.registers[v]){
            //     alert('请填写完整信息');
            //     return
            // }
        }
        this.submitMethod();
         // 注册成功
        console.log('注册成功')
        this.$router.go(-1);
    },
    /* 
        获取银行卡类别
    */
   getPaymentType(){
       this.globalApi.api.userinfo.getPaymentType().then(value=>{
              if(value.data.code == 1){
                  this.bankCardList = value.data.data.typelist;
                  value.data.data.typelist.forEach(v=>{
                        this.columns.push(v.name)
                  })
              }
          })
   },
       // 获取验证码
    getCode(){
        if(!this.registers.PhoneNumber){
            this.$toast.fail('請輸入手機號')
            return
        }
        
        this.codeFlag = false;
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
        }
        this.globalApi.api.userinfo.sms_reg(params).then(value=>{
              if(value.data.code == 1){

              }else{
                  this.$toast.fail(value.data.msg)
              }
          })
    },
    /* 
        添加银行卡
    */
   submitMethod(){
        let params = {
            type:this.registers.selectType ,
            titleofaccount:this.registers.titleofaccount,
            account:this.registers.account,
            ispaymentcode:0,
            verifycode:"22222222"
        }
        this.bankCardList.forEach(v=>{
            if(v.name == params.type){
                params.type = v.id;
            }
       })
        this.globalApi.api.userinfo.submitMethod(params).then(value=>{
              if(value.data.code == 1){
                  this.$toast.success(value.data.msg)
              }else{
                  this.$toast.fail(value.data.msg)
              }
          })
    },
  },
  created() {

  },
  mounted() {
      this.getPaymentType();
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
    .shangchuan{
        position: relative;
        text-align:center;
        img{
            width:200px;
            height:200px;
        }
        margin:20px 0;
        .submit{
            position: absolute;
            width:200px;
            height:200px;
            opacity: 0;
            left:50%;
            margin-left:-100px;
        }
    }
    .van-dropdown-menu{
        background:transparent;
    }
</style>