<template>
  <div>
        <ul class="myAssetsList" v-if="type == 1">
            <li v-for="(item,index) in list" :key='index'>
                <div class="goodsInfo">
                <img :src="item.thumb" alt />
                    <div class="listInfo">
                        <p v-for="(items,indexs) in options" :key="indexs">
                            {{items.name}}:{{item[items.value]}}
                        </p>

                    </div>
                </div>

                <slot name="define"></slot>
            </li>
        </ul>
        <ul class="myAssetsList" v-if="type == 2">
            <li v-for="(item,index) in list" :key='index'>
                <div class="goodsInfo2">
                        <p v-for="(items,indexs) in options" :key="indexs">
                            {{items.name}}:{{item[items.value]}}
                        </p>
                </div>

                <slot name="define"></slot>
            </li>
        </ul>
    
  </div>
</template>

<script>
import timg from "@/assets/image/timg.jpg";
export default {
  data() {
    return {
      timg,
    };
  },
  props: {
      list:{
          default(){
              return []
          }
      },
      options:{
          default(){
              return{
                  name:'',
                  price:'',
                  time:''
              }
          }
      },
      type:{
          default(){
              return 1
          }
      }
  },
  methods: {
      
  },
  created() {},
  mounted() {},
  components: {}
};
</script>

<style>
</style>