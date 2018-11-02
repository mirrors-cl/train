<template>
  <div class="test">
    <button-counter></button-counter>
      <div class="head">
         <div class="eyes" v-for="ss in aa">
        {{ss.num}}
           {{ss.word}}
         </div>

      </div>
    <div>
      <span v-for="n in 10">{{n}} </span>
    </div>

  </div>
</template>
<script>
  import fetch from "@/assets/js/fetch.js";
    export default {
      name: "test",
      data:function(){
          return{
            aa:{
              num:"",
              word:""
            },
            count:0
        }
      },
      template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>',
      //初始化生命钩子
      created(){
        this.getData();
      },
      methods:{

        getData:function(){
            fetch
              .get("http://210.73.217.81:20005/api/data-screen/hot-word",{
                params: {
                  num: 2
                }
              }).then(function (item) {
              console.log(item.data.data)
            } )
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
