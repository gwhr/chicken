<template>
  <div class="integraldetailslayout">
    <!-- 头部 -->
    <BaseHeader :name="name">
      <template v-slot:operation>
        <div @click="Recharge">{{$t('info.Recharge')}}</div>
      </template>
    </BaseHeader>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ul class="myAssetsList">
          <li v-for="(item,index) in myassetList" :key="index">
            <div class="goodsInfo">
              <img :src="item.thumb" alt />
              <div class="listInfo">
                <p>{{item.catename}}</p>
                <p>{{$t('info.price')}}:{{item.minprice}}~{{item.maxprice}}</p>
                <p>
                  <!-- {{item.catename}} -->
                </p>
              </div>
            </div>

            <slot name="define"></slot>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
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
      page:1,
      total:0,
      name: this.$t("info.Myassets"),
      timg,
      myassetList: [],
      options: []
    };
  },
  methods: {
    //   充值
    Recharge() {
      this.$router.push({
        path: "/alipay"
      });
    },
    onRefresh() {
      this.isLoading = true;
      this.page = 1;
      this.myAssets().then(value => {
        this.isLoading = false;
      });
    },
    onLoad() {
      this.myAssets(2).then(value => {
         this.loading = false;
        if(this.total == this.myassetList.length){
          this.finished = true;
        }
      });
      this.page++;
    },
    /* 
        我的资产
      */
    myAssets() {
      let params = {
          page:this.page
        }
     return this.globalApi.api.userinfo.myAssets(params).then(value => {
        console.log(value, "list");
        if (value.data.code == 1) {
          // this.myassetList = value.data.data.assetslist.data;
          this.total = value.data.data.assetslist.total;
          this.myassetList = this.myassetList.concat(value.data.data.assetslist.data)
        }
      });
    },
    /* 
        轉正
    */
   givingIntegral(){
       let params = {
           mobile,
           integral:this.value
       }
    this.globalApi.api.userinfo.givingIntegral().then(value => {
        console.log(value, "list");
        if (value.data.code == 1) {
         this.$toast.success(value.data.msg)
        }
      });
    }
  },
  created() {
    this.options.push({
      name: this.$t("info.Birdsgain"),
      value: "catename"
    });
    this.options.push({
      name: this.$t("info.revenueType"),
      value: "typename"
    });
    this.options.push({
      name: this.$t("info.createtime"),
      value: "createtime"
    });
  },
  mounted() {
    // this.myAssets();
  },
  components: {}
};
</script>

<style lang='scss' scoped>
.integraldetailslayout {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.integraldetails {
  felx: 1;
  display: flex;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
</style>