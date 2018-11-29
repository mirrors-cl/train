<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-vertical-demo"
    @select="handleSelect"
    background-color="#304156"
    text-color="#BFCBD9"
    active-text-color="rgb(64, 158, 255)">
    <el-menu-item index="1"><i class="el-icon-menu"></i>运动员列表</el-menu-item>
    <el-menu-item index="2"><i class="el-icon-menu"></i>管理员列表</el-menu-item>
    <el-menu-item index="3"><i class="el-icon-menu"></i>{{competition}}</el-menu-item>
    <el-menu-item index="4"><i class="el-icon-menu"></i>训练计划</el-menu-item>
    <el-menu-item index="5"><i class="el-icon-menu"></i>运动员表现统计</el-menu-item>
  </el-menu>

</template>

<script>
  import {getStore} from "@/assets/js/utils.js";
    export default {
      name: "pagemenu",
      data:function(){
        let userInfo=getStore('userInfo');
        return{
          // activeName2:'first',
          activeIndex2:'1'
        }
      },
      created(){
        this.Navigationmenu()
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
          }else if (keyPath ==5){
            this.$router.push({name:'productDataList'})
          }
        },
        //动态颜色
        Navigationmenu(){
          const {name} =this.$route;
          if (name==='admin-list-2'){
            this.activeIndex2='1'
          }else if (name==='admin-list'){
            this.activeIndex2='2'
          }else if(name==='Competition'){
            this.activeIndex2='3'
          }else if (name==='trainingList') {
            this.activeIndex2='4'
          }else if (name==='productDataList'){
            this.activeIndex2='5'
          }
        }
      },
      computed:{
        competition(){
          const {name}=this.$route;
          switch (name) {
            case 'scoreList':
              return '成绩列表';
              break;
            case 'projectList':
              return '项目列表';
              break;
            default:
              return '比赛列表'
          }
        },

      },
    }
</script>

<style scoped>

</style>
