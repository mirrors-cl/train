<template>
  <div class="head">
            <div class="htitle">
                田径训练管理平台
            </div>
            <div class="headPortrait">
                <router-link :to="{name: 'login'}">
                  <!--<img src="static/img/登陆.png">-->
                  <!--<img v-bind:src="''+imageSrc">-->
                  <img v-bind:src="''+imageSrc">
                </router-link>
              <!--<el-button @click="downs">xiazai</el-button>-->
            </div>
        </div>
</template>
<script>
  // 引用fetch
  import fetch from "@/assets/js/fetch.js";
  import {getStore} from "@/assets/js/utils.js";
export default {
  name: "Headhead",
  data() {
    return {
      imageSrc:"static/img/登陆.png",
      userInfo:{}
    };
  },
  created(){
    this.userInfo=getStore('userInfo');
    // this.headPrtrait();
  },
  methods:{
    downs:function(){
      var alink =document.createElement("a");
      alink.download="pig";
      alink.href=this.imageSrc;
      alink.click();
    },
    // 显示头像
    headPrtrait:function(){
      fetch
        .get("UP/backimg",{
          responseType:'blob',
        params:{
          type:'3',
          pk_player:this.userInfo.pk_USER
        }
      })
        .then(res=>{
          let url=URL.createObjectURL(res.data)
          this.imageSrc =url;
      })
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus" scoped>
.head {
  width: 100%;
  height: 100px;
  background-color: #1e578f;
  user-select: none;

  .htitle {
    font-size: 30px;
    color: #fff;
    padding-left: 40px;
    padding-top: 20px;
  }
  .headPortrait {
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    padding: 5px;
    float: right;
    margin-right: 50px;
    margin-top: -50px;
  }
  .headPortrait img {
    width: 100%;
    height: 100%;
  }
}
</style>
