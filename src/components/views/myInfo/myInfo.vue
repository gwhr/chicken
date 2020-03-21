<!--
 * @Author: your name
 * @Date: 2020-03-11 14:14:06
 * @LastEditTime: 2020-03-11 15:51:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bolg_webd:\私活\鸡-10K\chicken\src\components\views\myInfo\myInfo.vue
 -->
<template>
  <div class="myinfo">
      <div class="myinfo_header">
          <div class="myinfo_avator">
              <img :src="timg" alt="">
              <div class="myinfo_infos">
                  <div class="myinfo_status">
                      <span>{{$t('info.unaudited')}}</span>
                  </div>
                  <span>ID/{{$t('info.phone')}}:{{userInfo.account}}</span>
              </div>
          </div>
          <ul class="myinfo_record">
              <li class="myinfo_recordlist" @click='toRecord("/appointmentrecord")'>
                  <span>
                      <i class='iconfont iconweibiaoti-_huabanfuben'></i>
                  </span>
                  <span>{{$t('info.appointment')}}</span>
              </li>
              <li class="myinfo_recordlist" @click='toRecord("/panicbuying")'>
                  <span>
                      <i class='iconfont iconweibiaoti-_huabanfuben'></i>
                  </span>
                  <span>{{$t('info.panicBuyingRecord')}}</span>
              </li>
              <li class="myinfo_recordlist" @click='toRecord("/transfer")'>
                  <span>
                      <i class='iconfont iconweibiaoti-_huabanfuben'></i>
                  </span>
                  <span>{{$t('info.Transfer')}}</span>
              </li>
          </ul>
      </div>
      <ul class="myinfo_assets">
          <li  v-for = '(item,index) in  assets' :key = 'index' @click='toRecord(item.path)'>
              <div>
                  <p class="myinfo_assets_number">{{item.value}}</p>
                  <span>{{item.name}}</span>
              </div>
          </li>
      </ul>
      <ul class="myinfo_assets">
          <li v-for = '(item,index) in  others' :key = 'index' @click='toRecord(item.path)'>
              <div >
                  <p class="myinfo_assets_icon">
                      <i class='iconfont iconweixin' v-if="index == 0"></i>
                      <i class='iconfont iconshimingyanzheng' v-if="index == 1"></i>
                      <i class='iconfont iconzhifubao' v-if="index == 2"></i>
                      <i class='iconfont iconiconfonttubiao_zuanshi' v-if="index == 3"></i>
                      <i class='iconfont iconshezhi' v-if="index == 4"></i>
                  </p>
                
                  <span>{{item.name}}</span>
              </div>
          </li>
          <li></li>
      </ul>
  </div>
</template>

<script>
import timg from '@//assets/image/timg.jpg'
export default {
  data() {
    return {
        userInfo:{},
        timg,
        assets:[
            {
                name:this.$t('info.chickenNumbers'),
                path:'',
                dataName:'',
                value:''
            },
            {
                name:this.$t('info.titalassets'),
                path:'/myassets',
                dataName:'',
                value:''
            },
            {
                name:this.$t('info.integral'),
                path:'/integraldetails',
                dataName:'integral',
                value:''
            },
            {
                name:this.$t('info.chickenprofit'),
                path:'/bird',
                dataName:'',
                value:''
            },
            {
                name:this.$t('info.extensionprofit'),
                path:'/promotional',
                dataName:'',
                value:''
            },
            {
                name:this.$t('info.extensionchange'),
                path:'/exchangeprofit',
                dataName:'',
                value:''
            },
        ],
        others:[
            {
                name:this.$t('info.sharingrecommendation'),
                path:'/share'
            },
            {
                name:this.$t('info.realname'),
                path:'/realname'
            },
            {
                name:this.$t('info.collectioninformation'),
                path:'/bankCard'
            },
            {
                name:this.$t('info.myteam'),
                path:'/myteam'
            },
            {
                name:this.$t('info.setting'),
                path:'/setting'
            },
        ]
    };
  },
  methods: {
      toRecord(path){
          this.$router.push({
              path
          })
      },
      /* 
        获取个人信息
      */
     memberInfo(){
         this.globalApi.api.userinfo.memberInfo().then(value=>{
            console.log(value,'list')
              if(value.data.code == 1){
                  this.userInfo = value.data.data.member;
                  this.assets.forEach(v=>{
                    if(this.userInfo[v.dataName]){
                        v.value = this.userInfo[v.dataName];
                    }
                      
                  })
              }
          })
     }
  },
  created() {

  },
  mounted() {
      this.memberInfo();
  },
  components: {},
}
</script>

<style lang="scss" scoped>
.myinfo{
    @include layout;
    margin-top:20px;
    .myinfo_header{
        .myinfo_avator{
            display:flex;
            margin-bottom: 30px;;
            img{
                width:80px;
                height:80px;
                border-radius:50%;
                margin-right:20px;
            }
            .myinfo_infos{
                display:flex;
                flex-direction: column;
                justify-content: space-between;
                padding:20px 0;
                .myinfo_status{
                    span{
                        padding:5px 8px;
                        background:#60A1D9;
                    }
                    
                }
            }
        }
        .myinfo_record{
            display:flex;
            justify-content: space-between;
            .myinfo_recordlist{
                width:32%;
                background:#1B1E25;
                height:110px;
                display:flex;
                justify-content: space-between;
                flex-direction: column;
                align-items: center;
                padding:20px 0;
                i{
                    font-size:18px;
                }
            }
        }
    }
    .myinfo_assets{
        margin-top:45px;
        background:#1B1E25;
        height:180px;
        box-sizing: border-box;
        padding:0 20px;
        padding-top:30px;
        display:flex;
        flex-wrap: wrap;
        position: relative;
        justify-content: space-around;
        li{
            width:33%;
            text-align:center;
            .myinfo_assets_number{
                color:#3F9CE0;
                margin-bottom:10px;
            }
            .myinfo_assets_icon{
                margin-bottom:10px;
                font-size:14px;
            }
        }
    }
}
</style>