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
                <span>训练时间</span>
                <el-input v-model="event.date" :disabled="true"></el-input>
              </li>
              <li>
                <span>训练地点</span>
                <el-input v-model="event.title" :disabled="true"></el-input>
              </li>
              <li>
                <span>内容简介</span>
                <el-input type="textarea" v-model="event.drill_practice" :disabled="true"></el-input>
              </li>
            </ul>
            <el-button type="primary" size="mini" @click="colourstyle" v-show="monitor">详细训练计划</el-button>
          </div>
        </template>
      </vue-event-calendar>
      <!-- showdetalist -->
      <el-dialog
        title="训练详情"
        :visible.sync="dialogVisible3"
        width="60%"
        :before-close="handleClose">
        <span>
        <template>
            <el-table :data="trainingList" style="width: 100%" fit="true">
              <el-table-column
                label="训练时间"
                prop="mt_project_mdate"
                width="250px">
              </el-table-column>
              <el-table-column
                  label="项目"
                  prop="mt_project_projoct"
                  width="100px">
              </el-table-column>
                <el-table-column
                  label="姓名"
                  width="100px">
                  <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.mt_project_participant }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">运动员名称</el-tag>
                    </div>
                  </el-popover>
                </template>
                </el-table-column>
              <el-table-column
                label="训练内容"
                prop="mt_project_practice"
                width="300px">
              </el-table-column>
            </el-table>
        </template>
        </span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible3 = false">关闭</el-button>
        </span>
      </el-dialog>
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
      let userInfo = getStore('userInfo');
      return {
        //详情
        trainingList:[],
        dialogVisible3: false,
        //监听按钮
        monitor: false,
        player_name: userInfo.user_NAME,
        dialogVisible: false,
        demoEvents: [],
        date:""
      }
    },
    created() {
      this.getDate()
    },
    //count
    computed: {},
    methods: {

      //showdetails
      colourstyle: function () {
        this.getDate1()
        // 弹框
        this.dialogVisible3 = true
      },
      //getlistall
      getDate: function () {
        console.log(this.$state.userInfo);
        fetch.post("DP/showAlldate", qs.stringify({player_name: this.player_name})
        ).then(res => {
          this.demoEvents = res.data.data
          console.log(res)
        })
      },
      getDate1: function(){
        fetch.post("/DP/showAllProject",qs.stringify({playerName:this.player_name,date:this.date}))
          .then(res=>{
            this.trainingList = res.data.data;
            console.log(res)
        })
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
      //日历监听事件
      monthChange(month) {
        console.log(month);
        console.log(month)
      },
      dayChange(day) {
        this.date=day.date
        this.monitor = true
        console.log(day)
      },

      // submitForm:function(){
      //   //正则修改时间格式（日期插件规定了时间格式）
      //   this.formLabelAlign.date=this.formLabelAlign.date.replace(/-/g,'/');
      //   this.demoEvents.push(this.formLabelAlign)
      //   this.dialogVisible=false
      // },
    },
    components: {
      headhead
    }
  };
</script>
<style scoped>
</style>
