<template>
  <div>
       <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <!--  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
        name:this.$t('info.dynamicplay'),
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

<style>


</style>