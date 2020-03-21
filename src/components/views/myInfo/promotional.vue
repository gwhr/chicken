<template>
  <div class='integraldetailslayout'>
      <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <div class="integraldetails">
          <span>{{$t('info.Nogains')}}</span>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        name:this.$t('info.promotional')
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
.integraldetails{
    flex:1;
    display:flex;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    color:#fff;
}
</style>