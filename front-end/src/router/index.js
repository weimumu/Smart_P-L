import Vue from 'vue';
import Router from 'vue-router';
import home from '../components/homepage/home.vue';
import registSuccess from '../components/regist/registSuccess.vue';
import loginFin from '../components/login/loginFin.vue';
import loginFac from '../components/login/loginFac.vue';
import registMain from '../components/regist/registMain.vue';
import intro from '../components/homepage/intro.vue';
import cooperate from '../components/homepage/cooperate.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
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
    },
    {
      path: '/cooperate',
      name: 'cooperate',
      component: cooperate
    }
  ]
});
