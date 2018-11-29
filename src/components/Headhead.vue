<template>
  <div class="head">
    <div class="htitle">
      <header>田径训练管理平台</header>
    </div>
    <div class="headPortrait">
    <el-dropdown trigger="click" >
          <span class="el-dropdown-link" >
          <img v-bind:src="imageSrc" v-show="imagePicture">
            <img src="static/img/picture1.png" v-show="picture"/>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="clearfix" @click.native="dialogVisible = true">修改密码<el-badge class="mark"/>
          </el-dropdown-item>
          <el-dropdown-item class="clearfix" @click.native="qcbuuon">安全退出<el-badge class="mark"/>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--<router-link :to="{name:'login'}">-->
      <!--</router-link>-->
      <!--下载-->
      <!--<el-button @click="downs">xiazai</el-button>-->
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      append-to-body="true"
      :modal-append-to-body="false"
      width="25%"
      :before-close="handleClose">
      <el-form :model="form" ref="form" status-icon :rules="rules2" label-width="80px" class="demo-ruleForm">
        <el-form-item label="新的密码" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password1">
          <el-input type="password" v-model="form.password1" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
     <el-button @click="qxbuuton">取 消</el-button>
    <el-button type="primary" @click="datepassword">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  // 引用fetch
  import fetch from "@/assets/js/fetch.js";
  import {getStore} from "@/assets/js/utils.js";
  import qs from "qs";
  export default {
    name: "Headhead",
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.password1 !== '') {
            this.$refs.form.validateField('password1');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        console.log("value", value);
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        imagePicture:false,
        picture:false,
        //passwrod正则表达式
        rules2: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          password1: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        },
        imageSrc: "",
        userInfo: {},
        dialogVisible: false,
        form: {
          password: "",
          password1: "",
        },
      };
    },
    created() {
      this.userInfo = getStore('userInfo');
      this.headPrtrait();
    },
    methods: {
      //确认修改密码
      datepassword() {
        fetch.post("/restPassword", qs.stringify({pk_user: this.userInfo.pk_USER, password: this.form.password}))
          .then(res => {
            // this.dialogVisible = false;
            this.$cookies.set("token",'',-1, '/');
            this.$router.push({name: 'login'})

          }).catch(errors => {
          alert("请求超时")
        })
      },
      //取消清除正则验证提示
      qxbuuton() {
        this.$refs["form"].resetFields();
        this.dialogVisible = false
      },
      //敏感操作
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      // //设置token
      // //设置cookie
      // setCookie(cname, cvalue, exdays) {
      //   var d = new Date();
      //   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      //   var expires = "expires=" + d.toUTCString();
      //   console.info(cname + "=" + cvalue + "; " + expires);
      //   document.cookie = cname + "=" + cvalue + "; " + expires;
      //   console.info(document.cookie);
      // },
      //退出
      qcbuuon() {
        this.$cookies.set("token",'',-1, '/');
        this.$router.push({name: 'login'})
      },
      // 显示头像
      headPrtrait() {

        if (this.userInfo.pk_IDENTITY==="1"){
          this.imagePicture=false
          this.picture=true
        }else if (this.userInfo.pk_IDENTITY==="2"){
          this.imagePicture=true
          this.picture=false
        }
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
    opacity 0.9;
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
      //鼠标悬停小手😆
      cursor pointer;
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
