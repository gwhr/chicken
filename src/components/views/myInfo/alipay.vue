<template>
  <div>
    <!-- 头部 -->
    <BaseHeader :name="name"></BaseHeader>
    <!--  -->
    <div class="register">
      <div class="registerForm">
        <ul>
          <li class="form_li">
            <div style="color:#fff;">選擇充值金額</div>
            <van-row style="margin-top:10px;">
              <van-col span="8" v-for="(item,index) in amountlist" :key='item'>
                <p :class="['recharge',{'active':active == index}]" @click="changeMoney(index)">{{item}}</p>
              </van-col>
            </van-row>

            <!-- <input class="form-control"  :placeholder="$t('info.moneyNumber')" v-model="registers.integral"> -->
          </li>
          <li class="form_li">
            <div style="color:#fff;">{{$t('info.voucher')}}</div>
            <div class="shangchuan">
              <van-uploader v-model="fileList" multiple :after-read="afterRead" :max-count="1" />
            </div>
          </li>
        </ul>
        <div class="registerBtn" @click="confirm">{{$t('info.submit')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import shangchuan from "@/assets/image/shangchuan.png";
export default {
  data() {
    return {
        active:0,
      shangchuan,
      name: this.$t("info.voucher"),
      amountlist:[],
      fileList: [],
      nowFile:{},
      integral:'',
      registers: {
        integral: "",
        file: ""
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file, this.fileList);
      this.file = file.file;
    },
    confirm() {
        if(!this.fileList.length){
            this.$toast.fail(this.$t('info.voucher'))
            return
        }
      this.rechargeSubmit();
      
    },
    changeMoney(index){
        this.active = index;
        this.integral = this.amountlist[index];
    },
    /* 
        上传充值凭证
      */
    rechargeSubmit() {
        let formData = new FormData();
        formData.append('file',this.file)
        formData.append('integral',this.integral ||this.amountlist[0])
      let params = {
          type:'formData',
          formData
      };
      this.globalApi.api.userinfo.rechargeSubmit(params).then(value => {
        if (value.data.code == 1) {
            this.$toast.success(value.data.msg)
        }
      });
    },
    /* 
        获取充值范围
      */
    recharge() {
      this.globalApi.api.userinfo.recharge().then(value => {
        if (value.data.code == 1) {
            this.amountlist = value.data.data.amountlist;
        }
      });
    },
    //   注册
    register() {
      // 进行校验
      for (let v in this.registers) {
        if (v != "invitationCode") {
          if (this.isNil(this.registers[v])) {
            // 校验为空
            return;
          }
        }
      }
      // 注册成功
      this.$router.go(-1);
    }
  },
  created() {
      this.recharge();
  },
  mounted() {},
  components: {}
};
</script>

<style lang="scss" scoped>
.register {
  @include layout;
  .form_li {
    width: 100%;
    position: relative;
    margin-bottom: 10px;
    .getCode {
      margin-top: 5px;
      position: absolute;
      right: 4px;
      bottom: 5px;
      background: #1881d2;
      color: #fff;
      padding: 3px 5px;
      border-radius: 4px;
      height: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
    }
  }
  .form-control {
    display: block;
    width: 100%;
    height: 55px;
    font-weight: 400;
    line-height: 1.5;
    background-color: transparent;
    padding: 6px 0;
    font-size: 12px;
    border: none;
    border-bottom: 1px solid #3e536b;
    color: #fff;
    &::-webkit-input-placeholder {
      color: #fff;
    }
    &::-moz-placeholder {
      //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
      color: #fff;
    }
    &:-ms-input-placeholder {
      //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
      color: #fff;
    }
  }
  .registerBtn {
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
.shangchuan {
  position: relative;
  text-align: center;
  // img{
  //     width:200px;
  //     height:200px;
  // }
  margin: 20px 0;

  .submit {
    position: absolute;
    width: 200px;
    height: 200px;
    opacity: 0;
    left: 50%;
    margin-left: -100px;
  }
}
/deep/.van-uploader {
  /deep/ .van-uploader__preview {
    width: auto;
    margin-right: 30px;
  }
}
.recharge{
    background:#102030;
    color:#fff;
    line-height:2.5;
    width:80px;
    text-align:center;
    margin-bottom:10px;
    &.active{
        background:#fff;
        color:#000;
    }
}
</style>