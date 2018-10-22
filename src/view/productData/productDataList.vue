<template>
  <div id="app">

    <!--数据测试按钮-->
    <el-button @click="getdata">sss</el-button>
  </div>
</template>

<script>
  import fetch from "@/assets/js/fetch.js";
  import qs from "qs";
  export default {
  name: "productDataList",
  data:function () {
      return{
        tableData:[]

   }
  },
  //initfunction
  created(){
    this.getdata()

  },
  //计算属性
  computed:{

  },
  //funcation
  methods:{
    getdata:function(){
      fetch.get("/SC/selectPlayerCount").then(res=>{

      }).catch(error=>{
        console.log("请求失败")
      })
    }

  }

};
</script>

<style>

</style>
