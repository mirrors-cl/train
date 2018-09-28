<template>
  <div id="app">
    <transition name="el-zoom-in-center">
    <div class="bodydiv" v-show="show3">
      <div class="listdiv">
        <div>
          <el-button icon="el-icon-back" size="mini" @click="back">返回</el-button>
          <el-button type="primary" size="medium" @click="open1" icon="el-icon-delete">删除</el-button>
          <el-button type="primary" size="medium" @click="dialogVisible = true" icon="el-icon-circle-plus-outline">新增
          </el-button>
        </div>
        <!--table-->
        <template>
          <el-table
            :data="projectList"
            style="width: 100%"
            :header-cell-style="titletable"
            @cell-click="projectList"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="gm_Name"
              label="编号">
            </el-table-column>

            <el-table-column
              prop="gm_Project_Order"
              label="顺序">
            </el-table-column>
            <el-table-column
              prop="gm_Project_Date"
              label="比赛时间">
            </el-table-column>
            <el-table-column
              prop="gm_Pname"
              label="项目名称">
            </el-table-column>
            <el-table-column
              prop="gm_Project_Session"
              label="赛次">
            </el-table-column>
            <el-table-column
              prop="pnumber"
              label="人次">
            </el-table-column>
            <el-table-column
              prop="classNumber"
              label="组数">
            </el-table-column>
            <el-table-column
              prop="scoreType"
              label="负责部门">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <!--增加-->
        <el-dialog
          title="增加"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>
           <el-form :label-position="labelPosition" label-width="80px" :model="addForm">
                <el-form-item label="比赛名称">
                  <el-input v-model="addForm.gm_Name"></el-input>
                </el-form-item>
                <el-form-item label="比赛地点">
                  <el-input v-model="addForm.list_Add"></el-input>
                </el-form-item>
                <el-form-item label="比赛时间">
                   <el-date-picker
                     type="date"
                     v-model="addForm.list_Date"
                     placeholder="选择日期"
                     format="yyyy 年 MM 月 dd 日"
                     value-format="yyyy-MM-dd">
                  </el-date-picker>
                  </el-form-item>
                <el-form-item label="积分类型">
                  <el-input v-model="addForm.scoreType"></el-input>
                </el-form-item>
          </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="competiTionadd">确 定</el-button>
         </span>
        </el-dialog>
        <!--修改-->
        <el-dialog
          title="提示"
          :visible.sync="adddialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>
            <el-form :label-position="labelPosition" label-width="80px" :model="updataForm">
                <el-form-item label="比赛名称">
                  <el-input v-model="updataForm.gm_Name"></el-input>
                </el-form-item>
                <el-form-item label="比赛地点">
                  <el-input v-model="updataForm.list_Add"></el-input>
                </el-form-item>
                <el-form-item label="比赛时间">
                   <el-date-picker
                     v-model="updataForm.list_Date"
                     type="date"
                     placeholder="选择日期"
                     format="yyyy 年 MM 月 dd 日"
                     value-format="yyyy-MM-dd">
                  </el-date-picker>
                  </el-form-item>
                <el-form-item label="积分类型">
                  <el-input v-model="updataForm.scoreType"></el-input>
                </el-form-item>
          </el-form></span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="adddialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updataMatch">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    </transition>
  </div>
</template>
<script>
  import fetch from "@/assets/js/fetch";
  import qs from "qs";

  export default {
    name: "projectList",
    data: function () {
      return {
        show3:false,
        //right对齐方式
        labelPosition: 'right',
        //dialog
        dialogVisible: false,
        //diglog
        adddialogVisible: false,
        projectList: [],

        addForm: {
          pk_List:"",//competitionID

          gm_Project_Order: "",//顺序
          gm_Project_Date: "",//比赛时间
          gm_Pname: "",//项目名称
          gm_Project_Session: "",//赛次
          pnumber:"",//人数
          classNumber:"",//组数
        },

        updataForm: {
          pk_List:"",//id
          gm_Name: "",//比赛名称
          list_Add: "",//比赛地点
          list_Date: "",//比赛时间
          scoreType: "",//积分类型
        },
        //状态值
        multipleSelection: [],
      }
    },
    created() {
      this.getdata();
      this.handleSelectionChange();
    },
    mounted(){
      setTimeout(()=>this.show3=true,200)
    },
    methods: {
      //敏感操作是否关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      // 显示数据
      getdata: function () {
        let id=this.$route.query.id;
        console.log("sd",id);
        fetch
          .get("/PL/PLshowlist",{
            params:{
              pk_List:id
            }
          })
          .then(res => {
            this.projectList = res.data.data;
            // console.log(rest.data);
            // this.competitionList.forEach(item => this.$set(item, "checked", false));
          })
          .catch(errors => {
            alert("服务器错误")
          })
      },
      //add
      competiTionadd: function () {
        console.log({...this.form});
        fetch.post("/GL/GLadd", qs.stringify(this.form)).then(res => {
          this.getdata();
          this.dialogVisible = false;
        })
      },
      //---------------------------------------------修改
      handleEdit(index, row) {
        // this.updataForm=row;
        console.log(index,row);
        this.updataForm.pk_List=row.pk_List;
        this.updataForm.gm_Name = row.gm_Name;
        this.updataForm.list_Add = row.list_Add;
        this.updataForm.list_Date = row.list_Date;
        this.updataForm.scoreType = row.scoreType;
        this.adddialogVisible = true;
      },
      updataMatch:function(){
        console.log(this.updataForm);
        fetch.post("/GL/GLupdate", qs.stringify(this.updataForm)).then(res => {
          this.getdata();
          this.adddialogVisible = false;
        })
      },
      //项目列表
      projectList: function (row, column) {
        console.log(column.label);
        if (column.label === "操作") {
        } else {
          //数据要修改显示数据不对id不对
          this.$router.push({name:'scoreList',query:{id:row.pk_List}})
        }
      },
      //delete
      handleSelectionChange:function(val){
        this.multipleSelection=val;

      },
      open1() {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.removeUser();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      removeUser:function(){
        let ids =[];
        ids =this.multipleSelection
          .map(item=>item.pk_List)
          .filter(item=>item!==undefined);
        fetch.post("/GL/GLdelete",qs.stringify({key:ids.join()}))
          .then(res=>{
            if (res.data.status==="success") {
              this.$message({
                type:"success",
                message:res.data.message
              });
              this.competitionList=this.competitionList.filter(
                item=>ids.indexOf(item.pk_List)=== -1
              )
            }
          })


      },
      //table表头样式
      titletable({row, rowIndex}) {
        return {background: "#212529", color: "#fff"};
      },
      //
      back(){
        this.$router.go(-1)
      }
    }
  };
</script>

<style>
  .listdiv {
    display: block;
    user-select: none;
    width: 80%;
    margin-left: 10%;
  }
  .listdiv1 {
    display: block;
    user-select: none;
    width: 80%;
    margin-left: 10%;
  }
</style>
