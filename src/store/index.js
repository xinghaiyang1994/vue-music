import Vue from 'vue';
import Vuex from 'vuex';

function rnd(m,n){
	return parseInt(m+Math.random()*(n-m+1));
}

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		mode:'loop',				//播放模式
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
				title:'红尘客栈',
				author:'周杰伦',
				id:5177680,
				imgId:194021
			},
			{			
				title:'流年',
				author:'王菲',
				id:1253916,
				imgId:104072
			}
		],
		curLrc:[],			//当前歌词
		curTime:0,			//歌曲当前播放时长
		allTime:0,			//歌曲总播放时长
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
				state.surSong={
					title:'',
					author:'',
					id:'',
					imgId:''
				};
			}else{
				state.songList.splice(index,1);
			}
		},
		addSong(state,item){
			state.songList.unshift(item);
		},
		chooseMode(state){
			if(state.mode == 'loop'){
				state.mode='random';
			}else if(state.mode == 'random'){
				state.mode='loop';
			}
		},
		tabSong(state,info){
			if((typeof info) == 'number'){
				state.curSong=state.songList[info];
			}else{
				var iNow;
				var l=state.songList.length;
				for(var i=0;i<l;i++){
					if(state.songList[i].id == state.curSong.id){
						iNow=i;
					}
				}
				if(info == 'next'){
					iNow++;
					if(iNow>l-1){
						iNow=0;
					}
				}else if(info == 'prev'){
					iNow--;
					if(iNow<0){
						iNow=l-1;
					}
				}
				state.curSong=state.songList[iNow];
			}
		}
	},
	actions:{
		chooseSong({state,commit}){
			if(state.mode == 'loop'){
				commit('tabSong','next');
			}else if(state.mode == 'random'){
				var iRandom=rnd(0,state.songList.length-1);
				var iNow;
				var l=state.songList.length;
				for(var i=0;i<l;i++){
					if(state.songList[i].id == state.curSong.id){
						iNow=i;
					}
				}
				while(iRandom == iNow){
					iRandom=rnd(0,state.songList.length-1);
				}
				commit('tabSong',iRandom);
			}
		}
	}




});


