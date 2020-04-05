<template>
  <div class="recordLayout">
    <!-- 头部 -->
    <BaseHeader :name="name"></BaseHeader>
    <!--  -->
    <van-tabs v-model="active" @change="change">
      <van-tab v-for="(item,index) in recordList" :key="index" :title="item.name"></van-tab>
    </van-tabs>
    <div class="recorsList" v-if="recorsList.length"> 
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        
        <ul class="myAssetsList" >
            <li v-for="(item,index) in recorsList" :key='index'>
                <div class="goodsInfo2">
                        <p>訂單編號:{{item.ordersn}}</p>
                        <p>價格:{{item.price}}</p>
                        <p>智能合約收益:{{item.cycle}}天/{{item.figure}}%</p>
                        <p>購買時間:{{item.createtime}}</p>
                        <p>收款賬號:{{item.seller_paymentmethod[0].account}}</p>
                </div>

                <div class="listBtn" v-if="item.status == 0">
                  <van-button round type="info" size="small" @click="toPay(item.id,1,item.payment_voucher)">{{$t('info.topay')}}</van-button>
                </div>
                <div class="listBtn" v-if="item.status == 1" @click="toPay(item.id,2,item.payment_voucher)">
                  <van-button round type="info" size="small" >待審核</van-button>
                </div>
                <div class="listBtn" v-if="item.status == 2" @click="toPay(item.id,2,item.payment_voucher)">
                  <van-button round type="info" size="small" >已付款</van-button>
                </div>
                <div class="listBtn" v-if="item.status == 3" @click="toPay(item.id,2,item.payment_voucher)">
                  <van-button round type="info" size="small" >已轉讓</van-button>
                </div>
            </li>
        </ul>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="recorsList recorsnoList" v-if="!recorsList.length">
          暂无订单
    </div>
  </div>
</template>

<script>
import timg from "@//assets/image/timg.jpg";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      timg,
      name: this.$t("info.panicBuyingRecord"),
      active: 0,
      recorsList: [],
      type: 1,
      recordList: [
        {
          name: '捕獲中',
          type: 1
        },
        {
          name: this.$t("info.Purchase"),
          type: 2
        },
        {
          name: '已取消',
          type: 3
        }
      ]
    };
  },
  methods: {
    onRefresh() {
      this.isLoading = true;
      this.record().then(value=>{
        this.isLoading = false;
      })
    },
    onLoad() {
      setTimeout(()=>{
        this.finished = true;
      },1000)
    },
    change(val) {
      this.type = this.recordList[val].type;
      this.record();
    },
    // 获取列表
    record(type=1) {
      // 1-待付款，2-已捕到
      let params = {
        type: this.type
      };
      return this.globalApi.api.record.orderIndex(params).then(value => {
        if (value.data.code == 1) {
          console.log(value.data.data.orderlist.data)
          if(type == 1){
              this.recorsList = value.data.data.orderlist.data;
          }else{
              this.recorsList = this.recorsList.concat(value.data.data.orderlist.data)
          }
            
        } else {
          this.$toast.fail(value.data.msg);
        }
      });
    },
    // 去付款
    toPay(id,type =2,img) {
      this.$router.push({
        path: "/listDetails",
        query:{
          id,type,img
        }
      });
    }
  },
  created() {},
  mounted() {
    this.record();
  },
  components: {}
};
</script>

<style scoped lang='scss'>
.recordLayout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
/deep/ .van-tabs {
  .van-tabs__nav {
    background: transparent;
    .van-tab {
      color: #fff;
    }
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0px 0 !important;
  }
}
.recorsList {
  flex: 1;
  color: #fff;
}
.recorsnoList {
  display: flex;
  justify-content: center;
  align-items: center;
}
.listBtn {
  display: flex;
  justify-content: flex-end;
}
</style>