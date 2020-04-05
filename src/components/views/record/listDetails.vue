<template>
  <div class="">
      <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <div class="orderDetails">
            <!-- <van-row style="margin-bottom:20px;">
                <van-col span="24" style="text-align:center">
                    <img class="orderImg" :src="timg" alt="">
                </van-col>
            </van-row> -->
            <van-row style="margin-bottom:20px;">
                <van-col span="8" style="text-align:center">
                    {{$t('info.orderNumber')}}:
                </van-col>
                <van-col span="16" style="text-align:center">
                    {{orderDetails.ordersn}}
                </van-col>
            </van-row>
            <van-row style="margin-bottom:20px;">
                <van-col span="8" style="text-align:center">
                    {{$t('info.goldCoin')}}:
                </van-col>
                <van-col span="16" style="text-align:center">
                    {{orderDetails.integral}}
                </van-col>
            </van-row>
            <van-row style="margin-bottom:20px;">
                <van-col span="8" style="text-align:center">
                    {{$t('info.selleraccount')}}:
                </van-col>
                <van-col span="16" style="text-align:center">
                    {{orderDetails.seller_account}}
                </van-col>
            </van-row>
            <van-row style="margin-bottom:20px;">
                <van-col span="8" style="text-align:center">
                    {{$t('info.seller_nickname')}}:
                </van-col>
                <van-col span="16" style="text-align:center">
                    {{orderDetails.seller_nickname}}
                </van-col>
            </van-row>
            <van-row style="margin-bottom:20px;">
                <van-col span="8" style="text-align:center">
                    {{$t('info.receivingaccount')}}:
                </van-col>
                <van-col span="16" style="text-align:center">
                    {{orderDetails.seller_account}}
                </van-col>
            </van-row>
            <van-row style="margin-bottom:20px;" v-if="$route.query.type== 1">
                <van-col span="8" style="text-align:center">
                    {{$t('info.voucher')}}:
                </van-col>
                <van-col span="16" style="text-align:center">
                    <van-uploader style="width:100px;" v-model="fileList" multiple :after-read="afterRead" :max-count="1"/>
                </van-col>
            </van-row>
            <van-row style="margin-bottom:20px;" v-if="$route.query.type!= 1">
                <van-col span="8" style="text-align:center">
                    {{$t('info.voucher')}}:
                </van-col>
                <van-col span="16" style="text-align:center">
                    <img :src="$route.query.img" alt="" style="width:80px;height:100px;" @click="imgChange">
                </van-col>
            </van-row>
            <div class="registerBtn" @click="confirm" v-if="$route.query.type== 1">
                  {{$t('info.submit')}}
              </div>
      </div>
      <div class="passwordLayout" v-if="showKeyboard">
            <van-password-input
                :value="value"
                :focused="showKeyboard"
                @focus="showKeyboard = true"
                />
        <!-- 数字键盘 -->
            <van-number-keyboard
                :show="showKeyboard"
                @input="onInput"
                @delete="onDelete"
                :close-button-text="$t('login.confirm')"
                :title="$t('login.transactionPassword')"
                @blur="closekeyBoadr"
            />
      </div>
      <!-- 圖片預覽 -->
      <van-image-preview v-model="imgshow" :images="imgList" @change="onChange">
        
      </van-image-preview>
  </div>
</template>

<script>
import timg from '@//assets/image/timg.jpg'
export default {
  data() {
    return {
        name:this.$t('info.orderDetails'),
        timg,
        orderDetails:{},
        fileList:[],
        value:'',
        show:true,
        showKeyboard: false,
        payPage:false,
        imgshow:false,
        imgList:[]
    };
  },
  methods: {
      imgChange(){
          this.imgshow = true;
      },
      onChange(){

      },
      afterRead(file) {
      // 此时可以自行将文件上传至服务器
    //   this.fileList.push(file)
      console.log(file,this.fileList);
    },
      /* 
        获取订单详情
      */
     getDetails(){
         let params = {
            id:this.$route.query.id || 1
        }
        this.globalApi.api.record.detail(params).then(value=>{
              if(value.data.code == 1){
                  console.log(value)
                  this.orderDetails = value.data.data.detail;
              }else{
                  this.$toast.fail(value.data.msg)
              }
          })
     },
     /* 
        付款
     */
    pay(){
        console.log(this.fileList[0].file)
        const file = this.fileList[0].file;
        var formData = new FormData();
        formData.append('file',file);
        formData.append('id',this.$route.query.id || 1);
        formData.append('pwd2',this.value);
        console.log(formData)
        let params = {
            type:'formData',
            formData
        };
        this.globalApi.api.record.pay(params).then(value=>{
              if(value.data.code == 1){
                  this.$toast.success(value.data.msg)
                  this.$router.go(-1)
              }else{
                  this.$toast.fail(value.data.msg)
              }
          })
    },
     confirm(){

         this.showKeyboard = true;
     },
     onInput(value) {
         this.value = this.value+value;
        // this.$toast(value);
    },
    onDelete() {
        this.value = this.value.slice(0, this.value.length - 1);
    },
    /* 
        关闭键盘
    */
   closekeyBoadr(){
       if(this.value.length == 6){
           this.pay();
       }else{
           this.$toast('请输入正确密码')
       }
       this.showKeyboard = false;
       this.payPage = false;
   }
  },
  created() {

  },
  mounted() {
      this.getDetails();
      this.imgList.push(this.$route.query.img)
  },
  components: {},
}
</script>

<style scoped lang="scss">
.orderDetails{
    padding:20px;
    color:#fff;
    .orderImg{
        width:100px;
        height:100px;
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
}
.passwordLayout{
    position: fixed;
    background:rgba(0,0,0,0.5);
    left:0;
    top:0;
    height:100%;
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;
}
</style>