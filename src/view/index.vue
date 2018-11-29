<template>
  <div>
    <el-container direction="vertical">
      <el-header height="15%" style="padding: 0px">
        <headhead></headhead>
      </el-header>
      <el-container>
        <el-aside width="200px" style="margin-top: 2px">
          <div class="asidediv">
            <pagemenu></pagemenu>
          </div>
        </el-aside>
        <el-main style="padding: 3px">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import headhead from "@/components/Headhead";
  import pagemenu from "@/view/Navigation/pagemenu"
  import {getStore} from "@/assets/js/utils.js";
  export default {
    name: "table-list",
    components: {
      headhead,
      pagemenu
    },
  };
</script>
<style>
</style>
