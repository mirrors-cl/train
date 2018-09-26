<template>
   <div class="bkdiv">
        <headhead></headhead>
        <div class="dhdiv">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                 <a class="nav-link"><router-link :to="{name: 'admin-list-2'}">运动员列表</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
              <router-link :to="{name:'admin-list'}">管理员列表</router-link>
              </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">比赛成绩</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">项目列表</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">训练计划</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">训练列表</a>
            </li>
            <!--无法选中的li-->
            <!--<li class="nav-item">-->
                <!--<a class="nav-link disabled" href="#"></a>-->
            <!--</li>-->
        </ul>
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
  components: {
    headhead
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
/* 导航菜单 */
.dhdiv {
  background: linear-gradient(to bottom, #086ed5, #055db5);
  width: 80%;
  margin-left: 10%;
}

li {
  border-bottom: 2px solid #000;
  border-bottom: 0px solid #000;
}

a {
  color: #212529;
}

.table tr:hover {
  cursor: pointer;
  background-color: #1e578f;
}

/* 导航栏鼠标悬停 */
.nav-item:hover {
  background-color: #1e578f;
}

a:hover {
  text-decoration: none;
}

.nav-tabs {
  border-bottom: 0px solid #dee2e6;
}

a:active {
  background-color: #fff;
}
</style>
