<template>
  <div>
       <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <!--  -->
      <ul class="helplist">
          <li v-for="(item ,index) in goodList" :key='index'  @click="toConcent(item)">
              <p>
                  標題:{{item.title}}
              </p>
              <p>
                  關鍵字:{{item.keywords}}
              </p>
              <p>
                  描述:{{item.desc}}
              </p>
          </li>
      </ul>
      <!-- <div >
          <img :src="statics" alt="">
      </div>
      <ul class="staticchicken_list">
          <li v-for="(item,index) in goodList" :key='index'>
              <div>
                  <img :src="item.thumb" alt="">
              </div>
              <div class="list_tags">
                  <p class="name">
                      {{item.catename}}
                  </p>
                  <div class="profit">
                        8天28%
                        <span>
                            {{$t('info.contract')}}
                            <br>
                            {{$t('info.revenue')}}
                        </span>
                  </div>
                  <p class="value">
                      {{item.minprice}}-{{item.maxprice}}/只
                  </p>
              </div>
              
          </li>
          <li style="background:none"></li>
          <li style="background:none"></li>
          <li style="background:none"></li>
      </ul> -->

  </div>
</template>

<script>
import statics from '@/assets/image/static.png'
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
        name:this.$t('info.staticplay'),
        statics,
        img:[img1,img2,img3,img4,img5,img6,img7,img8],
        goodList:[]
    };
  },
  methods: {
      /* 
        获取商品
    */
    indexList(){
        this.globalApi.api.goods.indexList().then(value=>{
            console.log(value,'list')
              if(value.data.code == 1){
                  this.goodList = value.data.data;
              }
          })
    },
    /* 
        幫助中心
    */
   article(){
        this.globalApi.api.helpCenter.article().then(value=>{
            console.log(value,'list')
              if(value.data.code == 1){
                  this.goodList = value.data.data;
              }
          })
    },
    /* 
        跳去內容
    */
   toConcent(item){
       this.storeSession.save('content',item);
       this.$router.push({
           path:'/heplContent'
       })
   }
  },
  created() {

  },
  mounted() {
    //   this.indexList();
    this.article();
  },
  components: {},
}
</script>

<style lang='scss' scoped>
.staticchicken_list{
    margin-top:20px;
    padding:0 20px;
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
        width:32%;
        margin-bottom:10px;
        border-radius:10px;
        background:#192B39;
        padding-bottom:50px;
        position: relative;
        img{
            width:100%;
            height:110px;
        }
        .list_tags{
            position: absolute;
            left:0;
            top:80px;
            .name{
                background:rgba(0,0,0,0.3);
                text-align:center;
                font-weight: bold;
                color:#fff;
                line-height:1.5;
            }
            .profit{
                padding-left:40px;
                position: relative;
                line-height:30px;
                height:30px;
                color:#fff;
                font-weight:bold;
                font-style: italic;
                span{
                    position: absolute;
                    line-height:normal;
                    left:0;
                    top:0;
                    font-size:12px;
                }
            }
            .value{
                color:#fff;
                font-weight:bold;
                font-style: italic;
                line-height:normal;
                text-align: center;
                margin-top:5px;
                background:#281974
            }
        }
    }
}
.helplist{
    padding:20px;
    li{
        padding:10px;
        color:#fff;
        background:#102030;
        margin-bottom: 10px;
        line-height: 1.5;
    }
}
</style>