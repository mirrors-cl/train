<template>
  <div class="test">
      <div class="head">
         <div class="eyes" v-for="ss in aa">
        {{ss.num}}
           {{ss.word}}
         </div>

      </div>
    <div>
      <span v-for="n in 10">{{n}} </span>
    </div>
    <template>
      <el-select v-model="value6" placeholder="请选择">
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.label"
          :value="item.label">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
    </template>

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
            count:0,
            options:[],
            cities: [{
              value: 'Beijing',
              label: '北京'
            }, {
              value: 'Shanghai',
              label: '上海'
            }, {
              value: 'Nanjing',
              label: '南京'
            }, {
              value: 'Chengdu',
              label: '成都'
            }, {
              value: 'Shenzhen',
              label: '深圳'
            }, {
              value: 'Guangzhou',
              label: '广州'
            }],
            value6: ''
        }
      },
      //初始化生命钩子
      created(){
        this.gettestdata()
      },
      methods:{
        gettestdata(){
          fetch.get('/PF/selectpdftype').then(res => {
            let array = res.data.data;
            let opop =[];
            if (array.length) {
              for (let i=0;i<array.length;i++){
                opop.push({value: `选项${i+1}`,label: `${array[i].type}`})
              }
            this.options = opop
            }else {
              alert('请联系管理员')
            }
          })
        },
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
