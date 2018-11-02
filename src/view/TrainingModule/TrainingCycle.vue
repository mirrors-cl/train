<template>
 <div>
 <el-button type="primary" size="mini" @click="dialogVisible=true">添加训周期</el-button>
  <el-dialog
        title="训练计划"
        :visible.sync="dialogVisible1"
        width="50%"
        :before-close="handleClose">
        <span>
          <el-form ref="trainingDetails" :model="trainingDetails" label-width="80px">
         <el-form-item label="请选择时间" prop="MT_PROJECT_MDATE">
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
            <el-form-item label="训练项目" prop="MT_PROJECT_PROJOCT">
            <el-input v-model="trainingDetails.MT_PROJECT_PROJOCT"></el-input>
          </el-form-item>
                    <el-form-item label="训练内容" prop="MT_PROJECT_PRACTICE">
            <el-input v-model="trainingDetails.MT_PROJECT_PRACTICE"></el-input>
          </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="qxtrainingbutton">取 消</el-button>
        <el-button type="primary" @click="trainingbutton">确 定</el-button>
      </span>
      </el-dialog>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         dialogVisible1=false,
        //  训练周期内容
          trainingDetails: {
          date: "",//某天
          MT_PROJECT_MDATE: "",//时间段
          MT_PROJECT_PROJOCT: "",//训练项目
          user: "",//参与人
          MT_PROJECT_PRACTICE: ""//训练内容
        },

     }
   },
   methods:{

   },
   components: {

   }
 }
</script>

<style>

 
</style>
