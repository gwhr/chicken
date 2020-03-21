 <!--
 * @Author: your name
 * @Date: 2020-03-07 11:31:02
 * @LastEditTime: 2020-03-10 09:42:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bolg_webd:\私活\鸡-10K\chicken\src\components\header\header.vue
 -->
<template>
  <div class="header">
      <span>{{name}}</span>
      <span class="back" @click="toback" v-show='backShow'>
        <i class="iconfont iconfanhui"></i>
      </span>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props:{
    name:{
      default(){
        return '名字'
      }
    },
    backShow:{
      default(){
        return true
      }
    }
  },
  methods: {
    toback(){
      this.$router.go(-1);
    }
  },
  created() {

  },
  mounted() {

  },
  components: {},
}
</script>

<style lang='scss'>
    .header{
        height:44px;
        line-height:44px;
        position: relative;
        background-color: #102030;
        color:#fff;
        text-align:center;
        font-size:16px;
        .back{
          position: absolute;
          left:0;
          top:0;
          padding-left:10px;
        }
    }
</style>