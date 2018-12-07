<template>
  <div class="head">
    <div class="imglog">
      <img src="../assets/img/1701016513.png" alt="找不到了">
    </div>
    <div>
      <header class="htitle">田径训练管理平台</header>
    </div>
    <div class="headPortrait">
      <updatepwd></updatepwd>
    </div>
  </div>
</template>
<script>
  import updatepwd from '@/view/user/updatepwd'
  export default {
    name: "Headhead",
    components:{
      updatepwd
    },
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .head {
    opacity 0.9;
    height: 110px;
    background-color: #1e578f;
    user-select: none;
    .imglog img{
      position absolute;
      width 178px;
      height 110px;
      margin-top 2px;
    }

    .htitle {
      font-family:SimHei;
      position absolute;
      font-size: 33px;
      color: #fff;
      padding-left: 150px;
      padding-top: 32px;
    }
    .headPortrait {
      position relative
      //鼠标悬停小手😆
      cursor pointer;
      box-sizing: border-box;
      padding: 5px;
      float: right;
      margin-right: 50px;
      margin-top 20px;
    }
  }
</style>
