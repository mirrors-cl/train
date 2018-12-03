<template>
  <div id="app">
    <transition name="slide-fade">
    <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style>
  body {
    background: url("./assets/img/top2.jpg") no-repeat center center;
    background-size: 100% 100%;
    /*background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);*/
    filter:alpha(opacity=60);-moz-opacity:0.6;opacity:0.95;
  }
  * {
    margin: 0%;
    padding: 0;
  }
</style>
