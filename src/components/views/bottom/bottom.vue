<!--
 * @Author: your name
 * @Date: 2020-03-10 15:56:15
 * @LastEditTime: 2020-03-11 14:56:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bolg_webd:\私活\鸡-10K\chicken\src\components\views\bottom\bottom.vue
 -->
<template>
  <div class="bottom_control">
    <router-view></router-view>
    <ul class="bottom_control_btn">
        <li v-for="(item) in menyList" :key='item.id' :class="[{'active':selectPage == item.id}]" @click="topage(item)">
              <span>
                <i class="iconfont iconmiaosha" v-if="item.id ==1 "></i>
                <i class="iconfont iconleimupinleifenleileibie" v-if="item.id == 2"></i>
                <i class="iconfont iconwode" v-if="item.id == 3"></i>
              </span>
              <p>{{item.name}}</p>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectPage:1,
        menyList:[
            {
               name:this.$t('info.Panicbuyingarea'),
               path:'/index', 
               id:1
            },
            {
               name:this.$t('info.Helpcenter'),
               path:'/staticintroduce', 
               id:2
            },
            {
               name:this.$t('info.MY'),
               path:'/myInfo', 
               id:3
            },
        ]
    };
  },
  methods: {
    // 跳转页面
    topage(item){
      this.selectPage = item.id;
      this.$router.push({
        path:item.path
      })
    }
  },
  created() {
    console.log(this.$route)
    if(this.$route.path == '/myInfo'){
        this.selectPage = 3
    }else if(this.$route.path == '/index'){
        this.selectPage = 1
    }
  },
  mounted() {

  },
  components: {},

}
</script>

<style lang="scss">
.bottom_control{
    color:#fff;
    position: relative;
    padding-bottom: 60px;
    .bottom_control_btn{
        position: fixed;
        bottom:0;
        left:0;
        width:100%;
        height:60px;
        display:flex;
        background:#1B2E47;
        justify-content: space-between;
        box-sizing: border-box;
        padding:13px 0;
        li{
          display:flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          text-align: center;
          font-size:16px;
          i{
            font-size:22px;
          }
          &.active{
            color:#3F71F6;
          }
        }
    }
}
</style>