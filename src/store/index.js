import Vue from 'vue';
import Vuex from 'vuex';



Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		isList:false,		//播放页歌曲列表显隐
		isSide:false,		//主页侧边显隐
		isStart:true,		//是否播放
		isLrc:false,			//是否切换到歌词
		curSong:{			//当前歌曲信息
			title:'青花瓷',
			author:'周杰伦',
			id:410316,
			imgId:33021
		},
		songList:[			//歌曲列表
			{			
				title:'青花瓷',
				author:'周杰伦',
				id:410316,
				imgId:33021
			},
			{			
				title:'青花瓷',
				author:'周杰伦',
				id:41031,
				imgId:33021
			},
		],
		curLrc:[],			//当前歌词
		curTime:0,			//歌曲当前播放时长
		allTime:1,			//歌曲总播放时长
		curVolume:0.8		//音量控制
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
		},
		songListShow(state,info){
			if(info == 'show'){
				state.isList=true;
			}else if(info == 'hide'){
				state.isList=false;
			}
		},
		delSong(state,index){
			if(index == 'all'){
				state.songList=[];
			}else{
				state.songList.splice(index,1);
			}
		}
	}
});


