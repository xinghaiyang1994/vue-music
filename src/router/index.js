import Vue from 'vue';
import Router from 'vue-router';

import Home from '../page/home';
import Search from '../page/search';
import Play from '../page/play';

import Music from '../components/music';
import Song from '../components/song';
import Group from '../components/group';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect:'/music',
      children:[
      	{
	      	path:'music',
	      	component:Music
      	},
      	{
	      	path:'song',
	      	component:Song
      	},
      	{
	      	path:'group',
	      	component:Group
      	}
      	]
    },
    {
    	path: '/search',
      name: 'search',
      component: Search
    },
    {
    	path: '/play',
      name: 'play',
      component: Play
    }
  ]
})
