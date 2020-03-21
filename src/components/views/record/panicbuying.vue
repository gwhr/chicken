<template>
  <div class="recordLayout">
      <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <!--  -->
      <van-tabs v-model="active">
        <van-tab v-for='(item,index) in recordList' :key='index' :title="item.name"></van-tab>
      </van-tabs>
      <div class="recorsList" v-if="recorsList.length">

      </div>
      <div class="recorsList recorsnoList" v-if="!recorsList.length">
          暂无订单
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        name:this.$t('info.panicBuyingRecord'),
        active:0,
        recorsList:[],
        recordList:[
          {
            name:this.$t('info.Unpaid')
          },
          {
            name:this.$t('info.confirmed')
          },
          {
            name:this.$t('info.Purchase')
          },
          {
            name:this.$t('info.Auditfailure')
          },
        ]
    };
  },
  methods: {

  },
  created() {

  },
  mounted() {

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