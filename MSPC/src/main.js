import Vue from 'vue';
import App from './App.vue';
import routes from './config/routes.js';
import store from './config/store.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueRouter from 'vue-router';
import Layout from './public/layout';
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@/assets/css/Public.css'
import api from './config/api';

// import MetaInfo from 'vue-meta-info'
// Vue.use(MetaInfo)

Vue.use(VueQuillEditor);
Vue.use(iView);
Vue.use(VueRouter);

let router = new VueRouter({
    mode: 'hash',
    routes
});
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
  })

  router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {   // 判断该路由是否需要登录权限
      if (localStorage.code==1006) {  // 通过vuex state获取当前的token是否存在
        next({
            path: '/',
            query: {reLogin: true}
          })
      }
      else {
        next();
      }
    }
    else {
      next();
    }
  })
Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    store,
    template: '<Layout/>',
    components: { Layout }
    // ,
    // mounted () {
    //     document.dispatchEvent(new Event('render-event'))
    // }
})

