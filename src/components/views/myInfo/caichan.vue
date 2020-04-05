<template>
  <div>
      <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <!-- <ul class="myAssets">
          <li>
              <span>0</span>
              <p>{{$t('info.birdsNumber')}}</p>
          </li>
          <li>
              <span>0</span>
              <p>{{$t('info.titalassets')}}</p>
          </li>
          <i></i>
      </ul> -->
      <ul class="myAssetsList">
          <li>
              <img :src="timg" alt="">
              <div class="listInfo">
                  <p>
                      鴿子
                  </p>
                  <p>
                      {{$t('info.price')}}:10~20
                  </p>
                  <p>
                      {{$t('info.Opentime')}}:01:30 - 23:00
                  </p>
              </div>
          </li>
          <li>
              <img :src="timg" alt="">
              <div class="listInfo">
                  <p>
                      鴿子
                  </p>
                  <p>
                      {{$t('info.price')}}:10~20
                  </p>
                  <p>
                      {{$t('info.Opentime')}}:01:30 - 23:00
                  </p>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import timg from '@//assets/image/timg.jpg'
export default {
  data() {
    return {
        name:this.$t('info.Myassets'),
        timg,
        myassetList:[],
        total:0
    };
  },
  methods: {
      /* 
        我的资产
      */
     myAssets(){
         this.globalApi.api.userinfo.myAssets().then(value=>{
            console.log(value,'list')
              if(value.data.code == 1){
                  this.myassetList = value.data.data.assetslist.data;
                  this.total = value.data.data.assetslist.total;
              }
          })
     }
  },
  created() {

  },
  mounted() {
      this.myAssets();
  },
  components: {},
}
</script>

<style lang='scss' scoped>
    .myAssets{
        color:#fff;
        display:flex;
        margin:20px 0;
        height:50px;
        position: relative;
        li{
            flex:1;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            align-items:center;
            text-align: center;
            height: 100%;
            span{
                color:#2B9BFF;
                font-size:18px;
            }
        }
        i{
            width:0;
            height:50px;
            border:1px solid #fff;
            position: absolute;
            left:50%;
            margin-left:-0.5px;

        }
    }
    
</style>