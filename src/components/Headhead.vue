<template>
  <div class="head">
    <div class="htitle">
      田径训练管理平台
    </div>
    <div class="headPortrait">

      <el-dropdown trigger="click">
  <span class="el-dropdown-link">
  <img v-bind:src="imageSrc">
   <!--<i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i>-->

  </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="clearfix" >
            修改密码
            <el-badge class="mark" />
          </el-dropdown-item>
          <el-dropdown-item class="clearfix" @click.native="qcbuuon">
            退出
            <el-badge class="mark" />
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!--<router-link :to="{name:'login'}">-->
      <!--</router-link>-->
      <!--下载-->
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
        imageSrc: "static/img/login.jpeg",
        userInfo: {}
      };
    },
    created() {
      this.userInfo = getStore('userInfo');
      this.headPrtrait();
    },
    methods: {

      qcbuuon:function(){

        console.log("jinruqlefangfa1");
        this.$router.push({name:'login'})

      },
      downs: function () {
        var alink = document.createElement("a");
        alink.download = "pig";
        alink.href = this.imageSrc;
        alink.click();
      },
      // 显示头像
      headPrtrait: function () {
        fetch
          .get("UP/backimg", {
            responseType: 'blob',
            params: {
              type: '1',
              pk_player: this.userInfo.pk_USER
            }
          })
          .then(res => {
            let url = URL.createObjectURL(res.data);
            this.imageSrc = url;
          })
      }
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
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

      box-sizing: border-box;
      padding: 5px;
      float: right;
      margin-right: 50px;
      margin-top: -50px;
    }
    .headPortrait img {
      width: 70px;
      height: 65px;
    }
  }
</style>
