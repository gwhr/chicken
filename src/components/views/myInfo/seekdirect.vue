<template>
  <div>
       <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <div class="seekdirect">
          <span class="fangdajing">
              <i  class=" iconfont iconfangdajing"></i>
          </span>
          <span class="condition">
              <input v-model="model" :placeholder="$t('info.accountandphone')" />
          </span>
          <span class="seek">
              {{$t('info.seek')}}
          </span>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        name:this.$t('info.Findsubordinate'),
        model:''
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

    .seekdirect{
        display:flex;
        margin-top:20px;
        justify-content: space-around;
        padding:0 20px;
        .fangdajing{
            flex:1;
            color:#fff;
            text-align: center;
            font-size:18px; 
            display:flex;
            justify-content: center;
            align-items: center;
        }
        input{
            
            padding:5px 10px;
            border:1px solid #7199C1;
            border-radius:10px;
            line-height:1.5;
            background:#2F3D4A;
            color:#fff;
            &::-webkit-input-placeholder{
                    color: #fff;
                }
            &::-moz-placeholder{  //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
                    color: #fff;        
            }
            &:-ms-input-placeholder{  //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
                    color: #fff;        
            }
        }
    }
    .condition{
        flex:3;
    }
    .seek{
        line-height:2.5;
        color:#fff;
        border-radius:10px;
        background:#F14545;
        flex:1;
        text-align: center;
    }
</style>