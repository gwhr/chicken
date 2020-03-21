<template>
  <div>
      <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <div class="panicRules">
          <p>
              {{$t('info.Panicbuyingrules')}}
          </p>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        name:this.$t('info.Panicbuyingrules')
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
.panicRules{
    color:#fff;
    padding:20px
}
</style>