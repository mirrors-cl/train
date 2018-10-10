<template>
  <div class="bodydiv">
    <headhead></headhead>
    <div class="modeldiv">
      <!--<el-dialog-->
        <!--title="添加训练计划"-->
        <!--:visible.sync="dialogVisible"-->
        <!--width="30%"-->
        <!--:before-close="handleClose">-->
        <!--<span>-->
              <!--<el-form label-width="80px" :model="formLabelAlign">-->
                 <!--<el-form-item label="选择时间">-->
                   <!--<el-date-picker-->
                     <!--v-model="formLabelAlign.date"-->
                     <!--type="date"-->
                     <!--placeholder="选择日期"-->
                     <!--format="yyyy 年 MM 月 dd 日"-->
                     <!--value-format="yyyy-MM-dd">-->
                   <!--</el-date-picker>-->
                <!--</el-form-item>-->
              <!--<el-form-item label="地点">-->
                <!--<el-input v-model="formLabelAlign.title" ></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="训练内容">-->
                <!--<el-input v-model="formLabelAlign.ss" type="textarea" row="3"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item>-->
                <!--<el-button type="primary" @click="submitForm">立即创建</el-button>-->
              <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</span>-->
      <!--</el-dialog>-->
      <!--<el-button type="primary" size="mini" @click="dialogVisible=true">添加训练计划</el-button>-->

      <!--日期控件-->
      <vue-event-calendar :events="demoEvents"
                          @month-changed="monthChange"
                          @day-changed="dayChange">
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
  export default {
    name: "ath-player",
    data: function () {
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
