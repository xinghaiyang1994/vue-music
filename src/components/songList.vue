<template>
	<div class="main-list">
		<div class="main">
			<div class="header">
				<div class="header-left">
					<i class="icon icon-modelist " v-bind:class="modeIcon" @click="chooseMode"></i>
					<span v-html="modeTxt"></span>
				</div>
				<!--<div class="header-right" @click="delSong('all')">
					<i class="icon icon-delall"></i><span>删除</span>
				</div>-->
			</div>
			<div class="main-song">
				<ul class="songList-wrap">
					<li class="songList-list " v-bind:class="item.id == curSong.id ? 'songList-list-cur':''" v-for="(item,index) in songList">
						<div class="songList-list-info" @click="tabSong(index)">
							<i class="icon icon-voice-cur"></i>
							<h4>{{item.title}}</h4>
							<p>-&nbsp;{{item.author}}</p>
						</div>
						<i class="icon icon-del" @click="delSong(index)" v-show="item.id != curSong.id"></i>
					</li>
				</ul>
			</div>
		</div>
		<div class="main-list-close" v-show="isList" @click="songListShow"></div>
	</div>
</template>

<script>
import Store from '../store'; 
	
	
export default {
	computed:{
		curSong(){
			return Store.state.curSong;
		},
		songList(){
			return Store.state.songList;
		},
		mode(){
			return Store.state.mode;
		},
		modeTxt(){
			var txt;
			if(Store.state.mode == 'loop'){
				txt='列表循环(';
			}else if(Store.state.mode == 'random'){
				txt='随机播放(';
			}else if(Store.state.mode == 'one'){
				txt='单曲循环(';
			}
			return txt+Store.state.songList.length+')';
		},
		modeIcon(){
			if(Store.state.mode == 'loop'){
				return 'icon-modelist-loop';
			}else if(Store.state.mode == 'random'){
				return 'icon-modelist-random';
			}else if(Store.state.mode == 'one'){
				return 'icon-modelist-one';
			}
		}
	},
	props:['isList'],
	methods:{
		songListShow(){
			Store.commit('songListShow','hide');
		},
		delSong(index){
			Store.commit('delSong',index);
		},
		tabSong(index){
			Store.commit('tabSong',index);
		},
		chooseMode(){
			Store.commit('chooseMode');
		}
	}
}
</script>

<style scoped lang="less">
	.main-list{
		position: absolute;
		bottom: -800/75rem;
		left: 0;
		width: 100%;
		height: 800/75rem;
		background: #fff;
		z-index: 1;
		transition: all 1s; 
	}
	.main{
		width: 100%;
		height: 100%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	.main-list-close{
		width: 100%;
		height: 200%;
		position: absolute;
		left: 0;
		bottom: 100%;
		background: rgba(0,0,0,0.5);
	}
	.header{
		width: 100%;
		display: flex;
		height: 103/75rem;
		border: 1px solid #e4e4e4;
	}
	.header-left{
		flex: 1;
		line-height: 103/75rem;
		>span{
			display: inline-block;
			vertical-align: middle;
		}
	}
	.header-right{
		width: 156/75rem;
		height: 100%;
		font-size: 30/75rem;
	}
	.main-song{
		flex: 1;
		overflow-y: auto;
		
	}
	.songList-wrap{
		padding: 0 20/75rem;
	}
	.songList-list{
		height: 94/75rem;
		display: flex;
		border-bottom: 1px solid #e4e4e4;
	}
	.songList-list-info{
		flex: 1;
		line-height: 94/75rem;
		>h4{
			display: inline-block;
			color: #303030;
			font-size: 30/75rem;
		}
		>P{
			display: inline-block;
			font-size: 22/75rem;
			color: #727272;
		}
	}
	.songList-list-cur{
		.songList-list-info{
			>h4{
				color: #d12f25;
			}
			>P{
				color: #d12f25;
			}
		}
	}
	.icon-del{
		width: 73/75rem;
		height: 94/75rem;
		background: url(../assets/img/icon/icon-del.png) no-repeat;
		background-size: contain;
	}
	.icon-voice-cur{
		vertical-align: middle;
		width: 47/75rem;
		height: 90/75rem;
		background: url(../assets/img/icon/icon-voice-cur.png) no-repeat;
		background-size: contain;
		display: none;
	}
	.songList-list-cur .icon-voice-cur{
		display: inline-block;
	}
	.icon-delall{
		display: inline-block;
		width: 78/75rem;
		height: 103/75rem;
		background: url(../assets/img/icon/icon-delall.png) no-repeat;
		background-size: contain;
		vertical-align: middle;
	}
	.icon-modelist{
		display: inline-block;
		width: 70/75rem;
		height: 103/75rem;
		vertical-align: middle;
	}
	.icon-modelist-loop{
		background: url(../assets/img/icon/icon-modelist-loop.png) no-repeat;
		background-size: contain;
	}
	.icon-modelist-random{
		background: url(../assets/img/icon/icon-modelist-random.png) no-repeat;
		background-size: contain;
	}
	.icon-modelist-one{
		background: url(../assets/img/icon/icon-modelist-one.png) no-repeat;
		background-size: contain;
	}
	
</style>