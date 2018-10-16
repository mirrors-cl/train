<template>
  <div class="bodydiv">
    <div class="modeldiv">
      <el-dialog
        title="添加训练计划"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>
              <el-form label-width="80px" :model="formLabelAlign">
                <el-form-item label="选择时间">
                 <el-date-picker
                   v-model="formLabelAlign.date"
                   type="dates"
                   placeholder="选择一个或多个日期"
                   format="yyyy 年 MM 月 dd 日"
                   value-format="yyyy-MM-dd">
                </el-date-picker>
                </el-form-item>
              <el-form-item label="地点">
                <el-input v-model="formLabelAlign.title"></el-input>
              </el-form-item>
              <el-form-item label="训练简介">
                <el-input v-model="formLabelAlign.drill_practice" type="textarea" row="3"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">立即创建</el-button>
              </el-form-item>
            </el-form>
        </span>
      </el-dialog>
      <el-button type="primary" size="mini" @click="dialogVisible=true">添加训周期</el-button>
      <!--训练计划-->
      <vue-event-calendar :events="demoEvents"
                          @month-changed="monthChange"
                          @day-changed="dayChange">
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
            <el-button type="primary" size="mini" @click="checkOut" v-show="zjbutton">添加训练内容</el-button>
            <el-button type="primary" size="mini" @click="colourstyle" v-show="zjbutton">详细训练计划</el-button>
          </div>
        </template>
      </vue-event-calendar>
      <!--添加训练计划-->
      <el-dialog
        title="训练计划"
        :visible.sync="dialogVisible1"
        width="50%"
        :before-close="handleClose">
        <span>
          <el-form ref="trainingDetails" :model="trainingDetails" label-width="80px">
         <el-form-item label="请选择时间">
            <el-time-picker
              is-range
              v-model="trainingDetails.MT_PROJECT_MDATE"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm-ss">
          </el-time-picker>
         </el-form-item>

            <el-form-item label="训练项目">
            <el-input v-model="trainingDetails.MT_PROJECT_PROJOCT"></el-input>
          </el-form-item>
                    <el-form-item label="训练内容">
            <el-input v-model="trainingDetails.MT_PROJECT_PRACTICE"></el-input>
          </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="qxtrainingbutton">取 消</el-button>
        <el-button type="primary" @click="trainingbutton">确 定</el-button>
      </span>
      </el-dialog>
      <!--筛选运动员-->
      <el-dialog
        title="勾选参与运动员"
        :visible.sync="dialogVisible2"
        width="50%"
        :before-close="handleClose">
        <span>
          <template>
          <el-table
            :data="playerform"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="record_PROJECT"
            label="项目"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            :filters="[{text:'男',value:'男'},{text:'女',value:'女'}]"
            :filter-method="filterHandler">
          </el-table-column>
          </el-table>
          </template>
        </span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="qxplayerbutton">取 消</el-button>
        <el-button type="primary" @click="playerbutton">确 定</el-button>
      </span>
      </el-dialog>
      <!--详情-->
      <el-dialog
        title="训练详情"
        :visible.sync="dialogVisible3"
        width="60%"
        :before-close="handleClose">
        <span>
          <template>
  <el-table
    :data="trainingList"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-row>
          <el-col :span="3"><div class="grid-content bg-purple-dark">训练项目:</div></el-col>
           <el-col :span="21">
             <el-card class="box-card">
             <div>{{props.row.mt_project_projoct}}</div>
               </el-card>
           </el-col>
          </el-row>
          <el-row>
          <el-col :span="3"><div class="grid-content bg-purple-dark">训练内容:</div></el-col>
            <el-col :span="21">
                <el-card class="box-card">
                {{props.row.mt_project_practice}}
                </el-card>
            </el-col>
          </el-row>
            <el-row>
          <el-col :span="3"><div class="grid-content bg-purple-dark">参与人:</div></el-col>
            <el-col :span="21">
                <el-card class="box-card">
                {{props.row.mt_project_participant}}
                </el-card>
            </el-col>

          </el-row>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="训练时间"
      prop="mt_project_mdate">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="Deletehandle(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
        </span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible3 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
  </span>
      </el-dialog>
      <!--修改运动员详情-->
      <el-dialog
        title="修改训练计划"
        :visible.sync="dialogVisible4"
        width="50%"
        :before-close="handleClose">
        <span>
          <el-form ref="updateTraining" :model="updateTraining" label-width="80px">
         <el-form-item label="请选择时间">
            <el-time-picker
              is-range
              v-model="updateTraining.mt_project_mdate"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm-ss">
          </el-time-picker>
         </el-form-item>
            <el-form-item label="训练项目">
            <el-input v-model="updateTraining.mt_project_projoct"></el-input>
          </el-form-item>
                    <el-form-item label="训练内容">
            <el-input v-model="updateTraining.mt_project_practice"></el-input>
          </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="updateTrainingButton">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import fetch from "@/assets/js/fetch.js"
  import qs from "qs";

  export default {
    name: "ath-list",
    data: function () {
      return {
        //复用勾选运动员变量
        playercheck:"",
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        //修改
        dialogVisible4:false,

        zjbutton: false,
        //控件渲染数组
        demoEvents: [],
        //训练计划列表
        trainingList: [],
        //添加训练周期
        formLabelAlign: {
          date: '',
          title: '',//地点
          drill_practice: '',//简介
        },
        //计划详情
        trainingDetails: {
          date: "",//某天
          MT_PROJECT_MDATE: "",//时间段
          MT_PROJECT_PROJOCT: "",//训练项目
          user: "",//参与人
          MT_PROJECT_PRACTICE: ""//训练内容
        },
        //修改表单
        updateTraining :{
          olddate:"",//原时间
          oldmt_project_participant:"",//原运动员
          mt_project_mdate:"",//新时间
          mt_project_participant:"",//新的创建人
          mt_project_projoct:"",//新项目
          mt_project_practice:"",//新的训练内容
        },
        date: "",
        playerform: [],
      }
    },
    created() {

      this.getdata();
    },
    //计算属性
    computed: {},
    methods: {
      Deletehandle(index,row){
        fetch.post("/TP/TPdelete",qs.stringify({olddate:row.mt_project_mdate,oldmt_project_participant:row.mt_project_participant}))
          .then(res=>{
            this.$message({
              message: '恭喜你，这是一条成功消息',
              type: 'success'
            });
            this.getdata1();
          }).catch(errors=>{
          this.$message.error('错了哦，这是一条错误消息');
        })
          console.log(row)
      },
      //修改界面
      handleEdit:function(index,row){
        this.updateTraining.olddate=row.mt_project_mdate;
        this.updateTraining.oldmt_project_participant=row.mt_project_participant;

        //修改勾选人弹框
        this.dialogVisible2=true;
        this.playerdata();
        //修改填报页面
        // this.dialogVisible4=true;
        console.log("index,row",index,row)
      },

      //修改操作
      updateTrainingButton:function(){
        debugger
        this.updateTraining.mt_project_mdate=this.updateTraining.mt_project_mdate.join();
       console.log( "123456",)

        fetch.post("/TP/TPupdate",qs.stringify(this.updateTraining)).then(res=>{

          this.updateTraining = { trainingDetails: 0 };
          this.dialogVisible4=false

        })

      },
      //筛选
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      qxplayerbutton:function(){
        this.dialogVisible2=false;
        this.playercheck=""
      },
      //勾选成功传入添加训练计划
      playerbutton: function () {
        if(this.playercheck===""){
          this.dialogVisible2=false;
          this.dialogVisible4=true
            
        }else if (this.playercheck==="1") {
          this.dialogVisible2 = false;
          this.dialogVisible1 = true;
        }


      },
      //勾选队员
      handleSelectionChange(val) {

        this.trainingDetails.user = val.map(item => item.PK_PLAYER).filter(item => item !== undefined).join();
        this.updateTraining.mt_project_participant = val.map(item=>item.PK_PLAYER).filter(item=>item!== undefined).join();
        console.log(val);
        this.multipleSelection = val;
      },
      //增加详情训练计划
      trainingbutton:function(){
        this.playercheck="";
        this.trainingDetails.MT_PROJECT_MDATE.join();
        fetch.post("/TP/TPadd", qs.stringify({
          date: this.trainingDetails.date,
          mt_project_mdate: this.trainingDetails.MT_PROJECT_MDATE.join(),
          mt_project_projoct: this.trainingDetails.MT_PROJECT_PROJOCT,
          mt_project_participant: this.trainingDetails.user,
          mt_project_practice: this.trainingDetails.MT_PROJECT_PRACTICE
        })).then(res => {
          this.useraddlist = { trainingDetails: 0 };
            this.dialogVisible1=false;
            this.getdata()

          })
      },
      //增加取消
      qxtrainingbutton:function(){
        this.dialogVisible1=false;
        this.playercheck=""
      },
      //运动员信息
      playerdata: function () {
        fetch.get("/DP/DPshowlist").then(res => {
          this.playerform = res.data.data
        })
      },
      //显示日期数据
      getdata: function () {
        fetch.get("/RC/drillShowlist")
          .then(res => {
            this.demoEvents = res.data.data
            // this.demoEvents.push(res);

          })
      },
      getdata1: function () {
        fetch.get("/TP/TPselect", {
          params: {
            date: this.date
          }
        }).then(item => {
          this.trainingList = item.data.data;
          console.log(item)
        })
      },
      //勾选操作
      checkOut: function () {
        this.playercheck="1";

        this.playerdata();
        this.dialogVisible2 = true
      },
      //敏感操作
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.playercheck="";

            done();
          })
          .catch(_ => {
          });
      },
      //日历监听事件
      monthChange(month) {
        console.log("month", month)
      },
      dayChange(day) {
        if (day.events.length > 0) {
          this.date = day.date;
          this.trainingDetails.date = day.date;
          this.zjbutton = true;
        }
        console.log(day.events);
        // if(day.events)
        console.log("day", day)
      },
      //创建训练周期
      submitForm: function () {

        // this.formLabelAlign.date.join();
        fetch
          .post("/RC/drillAdd", qs.stringify({
            date: this.formLabelAlign.date.join(),
            title: this.formLabelAlign.title,
            drill_practice: this.formLabelAlign.drill_practice
          }))
          .then(res => {
            this.getdata();
            this.dialogVisible = false;
          });

        //正则修改时间格式（日期插件规定了时间格式）
        // this.formLabelAlign.date=this.formLabelAlign.date.replace(/-/g,'/');
        //this.demoEvents.push(this.formLabelAlign);
        this.dialogVisible = false
      },
      //详情
      colourstyle: function () {
        this.getdata1();
        this.dialogVisible3 = true


      },
    }
  };
</script>
<style scoped>
  .modeldiv {
    width: 80%;
    height: 100px;
    margin-left: 10%;
    user-select: none;
  }
</style>
<style>
  /*.is-event{*/
  /*background-color:rgb(200,149,67) ;*/
  /*}*/
  .highlight {
    background: #e32926;
    color: #fff;
    border-radius: 100%;
  }

</style>
