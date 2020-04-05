<template>
  <div>
      <!-- 头部 -->
      <BaseHeader
        :name='name'
      >
      <template v-slot:operation>
        <!-- <span @click="editCard">编辑</span> -->
      </template>
      </BaseHeader>
      <!--  -->
      <ul class="cardList">
        <li class="cardDetails" v-for="(item) in cardList" :key='item.id'>
          <p>{{item.typename}}</p>
          <p>{{item.account}}</p>
          <!-- <div :class="['deleteCard',{'deleteCardShow':deleteShow}]">
              <van-button type="danger">删除</van-button>
          </div> -->
        </li>
      </ul>
      <div style="padding:20px">
        <div class="registerBtn" @click="addCard">
                  {{$t('info.addCard')}}
        </div>
      </div>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
        name:this.$t('info.bannkList'),
        cardList:[],
        deleteShow:false
    };
  },
  methods: {
      /* 
        获取银行卡列表
      */
     myPaymentMethod(){
        this.globalApi.api.userinfo.myPaymentMethod().then(value=>{
              if(value.data.code == 1){
                  this.cardList = value.data.data.methodlist;
              }
          })
    },
    // 编辑银行卡
    editCard(){
      this.deleteShow = !this.deleteShow;
    },
    // 新增银行卡
    addCard(){
      this.$router.push({
        path:'/bankCard'
      })
    }
  },
  created() {

  },
  mounted() {
      this.myPaymentMethod();
  },
  components: {},
}
</script>

<style scoped lang='scss'>
    .cardList{
        @include layout;
        .cardDetails{
          background:#1B1F23;
          color:#fff;
          padding:10px;
          display:flex;
          justify-content: space-between;
          flex-direction: column;
          border-bottom:1px solid #ccc;
          line-height:1.5;
          margin-bottom:15px;
          position: relative;
          .deleteCard{
            position: absolute;
            right:-100%;
            top:0;
            height:100%;
            width:auto;
            transition:all 0.2s;
            .van-button{
              height:100%;
            }
          }
          .deleteCardShow{
            position: absolute;
            right:0%;
            top:0;
          }
        }
    }
    .registerBtn{
                background: #1881d2;
                color: #fff;
                font-size: 14px;
                margin-top: 35px;
                border-radius: 3px;
                padding: 8px 0;
                font-weight: 400;
                line-height: 1.5;
                text-align: center;
        }
</style>