<template>
 <div>
 <el-button type="primary" size="mini" @click="dialogVisible=true">添加训周期</el-button>
  <el-dialog
        title="添加训练计划"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>
              <el-form label-width="80px" :model="formLabelAlign" ref="formLabelAlign">
                <el-form-item label="选择时间" prop="date">
                 <el-date-picker
                   v-model="formLabelAlign.date"
                   type="dates"
                   placeholder="选择一个或多个日期"
                   format="yyyy 年 MM 月 dd 日"
                   value-format="yyyy-MM-dd">
                </el-date-picker>
                </el-form-item>
              <el-form-item label="地点" prop="title">
                <el-input v-model="formLabelAlign.title"></el-input>
              </el-form-item>
              <el-form-item label="训练简介" prop="drill_practice">
                <el-input v-model="formLabelAlign.drill_practice" type="textarea" row="3"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">立即创建</el-button>
              </el-form-item>
            </el-form>
        </span>
      </el-dialog>
 </div>
</template>
<script>
  import fetch from "@/assets/js/fetch.js"
  import {getStore} from "@/assets/js/utils.js";
  import qs from "qs";
 export default {
   name:"TrainingCycle",
   data:function () {
     let userInfo = getStore('userInfo');
     return {
        userinfoname:userInfo.user_NAME,
         dialogVisible:false,
          //添加训练周期
        formLabelAlign: {
          date: '',
          title: '',//地点
          drill_practice: '',//简介
          record_name: ''
        },
     }
   },
   methods:{
        //创建训练周期
      submitForm() {
        // this.formLabelAlign.date.join();
        fetch
          .post("/RC/drillAdd", qs.stringify({
            date: this.formLabelAlign.date.join(),
            title: this.formLabelAlign.title,
            drill_practice: this.formLabelAlign.drill_practice,
            record_name:this.userinfoname
          }))
          .then(res => {
            this.$emit('addcycle')
          });
        //正则修改时间格式（日期插件规定了时间格式）
        // this.formLabelAlign.date=this.formLabelAlign.date.replace(/-/g,'/');
        //this.demoEvents.push(this.formLabelAlign);
         this.formLabelAlign = { brand_right: 0 };
        this.dialogVisible = false
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            //重置playercheck
            this.playercheck = "";
            done();
          })
          .catch(_ => {
          });
      },
   },
 }
</script>

<style>


</style>
