import Vue from 'vue';
import Router from 'vue-router';
import Home from '../page/home';
import Search from '../page/search';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
    	path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
