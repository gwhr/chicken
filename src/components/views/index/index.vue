<!--
 * @Author: your name
 * @Date: 2020-03-10 11:55:18
 * @LastEditTime: 2020-03-11 10:26:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bolg_webd:\私活\鸡-10K\chicken\src\components\views\index\index.vue
 -->
<template>
  <div>
      <!-- 跑马灯 -->
      <div class="index_lunbo" @click='toindexdetails'>
          <span><i class="iconfont iconweibiaoti1"></i>{{$t('info.Notice')}}:</span>
          <MarqueeTips content="歡迎來到百鳥朝鳳平臺!!!" ></MarqueeTips>
      </div>
      <!-- 轮播 -->
      <div >
          <div class="swiper-container index_swiper" >
            <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item) in imgList" :key="item.id">
                        <img :src="item.img" alt="" class="swiper_img">
                    </div>
                </div>
                <div class="swiper-pagination"></div><!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
            </div>
      </div>
      <!-- 列表 -->
      <ul class="chickenList">
          <li class="chickenlist_li" v-for="(item,index) in goodList">
                <div>
                    <img :src='item.thumb' alt="" class="chicken_img">
                </div>
                <p class="chicken_name">{{item.catename}}</p>
                <p class="chicken_price">
                    {{$t('info.price')}}:{{item.minprice}}-{{item.maxprice}}/只
                </p>
                <p class="chicken_price">智能合約收益:{{item.cycle}}天/{{item.figure}}%</p>
                <div class="chicken_price chicken_time">
                    <p>{{$t('info.Opentime')}}</p>
                    <p>{{item.adopt_time}}</p>
                </div>
                <div class="chicken_price">{{$t('info.integral')}}:{{item.adopt_integral}}</div>
                <!-- <div v-if="item.block_state = 0"  :class="['chicken_btn','chicken_buying','chicken_grow']">
                    <span @click="appointment(item.id)"  >{{$t('info.Reservations')}}</span>
                </div>
                <div v-if="item.block_state == 1"  :class="['chicken_btn','chicken_buying','chicken_grow']">
                    <span   >{{$t('info.reproduction')}}</span>
                </div> -->
                 <div v-if="item.block_state != 3" :class="['chicken_btn','chicken_buying',]">
                    <span  >敬请期待</span>
                </div>
                <div v-if="item.block_state == 3" :class="['chicken_btn','chicken_buying',]">
                    <span @click="appointment(item.id)">{{$t('info.panicing')}}</span>
                </div>
          </li>
      </ul>
  </div>
</template>

<script>
// swiper
import Swiper from 'swiper' 
import 'swiper/css/swiper.min.css'
import MarqueeTips from 'vue-marquee-tips';
import timg from '@//assets/image/timg.jpg'
import timg2 from '@//assets/image/timg2.jpg'
import timg3 from '@//assets/image/timg3.jpg'
import chicken from '@//assets/image/pet4.gif'
import img1 from '@//assets/image/img1.gif'
import img2 from '@//assets/image/img2.gif'
import img3 from '@//assets/image/img3.gif'
import img4 from '@//assets/image/img4.gif'
import img5 from '@//assets/image/img5.gif'
import img6 from '@//assets/image/img6.gif'
import img7 from '@//assets/image/img7.gif'
import img8 from '@//assets/image/img8.gif'
export default {
  data() {
    return {
        timg,
        timg3,
        timg2,
        chicken,  
        chickenStatu:1,
        goodList:[],
        img:[img1,img2,img3,img4,img5,img6,img7,img8],
        nowDate:'',
        imgList:[]
    };
  },
  methods: {
      toindexdetails(){
          this.$router.push({
              path:'/indexdetails'
          })
      },
    /* 
        获取商品
    */
    indexList(){
        this.globalApi.api.goods.indexList().then(value=>{
            console.log(value,'list')
              if(value.data.code == 1){
                  this.goodList = value.data.data;
                   console.log(this.goodList)
                  this.goodList.forEach(v=>{
                      this.$set(v,'startTime',v.adopt_time.split('-')[0]);
                      this.$set(v,'endTime',v.adopt_time.split('-')[1]);
                      if(this.nowDate >v.startTime && this.nowDate<v.endTime){
                          this.$set(v,'appoimentStatus',false);
                      }else{
                          this.$set(v,'appoimentStatus',true);
                      }
                  })
                  console.log(this.goodList)
              }
          })
    },
    /* 
        预约捕捞
    */
   appointment(id){
       let params = {
           id
       }
       this.globalApi.api.goods.appointment(params).then(value=>{
            console.log(value,'bulao')
              if(value.data.code == 1){
                  this.$toast.success(value.data.msg);
                  this.indexList();
              }else{
                  this.$toast.fail(value.data.msg)
                  
              }
          })
   },
   /* 
    获取轮播图
   */
  slide(id){
       let params = {
           id
       }
       this.globalApi.api.goods.slide(params).then(value=>{
            console.log(value,'bulao')
              if(value.data.code == 1){
                  this.imgList = value.data.data;
                  this.$nextTick(()=>{
                      var mySwiper = new Swiper('.swiper-container', {
                            autoplay: {
                                delay: 2000,//1秒切换一次
                                disableOnInteraction: false
                            },
                            loop : true,
                        })
                    })
                  
              }else{
                  this.$toast.fail(value.data.msg)
                  
              }
          })
   }
  },
  created() {
      this.globalApi.api.getsystemTime.getsystemTime().then(value=>{
            console.log(value,'list');
          })
  },
  mounted() {
      this.indexList();
      this.slide();
      
      
  },
  components: {
      MarqueeTips
  },
}
</script>

<style lang='scss'>

    .index_lunbo{
        height:44px;
        line-height:44px;
        position: relative;
        background-color: #102030;
        color:#fff;
        font-size:16px;
        box-sizing: border-box;
        padding-left:90px;
        display: flex;
        span{
            i{
                margin-right:5px;
                font-size:20px;
            }
            position: absolute;
            left:20px;
            font-size:20px;
        }
    }
    .index_swiper{
        width:100%;
        height:200px;
        background:#fff;
        .swiper_img{
            width:100%;
            height:100%;
        }
    }
    .chickenList{
        display:flex;
        flex-wrap: wrap;
        padding:10px 30px;
        justify-content: space-between;
        .chickenlist_li{
            width:49%;
            background:#1B1F23;
            box-sizing: border-box;
            padding:5px 10px;
            text-align: center;
            color:#fff;
            border-radius:5px;
            margin-bottom:10px;
            .chicken_img{
                width:100px;
                height:100px;
                margin-bottom:20px;
            }
            .chicken_name{
                color:#2EC474;
                font-size:18px;
                margin-bottom:20px;
            }
            .chicken_price{
                margin-bottom:10px;
            }
            .chicken_insert{
                padding:5px;
                background: #3B1D56;
                border-radius:5px;
                line-height:1.5;
            }
            .chicken_time{
                p{
                    margin-bottom: 5px;
                }
            }
            .chicken_btn{
                height:40px;
                line-height:40px;
                font-size:20px;
                text-align:center;
                border-radius:10px;
            }
            .chicken_buying{
                background:#F04544;
            }
            .chicken_grow{
                background:#303030;
            }
        }
    }
</style>