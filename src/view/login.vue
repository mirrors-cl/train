<template>
  <div id="win10-login">
    <div style="height: 10%;min-height: 120px"></div>
    <div id="win10-login-box">
      <div class="win10-login-box-square">
        <img src="static/img/yd.png" class="content"/>
      </div>
      <p style="font-size: 24px;color: #ffaa51;text-align: center">管理员</p>
      <form @click.prevent>
        <!--用户名-->
        <input type="text" placeholder="请输入登录名" class="login-username" v-model="form.userName">
          <!--密码-->
          <input type="password" placeholder="请输入密码" class="login-password" v-model="form.passWord">
            <!--登陆按钮-->
          <button  value="登录" id="btn-login" class="login-submit"
            @click="fn_submit">登陆
          </button>
      </form>
    </div>
  </div>
</template>

<script>
import fetch from '../assets/js/fetch';
import qs from "qs";
import  {mapMutations} from 'vuex';
export default {
  name: "login",
  data() {
    return {
      form: {
        userName: "",
        passWord: ""
      }
    };
  },
  methods: {
    ...mapMutations(['SAVE_USER']),
    fn_submit: function() {
      debugger;
     try {
       fetch
         .post("/Mlogin", qs.stringify(this.form))
         .then(res => {
           if (res.data.status === "success") {
             this.SAVE_USER(res.data.data);
             //请求成功
             let identity = res.data.data.pk_IDENTITY;
             if (identity === '1') {
               this.$router.push({ path: "/adminUser"});
             } else if (identity === '2') {
               this.$router.push({ path: '/playerform'});
             }
           } else {
             alert("账号或密码错误");
           }
         })
         .catch(err => {
           //alert("服务器未响应");
           console.log(err);
         });
     }catch (e) {
        console.log(e)

     }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#win10-login {
  background: url("../../static/img/login.jpeg") no-repeat fixed;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
}

#win10-login-box {
  width: 300px;
  overflow: hidden;
  margin: 0 auto;
}

.win10-login-box-square {
  width: 105px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: darkgray;
  position: relative;
  overflow: hidden;
}

.win10-login-box-square::after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.win10-login-box-square .content {
  position: absolute;
  width: 100%;
  height: 100%;
}

input {
  width: 90%;
  border: 0;
  margin: 0 auto;
  line-height: 36px;
  font-size: 20px;
  padding: 0 1em;
  border-radius: 5px;
  margin-bottom: 11px;
}

.login-username,
.login-password {
  width: 91%;
  font-size: 13px;
  color: #999;
}

.login-password {
  width: calc(91% - 54px);
  -webkit-border-radius: 2px 0 0 2px;
  -moz-border-radius: 2px 0 0 2px;
  border-radius: 5px 0 0 5px;
  margin: 0px;
  float: left;
}

.login-submit {
  margin: 0px;
  -webkit-border-radius: 0 5px 5px 0;
  -moz-border-radius: 0 5px 5px 0;
  border-radius: 0 5px 5px 0;
  background-color: #009688;
  width: 54px;
  display: inline-block;
  height: 36px;
  line-height: 36px;
  padding: 0 auto;
  color: #fff;
  white-space: nowrap;
  text-align: center;
  font-size: 14px;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  filter: alpha(opacity=90);
}
</style>
