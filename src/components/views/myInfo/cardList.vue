<template>
  <div>
      <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <!--  -->
      <div class="cardList">

      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        name:this.$t('info.bannkList')
    };
  },
  methods: {
      /* 
        获取银行卡列表
      */
     myPaymentMethod(){
        this.globalApi.api.userinfo.myPaymentMethod().then(value=>{
            console.log(value,'list')
              if(value.data.code == 1){
                  
              }
          })
    },
  },
  created() {

  },
  mounted() {
      this.myPaymentMethod();
  },
  components: {},
}
</script>

<style scoped lang='scss'>
    .cardList{
        @include layout;
    }
</style>