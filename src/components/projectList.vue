<template>
  <div id="app">
    <transition name="el-zoom-in-center">
    <div class="bodydiv" v-show="show3">
      <div class="listdiv">
        <div>
          <el-button icon="el-icon-back" size="mini" @click="back">返回</el-button>
          <el-button type="danger" size="medium" @click="open1" icon="el-icon-delete">删除</el-button>
          <el-button type="primary" size="medium" @click="dialogVisible = true" icon="el-icon-circle-plus-outline">新增
          </el-button>
        </div>
        <!--table-->
        <template>
          <el-table
            :data="projectList"
            style="width: 100%"
            :header-cell-style="titletable"
            @cell-click="scoreList"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="number"
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
              prop="classiFication"
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
                <el-form-item label="顺序">
                  <el-input v-model="addForm.gm_Project_Order"></el-input>
                </el-form-item>
                <el-form-item label="比赛时间">
                   <el-date-picker
                     type="date"
                     v-model="addForm.gm_Project_Date"
                     placeholder="选择日期"
                     format="yyyy 年 MM 月 dd 日"
                     value-format="yyyy-MM-dd">
                  </el-date-picker>
                  </el-form-item>
                <el-form-item label="项目名称">
                  <el-input v-model="addForm.gm_Pname"></el-input>
                </el-form-item>
                <el-form-item label="赛次">
                  <el-input v-model="addForm.gm_Project_Session"></el-input>
                </el-form-item>
                <el-form-item label="人次">
                  <el-input v-model="addForm.pnumber"></el-input>
                </el-form-item>
                <el-form-item label="组数">
                  <el-input v-model="addForm.classNumber"></el-input>
                </el-form-item>
                  <el-form-item label="负责部门">
                  <el-input v-model="addForm.classiFication"></el-input>
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
          :visible.sync="updatadialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>
             <el-form :label-position="labelPosition" label-width="80px" :model="updataForm">
                <el-form-item label="顺序">
                  <el-input v-model="updataForm.gm_Project_Order"></el-input>
                </el-form-item>
                <el-form-item label="比赛时间">
                   <el-date-picker
                     type="date"
                     v-model="updataForm.gm_Project_Date"
                     placeholder="选择日期"
                     format="yyyy 年 MM 月 dd 日"
                     value-format="yyyy-MM-dd">
                  </el-date-picker>
                  </el-form-item>
                <el-form-item label="项目名称">
                  <el-input v-model="updataForm.gm_Pname"></el-input>
                </el-form-item>
                <el-form-item label="赛次">
                  <el-input v-model="updataForm.gm_Project_Session"></el-input>
                </el-form-item>
                <el-form-item label="人次">
                  <el-input v-model="updataForm.pnumber"></el-input>
                </el-form-item>
                <el-form-item label="组数">
                  <el-input v-model="updataForm.classNumber"></el-input>
                </el-form-item>
                  <el-form-item label="负责部门">
                  <el-input v-model="updataForm.classiFication"></el-input>
                </el-form-item>
          </el-form>

          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
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
        updatadialogVisible: false,
        projectList: [],
        addForm: {
          pk_List: this.$route.query.id,//competitionID
          number:"",//编号
          gm_Project_Order: "",//顺序
          gm_Project_Date: "",//比赛时间
          gm_Pname: "",//项目名称
          gm_Project_Session: "",//赛次
          pnumber:"",//人数
          classNumber:"",//组数
          classiFication:""//负责部门
        },

        updataForm: {},
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
    computed:{
      //计算属性
      querys:function () {
        return this.$route.query.id
      }
    },
    methods: {
      //敏感操作是否关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.getdata();
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
      //````````````````````````````add api
      competiTionadd: function () {
        fetch
          .post("/PL/PLadd",qs.stringify(this.addForm)).then(res => {
          this.getdata();
          this.addForm = {pk_List:this.querys};
          this.dialogVisible = false;
        })
      },
      //---------------------------------------------修改
      handleEdit(index, row) {
        this.updataForm=row;
        this.updatadialogVisible = true;
      },
      updataMatch:function(){
        fetch.post("/PL/PLupdate", qs.stringify(this.updataForm)).then(res => {
          this.getdata();
          this.adddialogVisible = false;
        })
      },
      //比赛成绩列表
      scoreList:function (row, column) {
        if (column.label === "操作") {
        } else {
          this.$router.push({name:'scoreList',query:{id:row.pk_Gm_Project}})
        }
      },
      //delete
      handleSelectionChange:function(val){
        console.log(val)
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
          .map(item=>item.pk_Gm_Project)
          .filter(item=>item!==undefined);
        fetch.post("/PL/PLdelete",qs.stringify({key:ids.join()}))
          .then(res=>{
            if (res.data.status==="success") {
              this.$message({
                type:"success",
                message:res.data.message
              });
              this.projectList=this.projectList.filter(
                item=>ids.indexOf(item.pk_Gm_Project)=== -1
              )
            }
            this.getdata()
          })


      },
      cancel:function(){
        this.updatadialogVisible=false
        this.getdata();
      },
      //table表头样式
      titletable({row, rowIndex}) {
        return {background: "#212529", color: "#fff"};
      },
      //返回
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
</style>
