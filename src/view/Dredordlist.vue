<template>
  <div class="divbody">
    <div class="delete">
      <el-button type="danger" size="medium" @click="open1" icon="el-icon-delete">删除</el-button>
      <el-button type="primary" size="medium" @click="dialogVisible = true" icon="el-icon-circle-plus-outline">新增</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="athlete"
      :header-cell-style="titletable"
      tooltip-effect="dark"
      style="width: 100%"
       @selection-change="handleSelectionChange">
      <!-- 删除勾选框 -->
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <!-- 详情 -->
      <el-table-column type="expand" width="55" label="详情">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="角色:">
              <span>{{ props.row.record_ROLE }}</span>
            </el-form-item>
            <el-form-item label="项目:">
              <span>{{ props.row.record_PROJECT }}</span>
            </el-form-item>
            <el-form-item label="姓名:">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="联系方式:">
              <span>{{ props.row.record_TELEPHONE }}</span>
            </el-form-item>
            <el-form-item label="年龄:">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="籍贯">
              <span>{{ props.row.nplace }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 列表 -->
      <el-table-column
        prop="record_ROLE"
        label="角色"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="record_DUTY"
        label="职位"
        width="150px">
      </el-table-column>
      <el-table-column
        prop="record_PROJECT"
        label="项目"
      width="100px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      width="100px">
      </el-table-column>
      <el-table-column
        prop="record_TS"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updatedate"
        label="最后更新时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            class="update1"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="classpager"
      background
       @current-change="currentChange"
      layout="total,prev, pager, next"
      :total="total">
    </el-pagination>
    <!--修改弹窗-->
    <el-dialog title="修改管理员信息" :visible.sync="dialogFormVisible" width="37%">
      <el-form :model="form"  label-width="80px"  :label-position="labelPosition">
        <el-form-item label="账号">
          <el-input v-model="form.RECORD_NAME" ></el-input>
        </el-form-item>
         <el-form-item label="姓名" >
          <el-input v-model="form.NAME" ></el-input>
        </el-form-item>
        <!--<el-form-item label="角色" >-->
          <!--<el-select v-model="form.RECORD_ROLE" placeholder="角色">-->
            <!--<el-option label="管理员" value="1"></el-option>-->
            <!--<el-option label="运动员" value="2"></el-option>-->
            <!--<el-option label="教练" value="3"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="职位">
          <el-input v-model="form.RECORD_DUTY"></el-input>
        </el-form-item>
         <el-form-item label="项目">
          <el-input v-model="form.RECORD_PROJECT"></el-input>
        </el-form-item>
         <el-form-item label="联系方式" >
          <el-input v-model="form.RECORD_TELEPHONE"></el-input>
        </el-form-item>
         <el-form-item label="年龄" >
          <el-input v-model="form.AGE" ></el-input>
        </el-form-item>
           <el-form-item label="籍贯">
          <el-input v-model="form.NPLACE"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="qrbutton">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增弹框-->
    <el-dialog title="新增管理员" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" >
      <el-form :model="useraddlist"  label-width="80px" :label-position="labelPosition" :rules="rules" ref="useraddlist">
        <el-form-item label="账号" prop="RECORD_NAME" >
          <el-input v-model.trim="useraddlist.RECORD_NAME"></el-input>
        </el-form-item>
         <el-form-item label="姓名" prop="NAME" >
          <el-input v-model="useraddlist.NAME" ></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="RECORD_DUTY">
          <el-input v-model="useraddlist.RECORD_DUTY"></el-input>
        </el-form-item>
         <el-form-item label="项目" prop="RECORD_PROJECT">
          <el-input v-model="useraddlist.RECORD_PROJECT"></el-input>
        </el-form-item>
         <el-form-item label="联系方式" prop="RECORD_TELEPHONE" >
          <el-input v-model="useraddlist.RECORD_TELEPHONE"></el-input>
        </el-form-item>
         <el-form-item label="年龄" prop="AGE">
          <el-input v-model="useraddlist.AGE" ></el-input>
        </el-form-item>
           <el-form-item label="籍贯" prop="NPLACE">
          <el-input v-model="useraddlist.NPLACE"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addqxbutton">取 消</el-button>
        <el-button type="primary" @click="addqrbutton('useraddlist')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import fetch from "@/assets/js/fetch";
export default {
  name: "admin-list",
  data: function() {
    return {
      //正则表达式
      rules: {
        NAME: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5  个字符', trigger: 'blur' }
        ],
        RECORD_NAME:[
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
        RECORD_PROJECT:[
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
        ],
        RECORD_TELEPHONE:[
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在 11个字符', trigger: 'blur' }
        ],
        AGE:[
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 2, max: 2, message: '请输入正确年龄', trigger: 'blur' }
        ],
        NPLACE:[
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        RECORD_DUTY:[
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],


      },
      userList: [],
      show: false,
      //增加开关
      dialogVisible: false,
      //修改开关
      dialogFormVisible: false,
      //状态勾选值
      multipleSelection: "",
      form: {
        RECORD_DUTY:"",//职责
        PK_RECORD: "", //id
        RECORD_NAME: "", //账号
        RECORD_ROLE: "", //角色
        RECORD_PROJECT: "", //项目
        NAME: "", //姓名
        RECORD_TELEPHONE: "", //联系方式
        AGE: "", //年龄
        NPLACE: "" //籍贯
      },
      useraddlist: {
        RECORD_DUTY:"",//职责
        RECORD_NAME: "", //账号
        RECORD_ROLE: "", //角色
        RECORD_PROJECT: "", //项目
        NAME: "", //姓名
        RECORD_TELEPHONE: "", //联系方式
        AGE: "", //年龄
        NPLACE: "" //籍贯
        // RECORD_TS: "", //创建时间
        // UPDATEDATE: "" //最后更新时间
      },
      page: 1,
      //增加删除弹框对齐方式
      labelPosition: "left"
    };
  },
  created() {
    this.getData();
  },
  computed: {
    athlete() {
      let val = this.page;
      return this.userList.slice((val - 1) * 10, val * 10);
    },
    total() {
      if (this.userList) {
        return this.userList.length;
      }
    }
  },
  methods: {
    addqxbutton(){
      this.$refs["useraddlist"].resetFields();
      this.dialogVisible=false
    },
    //敏感操作
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();

        })
        .catch(_ => {});
    },
    // 请求显示数据
    getData() {
      fetch
        .get("/DR/DRshowlist")
        .then(res => {
          this.userList = res.data;
          this.userList.forEach(item => this.$set(item, "checked", false));
        })
        .catch(err => {
          alert("错误");
        });
    },
    currentChange(val) {
      this.page = val;
    },
    // 状态改变方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //批量删除
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
    //删除
    removeUser() {
      let ids = [];
      ids = this.multipleSelection
        .map(item => item.pk_RECORD)
        .filter(item => item !== undefined);
      fetch
        .post("/DR/DRdelete", qs.stringify({ key: ids.join() }))
        .then(res => {
          if (res.data.status === "success") {
            this.$message({
              type: "success",
              message: res.data.message
            });
            this.userList = this.userList.filter(
              item => ids.indexOf(item.pk_RECORD) === -1
            );
          }
        });
    },
    //修改回显数据UI
    handleEdit(index, row) {
      console.log(row);
      this.form.RECORD_DUTY=row.record_DUTY;
      this.form.PK_RECORD = row.pk_RECORD; //ID
      this.form.RECORD_NAME = row.record_NAME; //昵称
      this.form.RECORD_ROLE = row.record_ROLE; //角色
      this.form.RECORD_PROJECT = row.record_PROJECT; //项目
      this.form.NAME = row.name; //姓名
      this.form.RECORD_TELEPHONE = row.record_TELEPHONE; //联系方式
      this.form.AGE = row.age; //年龄
      this.form.NPLACE = row.nplace; //籍贯
      this.dialogFormVisible = true;
    },
    //修改
    qrbutton() {
      this.form.RECORD_ROLE="管理员";
      fetch
        .post("/DR/DRupdate", qs.stringify({ ...this.form }))
        .then(res => {
          this.getData();
        });
      //修改完取消弹框
      this.dialogFormVisible = false;
    },
    // 增加
    addqrbutton(reddate){
      this.$refs[reddate].validate((valid) => {
        if (valid) {
          this.useraddlist.RECORD_ROLE="管理员";
          fetch
            .post("/DR/DRadd", qs.stringify({ ...this.useraddlist}))
            .then(res => {
              console.log(res.data.data);
              if(res.data.data ===null){
                this.$message({
                  type: "error",
                  message: res.data.message
                });
              }else {
                this.$message({
                  type:"success",
                  message: '增加成功',
                })
                this.getData();
                this.useraddlist = { brand_right: 0 };
                // 取消弹框
                this.dialogVisible = false;
              }
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // -----------------------------------------------------------------------------------------------表格头部样式
    titletable({ row, rowIndex }) {
      return { background: "#212529", color: "#fff" };
    }
  }
};
</script>
<style lang="stylus" scoped>
  button{
    outline:none;
  }
  // 浮动
  .classpager{
    border 1px solid white;
    background-color white
  }
</style>
