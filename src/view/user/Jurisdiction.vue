<template>
  <div>
    <el-dropdown-item @click.native="dialogVisible=true">个人权限</el-dropdown-item>
    <el-dialog
      title="权限中心"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body=true
      :before-close="handleClose">
      <span>个人账号：{{userInfo.user_NAME}}<br/>
          项目：
         <el-select v-model="yd" placeholder="请选择分类" style="width: 120px">
              <el-option
                v-for="item in xiangmu"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible=false">设 置</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getStore} from "@/assets/js/utils.js";
    export default {
      name: "Jurisdiction",
      data(){
        return{
          dialogVisible:false,
          userInfo: getStore('userInfo'),
          yd:'',
          xiangmu:[
            {label:'jump'},
            {label:'run'}
          ]
        }
      },
      methods:{
        dialog(){

        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        }

      }
    }
</script>

<style scoped>

</style>
