<template>
  <div>
       <!-- 头部 -->
      <BaseHeader
        name='用戶協議'
      ></BaseHeader>
      <!--  -->
     
     <div class="content">
         <div v-html='content'></div>
     </div>

  </div>
</template>

<script>
import statics from '@/assets/image/static.png'
import img1 from '@//assets/image/img1.gif'
import img2 from '@//assets/image/img2.gif'
import img3 from '@//assets/image/img3.gif'
import img4 from '@//assets/image/img4.gif'
import img5 from '@//assets/image/img5.gif'
import img6 from '@//assets/image/img6.gif'
import img7 from '@//assets/image/img7.gif'
import img8 from '@//assets/image/img8.gif'
export default {
  data() {
    return {
        name:'',
        statics,
        img:[img1,img2,img3,img4,img5,img6,img7,img8],
        goodList:[],
        content:''
    };
  },
  methods: {

    /* 
        幫助中心
    */
   article(){
        this.globalApi.api.login.get_user_regagree().then(value=>{
            console.log(value,'list')
              if(value.data.code == 1){
                  this.content = value.data.data.registration_agreement;
              }
          })
    },

  },
  created() {
  },
  mounted() {
      this.article();
  },
  components: {},
}
</script>

<style lang='scss' scoped>
.staticchicken_list{
    margin-top:20px;
    padding:0 20px;
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
        width:32%;
        margin-bottom:10px;
        border-radius:10px;
        background:#192B39;
        padding-bottom:50px;
        position: relative;
        img{
            width:100%;
            height:110px;
        }
        .list_tags{
            position: absolute;
            left:0;
            top:80px;
            .name{
                background:rgba(0,0,0,0.3);
                text-align:center;
                font-weight: bold;
                color:#fff;
                line-height:1.5;
            }
            .profit{
                padding-left:40px;
                position: relative;
                line-height:30px;
                height:30px;
                color:#fff;
                font-weight:bold;
                font-style: italic;
                span{
                    position: absolute;
                    line-height:normal;
                    left:0;
                    top:0;
                    font-size:12px;
                }
            }
            .value{
                color:#fff;
                font-weight:bold;
                font-style: italic;
                line-height:normal;
                text-align: center;
                margin-top:5px;
                background:#281974
            }
        }
    }
}
.helplist{
    padding:20px;
    li{
        padding:10px;
        color:#fff;
        background:#102030;
        margin-bottom: 10px;
        line-height: 1.5;
    }
}
.content{
    padding:20px;
    color:#fff;
    line-height:1.5;
    white-space: normal;

word-wrap: break-word;

word-break: break-all;
}
</style>