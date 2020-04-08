<template>
  <div class="recordLayout">
      <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <!--  -->
      <!-- <van-tabs v-model="active">
        <van-tab v-for='(item,index) in recordList' :key='index' :title="item.name"></van-tab>
      </van-tabs> -->
      <div class="recorsList" v-if="teamlist.length">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <ul class="myAssetsList">
                <li v-for="(item,index) in teamlist" :key='index'>
                    <div class="goodsInfo2">
                            <p>
                                {{$t('info.teamAccount')}}:{{item.account}}
                            </p>
                            <p>
                                暱稱:{{item.nickname}}
                            </p>
                            <p>
                                資產:{{item.now_money}}
                            </p>
                            <p>
                                金幣:{{item.integral}}
                            </p>
                    </div>
                    <div class="listBtn">
                      <van-button round type="info" size="small" @click="tozz(item)">贈送積分</van-button>
                    </div>
                   
                </li>
            </ul>
            </van-list>
          </van-pull-refresh>
      </div>
      <div class="recorsList recorsnoList" v-if="!teamlist.length">
          <p class="teamNumber">
              {{$t('info.totaoman')}}:
              <span>0</span>
          </p>
          {{$t('info.noData')}}
      </div>
      <van-dialog v-model="show" title="" show-cancel-button @confirm="confirm">
        <div style="padding: 10px;">
                  <van-row>
                    <van-col span="12">請輸入轉賬金額</van-col>
                    <van-col span="10" offset="2">
                        <input v-model="value" style='border:none;' type="number">
                    </van-col>
                  </van-row>
        </div>
        
      </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
        page:1,
        total:0,
        show:false,
        number:'',
        loading: false,
        finished: false,
        isLoading: false,
        name:this.$t('info.myteam'),
        active:0,
        mobile:'',
        teamlist:[],
        recordList:[
          {
            name:this.$t('info.Directinferiors')
          },
        ],
        value:0
    };
  },
  methods: {
    onRefresh() {
      this.isLoading = true;
      this.page = 1;
      this.myTeam().then(value => {
        this.isLoading = false;
      });
    },
    confirm(){
      this.givingIntegral();
    },
    onLoad() {
      this.myTeam(2).then(value => {
         this.loading = false;
        if(this.total == this.teamlist.length){
          this.finished = true;
        }
      });
      this.page++;
    },
    /* 
        我的团队
      */
     myTeam(type = 1){
       let params = {
          page:this.page
        }
        return this.globalApi.api.userinfo.myTeam(params).then(value=>{
            console.log(value,'list')
              if(value.data.code == 1){
                  if(type == 1){
                    this.teamlist = value.data.data.teamlist.data;
                  }else{
                    this.teamlist = this.teamlist.concat(value.data.data.teamlist.data);
                  }
                  this.total = value.data.data.teamlist.total;
              }
          })
     },
     /* 
        我的团队
      */
     givingIntegral(){
     let params = {
        integral:this.value,
        mobile:this.mobile
     }
         this.globalApi.api.userinfo.givingIntegral(params).then(value=>{
                  this.$toast.success(value.data.msg)
                  this.myTeam();
          })
     },
     tozz(item){
        this.show = true;
        this.mobile = item.account;
        
     }
  },
  created() {

  },
  mounted() {
    this.myTeam();
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
    position: relative;
    .teamNumber{
        position: absolute;
        left:20px;
        top:10px;
        color:#44BC46;
        span{
            margin-left:5px;
        }
    }
  }
  .recorsnoList{
    display:flex;
    justify-content: center;
    align-items: center;
  }
</style>