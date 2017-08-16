import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import registSuccess from '../components/regist/registSuccess.vue';
import loginFin from '../components/login/loginFin.vue';
import loginFac from '../components/login/loginFac.vue';
import registMain from '../components/regist/registMain.vue';
import intro from '../components/homepage/intro.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/regist',
      name: 'registMain',
      component: registMain
    },
    {
      path: '/success',
      name: 'registSuccess',
      component: registSuccess
    },
    {
      path: '/loginfin',
      name: 'loginFin',
      component: loginFin
    },
    {
      path: '/loginfac',
      name: 'loginfac',
      component: loginFac
    },
    {
      path: '/intro',
      name: 'intro',
      component: intro
    }
  ]
});
