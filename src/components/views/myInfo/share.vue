<template>
  <div class='integraldetailslayout'>
       <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <div class="sharelayout">
          <div>

          </div>
          <p>
              {{$t('info.Hundredbirdscoming')}}
          </p>
          <div class="sharelink">
              <div>
                  <img class="erweima" :src="erweima" alt="">
              </div>
              <p class="shareweb">
                  http://fanyi.youdao.com/
              </p>
              <p class="sharetips">
                  <span>
                      {{$t('info.Copydownloadlink')}}
                  </span>
              </p>
          </div>
          <div class="sharecopy">
              <p>
                  {{$t('info.sharecode')}}:ABCDEFG({{$t('info.replication')}})
              </p>
          </div>
      </div>
  </div>
</template>

<script>
import erweima from '@/assets/image/erweima.png'
export default {
  data() {
    return {
        name:this.$t('info.Sharingrecommendation'),
        erweima
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
.integraldetailslayout{
    height:100%;
    display:flex;
    flex-direction: column;
}
    .sharelayout{
        flex:1;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        color:#fff;
        .sharelink{
            margin-top:30px;
            width:320px;
            height:280px;
            background:#1B1E23;
            text-align: center;
            padding-top:40px;
            box-sizing: border-box;
            border-radius: 20px;
            .erweima{
                width:150px;
                height:150px;
            }
            .shareweb{
                margin-top:20px;
            }
            .sharetips{
                margin-top:20px;
                span{
                    background:#2FCD78;
                    padding:5px 10px;
                    border-radius:10px;
                }
            }
        }
        .sharecopy{
            margin-top:30px;
            p{  
                display:inline-block;
                width:320px;
                background:#F14545;
                text-align: center;
                line-height:2.5;
                border-radius:10px;
            }
        }
    }
</style>