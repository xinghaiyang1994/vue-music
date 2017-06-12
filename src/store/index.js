import Vue from 'vue';
import Vuex from 'vuex';



Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		isStart:true,
		isLrc:false,
		curSong:{
			title:'青花瓷',
			author:'周杰伦',
			id:410316,
			imgId:33021
		},
		curLrc:[],
		curTime:0,
		allTime:0,
		curVolume:0.8
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
		},
		getAllTime(state,time){
			state.allTime=time;
		},
		ctrl(state){
			state.isStart=!state.isStart;
		},
		changeVolume(state,volume){
			state.curVolume=volume;
		}
	}
});


