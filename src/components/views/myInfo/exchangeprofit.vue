<template>
  <div>
      <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <div class="myscore">
          <p>
              {{$t('info.Mypoints')}}:0
          </p>
          <div class='score_btn'>
              <span>{{$t('info.withdrawal')}}</span>
              <span>{{$t('info.withdrawalrecord')}}</span>
          </div>
      </div>
      <div class="rules">
          <span @click='tolink'>
              {{$t('info.Exchangerules')}}
          </span>
      </div>
       <!-- 列表 -->
      <!-- 列表 -->
      <ul class="chickenList">
          <li class="chickenlist_li" v-for="(item,index) in 8">
                <div>
                    <img :src='img[index]' alt="" class="chicken_img">
                </div>
                <p class="chicken_name">小公雞</p>
                <p class="chicken_price">
                    {{$t('info.price')}}:100-300/只
                </p>
                <p class="chicken_price">
                    {{$t('info.Number')}}:50
                </p>
                <div class="chicken_price chicken_time">
                    <p>{{$t('info.Opentime')}}</p>
                    <p>22:22:00</p>
                </div>
                <div class="chicken_price">{{$t('info.integral')}}:3/5</div>
                <div class="chicken_price chicken_insert">
                    {{$t('info.Smartcontractrevenue')}}:8天/28%
                </div>
                <div  :class="['chicken_btn',{'chicken_buying': index%2 == 0? true: false},{'chicken_grow':index%2 == 0? false: true}]">
                    <span>{{$t('info.panicing')}}</span>
                </div>
          </li>
      </ul>
  </div>
</template>

<script>
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
        name:this.$t('info.extensionchange'),
         timg,
        timg3,
        timg2,
        chicken,
        chickenStatu:1,
        img:[img1,img2,img3,img4,img5,img6,img7,img8]
    };
  },
  methods: {
  
    tolink(){
        // this.$router,push({
        //     path:'/exchangeprofit'
        // })
    }
  },
  created() {

  },
  mounted() {

  },
  components: {},
}
</script>

<style lang='scss' scoped>
.myscore{
    background:#1B1F23;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-top:1px solid #fff;
    border-bottom:1px solid #fff;
    color:#fff;
    height:100px;
    text-align: center;
    .score_btn{
        display:flex;
        justify-content: center;
        margin-top:20px;
        span{
            padding:10px 15px;
            background:#F04544;
            margin-left:20px;
            border-radius:10px;
        }

    }
}
    .rules{
        margin-top:20px;
        color:#333;
        padding-left:20px;
        span{
            background:#fff;
            padding:5px 10px;
            border-radius:5px;
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
                height:50px;
                line-height:50px;
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