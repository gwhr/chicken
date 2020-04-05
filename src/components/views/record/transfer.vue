<template>
  <div class="recordLayout">
      <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <!--  -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <ul class="myAssetsList" >
            <li v-for="(item,index) in recorsList" :key='index'>
                <div class="goodsInfo2">
                        <p >
                            金幣:{{item.integral}}
                        </p>
                        <p >
                            操作類型:{{item.typename}}
                        </p>
                        <p >
                            操作時間:{{item.createtime}}
                        </p>
                </div>

                <slot name="define"></slot>
            </li>
        </ul>
        </van-list>
      </van-pull-refresh>
      <div class="recorsList recorsnoList" v-if="!recorsList.length">
          暂无订单
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        loading: false,
        finished: false,
        isLoading: false,
        name:this.$t('info.Transfer'),
        active:0,
        page:1,
        total:0,
        recorsList:[],
        recordList:[
          {
            name:this.$t('info.tobeTransfer')
          },
          {
            name:this.$t('info.pendingpayment')
          },
          {
            name:this.$t('info.Tobeconfirmed')
          },
          {
            name:this.$t('info.Completed')
          },
        ]
    };
  },
  methods: {
    onRefresh() {
      this.isLoading = true;
      this.page = 1;
      this.integralLog().then(value=>{
        this.isLoading = false;
      })
    },
    onLoad() {
      this.integralLog(2).then(value=>{
        this.loading = false;
        if(this.total == this.recorsList.length){
          this.finished = true;
        }
      })
      this.page++;
    },
    /* 
        金幣記錄
      */
     integralLog(type = 1){
        let params = {
          page:this.page
        }
       return  this.globalApi.api.record.integralLog(params).then(value=>{
            console.log(value,'list')
              if(value.data.code == 1){
                this.total = value.data.data.loglist.total
                if(type == 1){
                    this.recorsList = value.data.data.loglist.data;
                }else{
                    this.recorsList = this.recorsList.concat(value.data.data.loglist.data)
                }
              }
          })
     }
  },
  created() {

  },
  mounted() {
    // this.integralLog();
  },
  components: {},
}
</script>

<style scoped lang='scss'>
.recordLayout{
  display:flex;
  flex-direction: column;
  height:100%;
}
  /deep/ .van-tabs{
    .van-tabs__nav{
        background:transparent;
        .van-tab{
          color:#fff;
        } 
    }
    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
          border-width: 0px 0 !important;
      }
  }
  .recorsList{
    flex:1;
    color:#fff;
  }
  .recorsnoList{
    display:flex;
    justify-content: center;
    align-items: center;
  }
</style>