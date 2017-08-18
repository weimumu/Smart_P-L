import Vue from 'vue';
import Router from 'vue-router';
import home from '../components/homepage/home.vue';
import registSuccess from '../components/regist/registSuccess.vue';
import loginFin from '../components/login/loginFin.vue';
import loginFac from '../components/login/loginFac.vue';
import registMain from '../components/regist/registMain.vue';
import intro from '../components/homepage/intro.vue';
import introduction from '../components/homepage/introduction.vue';
import cooperate from '../components/homepage/cooperate.vue';
import information from '../components/homepage/information.vue';
import aboutus from '../components/homepage/aboutus.vue';
Vue.use(Router);

export default new Router({
  mode: 'history',
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
      path: '/introduction',
      name: 'introduction',
      component: introduction
    },
    {
      path: '/cooperate',
      name: 'cooperate',
      component: cooperate
    },
    {
      path: '/information',
      name: 'information',
      component: information
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: aboutus
    }
  ]
});
