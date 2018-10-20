// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//vue-cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
//vue-event-calendar

//日期插件
import 'vue-event-calendar/dist/style.css'
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {locale: 'zh'});

//const $ = require('jquery')
/* eslint-disable no-new */
export function setCookie (c_name, value, expiredays) {

  var exdate = new Date();

  exdate.setDate(exdate.getDate() + expiredays);

  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());

};

//router全局路由守卫
router.beforeEach((to, from, next) => {

  function getCookie(token)
  {
    var aCookie = document.cookie.split("; ");
    console.log(aCookie);
    for (var i=0; i < aCookie.length; i++)
    {
      var aCrumb = aCookie[i].split("=");
      if (token == aCrumb[0])
        return unescape(aCrumb[1]);
    }
    return null;
  }

  if (to.meta.requireAuth){
    if (getCookie('token')){
      next();
    }else {
      next({
        path:'/login',
        query: {redirect: to.fullPath}
      })


    }
  }else {
    next();
  }


})

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
