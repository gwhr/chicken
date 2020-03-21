<template>
  <div>
      <!-- 头部 -->
      <BaseHeader
        :name='name'
      ></BaseHeader>
      <div class="indexdetails">
          <div class="content">
              公告詳情3月14日下午，湖北省新型冠狀病毒肺炎疫情防控工作指揮部召開第46場新聞發佈會，介紹湖北省疫情風險等級評估和分區分級調整社區（村）管控措施，農民工安全有序流動的相關工作，交通部門安全有序組織人員流動的交通保障安排。
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        name:this.$t('info.Announcementdetails'),
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
.indexdetails{
    padding:0 20px;
    margin-top:20px;
   .content{
       color:#fff;
       line-height:1.5;
       background:#1A2E47;
       padding:20px;
   }
    
}
</style>