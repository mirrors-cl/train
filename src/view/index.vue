<template>
  <div class="bkdiv">
    <headhead></headhead>
    <div class="dhdiv">
      <template>
        <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick" >
          <el-tab-pane>
            <span slot="label"><i class="el-icon-menu"></i>运动员列表</span>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-menu"></i>管理员列表</span>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-menu"></i>比赛列表</span>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-menu"></i>比赛成绩</span>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-menu"></i>训练计划</span>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-menu"></i>训练列表</span>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
    <!-- 显示内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from "axios";
  import qs from "qs";
  import headhead from "@/components/Headhead";

  export default {
    name: "table-list",
    data:function(){
      return{
        activeName2:'first'
      }
    },
    created(){

    },
    methods:{
      handleClick(tab, event) {
        let index =tab.index;
        console.log(tab.index);
        if(index==0) {
          this.$router.push({name:'admin-list-2'})
        }else if(index==1){
          this.$router.push({name:'admin-list'})

        }else if (index==2){
          this.$router.push({name:'Competition'})
        }
      }

    },
    components: {
      headhead
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-tabs__content{
    display: none;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    background-color: rgb(197, 208, 218);
  }
</style>
<style scoped lang="stylus">
.dhdiv{
  width:80%;
  margin-left 10%
}
</style>
