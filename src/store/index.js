import Vue from 'vue';
import Vuex from 'vuex';



Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		isSide:false,
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
		allTime:1,
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
		},
		changeProgress(state,progress){
			state.curTime=state.allTime*progress;
		},
		songCtrl(state,info){
			if(info == 'stop'){
				state.isStart=false;
			}else if(info == 'start'){
				state.isStart=true;
			}
		},
		side(state,info){
			if(info == 'show'){
				state.isSide=true;
			}else if(info == 'hide'){
				state.isSide=false;
			}
		}
	}
});


