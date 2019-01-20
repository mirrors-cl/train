<template>
  <div>
    <el-button type="primary" size="mini" @click.native="dialogVisible=true">设置项目</el-button>
    <el-dialog
      title="权限中心"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body=true
      :before-close="handleClose">
      <span>账号：{{userInfo.user_NAME}}<br/><br/>
          设置：
         <el-select v-model="role_classification" placeholder="请选择分类" style="width: 120px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
      </span>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="set_up">设 置</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import fetch from "@/assets/js/fetch.js";
  import qs from "qs";
  import {getStore} from "@/assets/js/utils.js";
    export default {
      name: "Jurisdiction",
      props:{
        pro:{
          type: String,
          default: '没有项目'
        }
      },
      data(){
        return{
          dialogVisible:false,
          //获取用户数据
          userInfo: getStore('userInfo'),
          //v-mode 参数
          role_classification:'',
          //项目数组
          options:[],
        }
      },
      created(){
        this.getdata();
      },
      comments:{
        // sju(){
        //   // if (this.pro === []){
        //   //   return 'asdasdasdas'
        //   // } else {
        //   //   return '没有数据'
        //   // }
        //   console.log(this.pro)
        // }
      },
      methods:{
        set_up(){
          // 向父组件传值
          this.$emit('myEvent',this.role_classification);
          //关闭弹框
          this.dialogVisible=false;
        },
        getdata(){
          fetch.get('/RC/showAllProject').then(res =>{
            let array= res.data.data
            if (array.length){
              for (let i=0;i<array.length;i++){
                this.options.push({value: `选项${i+1}`,label: `${array[i]}`})
              }
            } else {
              this.$message({
                message: 'RC接口数据为空',
                type: 'warning'
              });
            }

          })
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
