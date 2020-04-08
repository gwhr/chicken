<template>
  <div class='integraldetailslayout'>
      <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <Baselist 
            :list="list"
            :options='options'
            type="2">
          </Baselist>
        </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
import timg from '@//assets/image/timg.jpg'
export default {
  data() {
    return {
        page:1,
        total:0,
        loading: false,
        finished: false,
        isLoading: false,
        name:this.$t('info.promotional'),
        timg,
        list:[],
        options:[]
    };
  },
  methods: {
    onRefresh() {
      this.isLoading = true;
      this.page = 1;
      this.incomeLog().then(value=>{
        this.isLoading = false;
      })
    },
    onLoad() {
      this.incomeLog(2).then(value => {
         this.loading = false;
        if(this.total == this.list.length){
          this.finished = true;
        }
      });
      this.page++;
    },
    /* 
        收益记录
      */
     incomeLog(type = 1){
       let params = {
         type:1,
         page:this.page
       }
       return  this.globalApi.api.userinfo.incomeLog(params).then(value=>{
            console.log(value.data.data.loglist,'list')
              if(value.data.code == 1){
                  if(type == 1){
                      this.list = value.data.data.loglist.data;
                  }else{
                      this.list = this.list.concat(value.data.data.loglist.data)
                  }
                  this.total = value.data.data.loglist.total;
              }
          })
     }
  },
  created() {
    this.options.push({
        name:this.$t('info.Birdsgain'),
        value:'integral'
    })
    this.options.push({
        name:this.$t('info.revenueType'),
        value:'typename'
    })
    this.options.push({
        name:this.$t('info.createtime'),
        value:'createtime'
    })
  },
  mounted() {
    this.incomeLog();
  },
  components: {},
}
</script>

<style lang='scss' scoped>
.integraldetailslayout{
    height:100%;
    display:flex;
    flex-direction: column;
}
.integraldetails{
    felx:1;
    display:flex;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    color:#fff;
}
</style>