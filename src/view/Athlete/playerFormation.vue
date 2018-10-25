<template>
  <div class="bodydiv">
    <headhead></headhead>
    <div class="modeldiv">
      <!--日期控件-->
      <vue-event-calendar :events="demoEvents" @month-changed="monthChange" @day-changed="dayChange">
        <template slot-scope="props">
          <div v-for="(event, index) in props.showEvents" class="event-item">
            <ul>
              <li>
                <el-input v-model="event.date"></el-input>
              </li>
              <li>
                <el-input v-model="event.ss"></el-input>
              </li>
            </ul>
            <el-button type="primary" size="mini" @click="checkOut">确定勾选队员</el-button>
          </div>
        </template>
      </vue-event-calendar>
    </div>
  </div>
</template>
<script>
  import headhead from '@/components/Headhead'
  import fetch from "@/assets/js/fetch.js"
  import qs from "qs";
  import {getStore} from "@/assets/js/utils.js";
  export default {
    name: "ath-player",
    data: function () {
      let userInfo=getStore('userInfo');
      return {
        dialogVisible:false,
        demoEvents: [],
        formLabelAlign:{
          date: '',
          title: '',
          desc: '',
          ss:'',
          bb:''
        }
      }
    },
    created() {
    },
    //计算属性
    computed: {

    },
    methods: {
      //勾选操作
      checkOut:function(){

      },
      //敏感操作
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //日历监听事件
      monthChange (month) {
        console.log(month);
        console.log(month)
      },
      dayChange (day) {
        console.log(day)
      },
      submitForm:function(){
        //正则修改时间格式（日期插件规定了时间格式）
        this.formLabelAlign.date=this.formLabelAlign.date.replace(/-/g,'/');
        this.demoEvents.push(this.formLabelAlign)
        this.dialogVisible=false
      },

    },
    components:{
      headhead
    }
  };
</script>
<style scoped>
</style>
