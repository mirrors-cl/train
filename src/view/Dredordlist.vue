<template>
  <div class="divbody" id="myView">
    <div class="delete">
      <el-button type="primary" size="medium" @click="open1" icon="el-icon-delete">删除</el-button>
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
        label="角色">
      </el-table-column>
      <el-table-column
        prop="record_PROJECT"
        label="项目">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
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
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
       @current-change="currentChange"
      layout="total,prev, pager, next"
      prev-text="上一页"
      next-text="下一页"
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
        <el-form-item label="角色" >
          <el-select v-model="form.RECORD_ROLE" placeholder="角色">
            <el-option label="医生" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="教练" value="3"></el-option>
          </el-select>
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
    
    <!-- 新增弹框 -->
        <el-dialog title="新增管理员" :visible.sync="dialogVisible" width="37%" >
      <el-form :model="useraddlist"  label-width="80px" :label-position="labelPosition">
        <el-form-item label="账号"  >
          <el-input v-model="useraddlist.RECORD_NAME"></el-input>
        </el-form-item>
         <el-form-item label="姓名" >
          <el-input v-model="useraddlist.NAME" ></el-input>
        </el-form-item>
        <el-form-item label="角色"  >
          <el-select   v-model="useraddlist.RECORD_ROLE" placeholder="角色">
            <el-option label="医生" value="医生"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="教练" value="教练"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="项目">
          <el-input v-model="useraddlist.RECORD_PROJECT"></el-input>
        </el-form-item>
         <el-form-item label="联系方式"  >
          <el-input v-model="useraddlist.RECORD_TELEPHONE"></el-input>
        </el-form-item>
         <el-form-item label="年龄" >
          <el-input v-model="useraddlist.AGE" ></el-input>
        </el-form-item>
           <el-form-item label="籍贯">
          <el-input v-model="useraddlist.NPLACE"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addqrbutton">确 定</el-button>
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
      userList: [],
      show: false,
      //增加开关
      dialogVisible: false,
      //修改开关
      dialogFormVisible: false,
      //状态勾选值
      multipleSelection: "",
      form: {
        PK_RECORD: "", //id
        RECORD_NAME: "", //昵称
        RECORD_ROLE: "", //角色
        RECORD_PROJECT: "", //项目
        NAME: "", //姓名
        RECORD_TELEPHONE: "", //联系方式
        AGE: "", //年龄
        NPLACE: "" //籍贯
      },
      useraddlist: {
        RECORD_NAME: "", //昵称
        RECORD_ROLE: "", //角色
        RECORD_PROJECT: "", //项目
        NAME: "", //姓名
        RECORD_TELEPHONE: "", //联系方式
        AGE: "", //年龄
        NPLACE: "" //籍贯
        // RECORD_TS: "", //创建时间
        //  UPDATEDATE: "" //最后更新时间
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
    // 请求显示数据
    getData: function() {
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
    handleSelectionChange: function(val) {
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
    removeUser: function() {
      debugger;
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
    handleEdit: function(index, row) {
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
    qrbutton: function() {
      axios
        .post("/api/DR/DRupdate", qs.stringify({ ...this.form }))
        .then(res => {
          this.getData();
        });
      //修改完取消弹框
      this.dialogFormVisible = false;
    },
    // 增加
    addqrbutton: function(reddate) {
      axios
        .post("/api/DR/DRadd", qs.stringify({ ...this.useraddlist }))
        .then(res => {
          this.getData();
          this.useraddlist = { brand_right: 0 };
        });
      // 取消弹框
      this.dialogVisible = false;
    },
    // -----------------------------------------------------------------------------------------------表格头部样式
    titletable({ row, rowIndex }) {
      return { background: "#212529", color: "#fff" };
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style>-->
<!--.el-input {-->
  <!--width: 50%;-->
<!--}-->
<!--</style>-->
<style lang="stylus" scoped>
.divbody {
  width: 80%;
  height: 400px;

  margin-left: 10%;
  user-select: none;
}
</style>
