<template>
  <div class="baymax">
      <div class="head">
         <div class="eyes"></div>
      </div>

  </div>
</template>



<script>
  import fetch from "@/assets/js/fetch.js";
    export default {
      name: "test",
      data:function(){
          return{
        }
      },
      created(){
      },
      methods:{
        appi:function(){
            fetch
              .get("https://gank.io/api/today")
              .then(res => {
                console.log(res)
            }).catch(error=>{
              alert("服务器错误")
            })
        },
    }
    }
</script>

<style scoped>
  html,body{

    height:100%;

    width:100%;

    border:hidden;

    overflow:hidden;
    background-color: red;

  }
</style>
