<template>
  <div>
      <!--<el-button type="primary" size="mini" @click="checkOut" v-show="zjbutton">添加训练内容</el-button>-->
  <el-button type="primary" size="mini" @click="checkOut">添加训练内容</el-button>
        <el-dialog
        title="勾选参与运动员"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>
          <template>
            <!--搜索运动员-->
            <el-row>
              <el-col :span="8"> <el-input v-model="selectplayer" suffix-icon="el-icon-edit"
                                           placeholder="请输入运动员姓名"></el-input></el-col>
                 <el-col :span="8"><el-button type="primary" icon="el-icon-search"
                                              @click="selectName">搜索</el-button></el-col>
            </el-row>
            <!--运动员勾选列表-->
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
  </div>
</template>

<script>
  import fetch from "@/assets/js/fetch.js"
  import qs from "qs";
 export default {
   data () {
     return {
       //运动员
       playerform: [],

     zjbutton:false,
     selectplayer: "",
     dialogVisible:false

     }
   },
   methods:{
       //select
      selectName: function () {
        fetch.post("/DP/likeSearch", qs.stringify({name: this.selectplayer})).then(res => {
          this.playerform = res.data.data
        })
      },
         //运动员信息
      playerdata: function () {
        fetch.get("/DP/DPshowlist").then(res => {
          this.playerform = res.data.data
        })
      },
       //勾选操作
      checkOut: function () {
        // this.playercheck = "1";

        this.playerdata();
        this.dialogVisible = true
      },

   },
   components: {

   }
 }
</script>

<style>


</style>
