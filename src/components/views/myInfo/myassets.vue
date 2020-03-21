<template>
  <div>
      <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <ul class="myAssets">
          <li>
              <span>0</span>
              <p>{{$t('info.birdsNumber')}}</p>
          </li>
          <li>
              <span>0</span>
              <p>{{$t('info.titalassets')}}</p>
          </li>
          <i></i>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
        name:this.$t('info.Myassets')
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