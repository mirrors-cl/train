<template>
  <div class="head">
            <div class="htitle">
                田径训练管理平台
            </div>
            <div class="headtx">
                <router-link :to="{name: 'login'}">  
                  <!--<img src="static/img/登陆.png">-->
                  <img v-bind:src="imageSrc">
                </router-link>

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
      // imageSrc:require(""),
      imageSrc:"",
      // msg: "Welcome to Your Vue.js App",
      userInfo:{}
    };
  },
  created(){
    this.userInfo=getStore('userInfo');
     this.headPrtrait();
  },
  methods:{
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
          //this.imageSrc='res.data:image/png;base64,'+btoa(new Uint8Array(res.data).reduce((data,byte)=>data+String.formCharCode(byte),''))
          //this.imageSrc=res.data.data;
          let url=URL.createObjectURL(res.data)
          console.log(url)
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

  .headtx {
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    padding: 5px;
    float: right;
    margin-right: 50px;
    margin-top: -50px;
  }
  .headtx img {
    width: 100%;
    height: 100%;
  }
}
</style>
