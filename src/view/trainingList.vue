<template>
  <div class="bodydiv">
    <div class="modeldiv">
      <template>
        <vue-event-calendar :events="demoEvents" @monthChanged="" @dayChanged="">
        </vue-event-calendar>
      </template>
    </div>

  </div>
</template>
<script>
  import fetch from "@/assets/js/fetch.js"
  import qs from "qs";
  export default {
    name: "ath-list",
    data: function () {
      return {
        demoEvents: [{
          date: '2016/12/15',
          title: '训练计划',
          desc: '上午三小时体能训练'
        },{
          date: '2016/11/12',
          title: 'this is a title'
        }]
      }
    },
    created() {

    },
    //计算属性
    computed: {

    },
    methods: {
      monthChange (month) {
        console.log(month)
      },
      dayChange (day) {
        console.log(day)
      },
      //table样式
      titletable({row, rowIndex}) {
        return {background: "#212529", color: "#fff"};
      }
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modeldiv {
    width: 80%;
    height: 100px;

    margin-left: 10%;
    user-select: none;
  }

</style>
