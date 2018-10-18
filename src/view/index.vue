<template>

  <div class="bkdiv">
    <headhead></headhead>
    <div class="dhdiv">
      <!--<template>-->
        <!--<el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">-->
          <!--<el-tab-pane>-->
            <!--<span slot="label"><i class="el-icon-menu"> </i>运动员列表</span>-->
          <!--</el-tab-pane>-->
          <!--<el-tab-pane name="first">-->
            <!--<span slot="label"><i class="el-icon-menu"></i>管理员列表</span>-->
          <!--</el-tab-pane>-->
          <!--<el-tab-pane>-->
            <!--<span slot="label"><i class="el-icon-menu"></i>比赛成绩</span>-->
          <!--</el-tab-pane>-->
          <!--<el-tab-pane>-->
            <!--<span slot="label"><i class="el-icon-menu"></i>训练计划</span>-->
          <!--</el-tab-pane>-->
          <!--<el-tab-pane>-->
            <!--<span slot="label"><i class="el-icon-menu"></i>运动员表现统计</span>-->
          <!--</el-tab-pane>-->
          <!--<el-tab-pane>-->
            <!--<span slot="label"><i class="el-icon-menu"></i>训练数据报告</span>-->
          <!--</el-tab-pane>-->
        <!--</el-tabs>-->
      <!--</template>-->
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"

      >
        <el-menu-item index="1"><i class="el-icon-menu"></i>运动员列表</el-menu-item>
        <el-menu-item index="2"><i class="el-icon-menu"></i>管理员列表</el-menu-item>
        <el-menu-item index="3"><i class="el-icon-menu"></i>{{competition}}</el-menu-item>
        <el-menu-item index="4"><i class="el-icon-menu"></i>训练计划</el-menu-item>
        <el-menu-item index="5"><i class="el-icon-menu"></i>运动员表现统计</el-menu-item>
        <!--<el-menu-item index="6"><i class="el-icon-menu"></i>训练数据报告</el-menu-item>-->
      </el-menu>
    </div>

    <!-- 显示内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from "axios";
  import qs from "qs";
  import headhead from "@/components/Headhead";
  import {getStore} from "@/assets/js/utils.js";
  export default {
    name: "table-list",
    data:function(){
      let userInfo=getStore('userInfo');
      return{
        // activeName2:'first',
        activeIndex2:'1'
      }
    },
    created(){
    },

    methods:{
      handleSelect(key, keyPath) {
        if (keyPath ==1){
          this.$router.push({name:'admin-list-2'})
        }else if(keyPath ==2){
          this.$router.push({name:'admin-list'})
        }else if (keyPath ==3) {
          this.$router.push({name:'Competition'})
        }else if (keyPath ==4){
          this.$router.push({name:'trainingList'})
        }
      },
      // handleClick(tab, event) {
      //   let index =tab.index;
      //   console.log(tab.index);
      //   if(index==0) {
      //     this.$router.push({name:'admin-list-2'})
      //   }else if(index==1){
      //     this.$router.push({name:'admin-list'})
      //   }else if(index==2){
      //     this.$router.push({name:'Competition'})
      //   }else if(index==3){
      //     this.$router.push({name:'trainingList'})
      //   }
      // }
    },
    computed:{
      competition(){
        const {name}=this.$route
        if(name==='scoreList'){

          return '成绩列表'
        }else if(name==='projectList'){
          return '项目列表'
        }else {
          return '比赛列表'
        }


      }
    },
    components: {
      headhead
    }
  };
</script>
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
