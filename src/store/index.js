import Vue from 'vue';
import Vuex from 'vuex';



Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		isLrc:true,
		curSong:{
			title:'青花瓷',
			author:'周杰伦',
			id:410316,
			imgId:33021
		},
		curLrc:[],
		curTime:0
	},
	mutations:{
		resetCur(state,item){
			state.curSong=item;
		},
		lrcTab(state){
			state.isLrc=!state.isLrc;
		},
		updateTime(state,time){
			state.curTime=time;
		}
	}
});


