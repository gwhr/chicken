<template>
  <div>
       <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <!--  -->
      <div >
          <img :src="statics" alt="">
      </div>
      <ul class="staticchicken_list">
          <li v-for="(item,index) in 8" :key='index'>
              <div>
                  <img :src="img[index]" alt="">
              </div>
              <div class="list_tags">
                  <p class="name">
                      鳳凰
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
                      價值100-300
                  </p>
              </div>
              
          </li>
          <li style="background:none"></li>
          <li style="background:none"></li>
          <li style="background:none"></li>
      </ul>
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
        img:[img1,img2,img3,img4,img5,img6,img7,img8]
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

</style>