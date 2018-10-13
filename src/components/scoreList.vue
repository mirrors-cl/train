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
            :data="scoreList"
            style="width: 100%"
            :header-cell-style="titletable"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="gm_Name"
              label="项目名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="grade_Ranking"
              label="名次"
              width="180">
            </el-table-column>
            <el-table-column
              prop="grade_Group"
              label="小组">
            </el-table-column>
            <el-table-column
              prop="grade_Order"
              label="顺序">
            </el-table-column>
            <el-table-column
              prop="grade_Pname"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="monad"
              label="单位">
            </el-table-column>
            <el-table-column
              prop="grade"
              label="成绩">
            </el-table-column>
            <el-table-column
              prop="grade_Remark"
              label="备注">
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
           <el-form :label-position="labelPosition" label-width="80px" :model="form">
                <el-form-item label="项目名称">
                  <el-input v-model="form.gm_Name"></el-input>
                </el-form-item>
              <el-form-item label="名次">
                  <el-input v-model="form.grade_Ranking"></el-input>
                </el-form-item>
              <el-form-item label="小组">
                  <el-input v-model="form.grade_Group"></el-input>
                </el-form-item>
              <el-form-item label="顺序">
                  <el-input v-model="form.grade_Order"></el-input>
                </el-form-item>
              <el-form-item label="姓名">
                  <el-input v-model="form.grade_Pname"></el-input>
                </el-form-item>
              <el-form-item label="单位">
                  <el-input v-model="form.monad"></el-input>
                </el-form-item>
              <el-form-item label="成绩">
                  <el-input v-model="form.grade"></el-input>
                </el-form-item>
              <el-form-item label="备注">
                  <el-input v-model="form.grade_Remark"></el-input>
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
                <el-form-item label="项目名称">
                  <el-input v-model="updataForm.gm_Name"></el-input>
                </el-form-item>
              <el-form-item label="名次">
                  <el-input v-model="updataForm.grade_Ranking"></el-input>
                </el-form-item>
              <el-form-item label="小组">
                  <el-input v-model="updataForm.grade_Group"></el-input>
                </el-form-item>
              <el-form-item label="顺序">
                  <el-input v-model="updataForm.grade_Order"></el-input>
                </el-form-item>
              <el-form-item label="姓名">
                  <el-input v-model="updataForm.grade_Pname"></el-input>
                </el-form-item>
              <el-form-item label="单位">
                  <el-input v-model="updataForm.monad"></el-input>
                </el-form-item>
              <el-form-item label="成绩">
                  <el-input v-model="updataForm.grade"></el-input>
                </el-form-item>
              <el-form-item label="备注">
                  <el-input v-model="updataForm.grade_Remark"></el-input>
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
    name: "scoreList",
    data: function () {
      return {
        show3:false,
        //right对齐方式
        labelPosition: 'right',
        //dialog
        dialogVisible: false,
        //diglog
        adddialogVisible: false,
        scoreList: [],
        form: {
          pk_Gm_Project:"",//项目主键
          gm_Name:"",//项目名称
          grade:"",//成绩
          grade_Group:"",//小组
          grade_Order:"",//顺序
          grade_Pname:"",//姓名
          grade_Ranking:"",//名次
          grade_Remark:"",//备注
          monad:"",//单位
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
      querys:function(){
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
        fetch
          .get("/GC/GCshowlist",{
            params:{
              pk_Gm_Project:this.querys
            }
          })
          .then(res => {
            this.scoreList = res.data.data;
            // console.log(rest.data);
            // this.competitionList.forEach(item => this.$set(item, "checked", false));
          })
          .catch(errors => {
            alert("服务器错误")
          })
      },
      //add
      competiTionadd: function () {
        debugger
        console.log({...this.form});
        this.form.pk_Gm_Project=this.querys;
        fetch.post("/GC/GCadd", qs.stringify(this.form)).then(res => {
          this.getdata();
          this.dialogVisible = false;
        })
      },
      //---------------------------------------------修改
      handleEdit(index, row) {
       this.updataForm=row;
        this.adddialogVisible = true;
      },
      updataMatch:function(){
        console.log(this.updataForm);
        fetch.post("/GC/GCupdate", qs.stringify(this.updataForm)).then(res => {

          //刷新数据
          this.getdata();
          //状态改变
          this.adddialogVisible = false;
        })
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
          .map(item=>item.pk_Grade)
          .filter(item=>item!==undefined);
        fetch.post("/GC/GCdelete",qs.stringify({key:ids.join()}))
          .then(res=>{
            if (res.data.status==="success") {
              this.$message({
                type:"success",
                message:res.data.message
              });
              this.scoreList=this.scoreList.filter(
                item=>ids.indexOf(item.pk_Grade)=== -1
              )
            }
          })
      },
      cancel:function(){
        this.adddialogVisible=false;
        this.getdata();
      },
      //table表头样式
      titletable({row, rowIndex}) {
        return {background: "#212529", color: "#fff"};
      },
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
