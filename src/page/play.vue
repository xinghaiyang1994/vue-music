<template>
	<div class="main-play">
		<div class="play">
			<audio v-bind:src="src" autoplay id="audio"></audio>
			<header>
				<i class="icon icon-back" @click="toBack"></i>
				<div class="song-info">
					<h2 class="song-title">{{curSong.title}}</h2>
					<p class="song-author">{{curSong.author}}</p>
				</div>
				<i class="icon"></i>
			</header>
			<round class="section" v-show="!isLrc" v-bind:isStart="isStart" ></round>
			<lrc class="section" v-show="isLrc" v-bind:curTime="curTime" v-bind:allTime="allTime"></lrc>
			<footer>
				<div class="progress">
					<span>{{curTime | toShowTime}}</span>
					<div class="progress-main">
						<div class="progress-box">
							<span class="progress-bar" v-bind:style="'width:'+(curTime*100/allTime)+'%'"></span>
							<em class="progress-round" v-bind:style="'left:'+(curTime*100/allTime)+'%'"></em>
						</div>
					</div>
					<span>{{allTime | toShowTime}}</span>
				</div>
				<div class="footer-choose">
					<i class="icon" v-bind:class="mode == 'loop'?'icon-mode-loop':'icon-mode-random'" @click="chooseMode"></i>
					<span class="icon icon-ctrl-left" @click="tabSong('prev')"></span>
					<div class="footer-ctrl">
						<div class="ctrl-wrap" @click="ctrl">
							<i class="icon icon-ctrl-start " v-bind:class="isStart?'':'icon-ctrl-stop'"></i>
						</div>
					</div>
					<span class="icon icon-ctrl-right" @click="tabSong('next')"></span>
					<i class="icon icon-song-list" @click="songListShow"></i>
				</div>
			</footer>
		</div>
		<song-list class="song-list" v-bind:isList="isList"></song-list>
	</div>
</template>

<script>
import Vue from 'vue'; 

import Store from '../store'; 
import Router from '../router'; 

import round from '../components/round'; 
import lrc from '../components/lrc'; 
import songList from '../components/songList'; 
 
function toTime(time){
	return parseInt(time.split(':')[0])*6000+parseInt(time.split(':')[1]*100);
}	

function toDou(num){
	return num<10?'0'+num:num;
}

Vue.filter('toShowTime',function(time){
	var min=parseInt(time/6000);
	var sen=parseInt((time%6000)/100);
	return toDou(min)+':'+toDou(sen);
})

export default {
	computed:{
		curSong(){
			return Store.state.curSong;
		},
		src(){
			if(Store.state.curSong.id){
				return "http://ws.stream.qqmusic.qq.com/"+Store.state.curSong.id+".m4a?fromtag=46";
			}else{
				return '';
			}
		},
		isLrc(){
			return Store.state.isLrc;
		},
		curTime(){
			return Store.state.curTime;
		},
		allTime(){
			return Store.state.allTime;
		},
		isStart(){
			return Store.state.isStart;
		},
		isList(){
			return Store.state.isList;
		},
		curVolume(){
			return Store.state.curVolume;
		},
		mode(){
			return Store.state.mode;
		}
	},
	methods:{
		toBack(){
			Router.go(-1);
		},
		ctrl(){
			Store.commit('ctrl');
		},
		songListShow(){
			Store.commit('songListShow','show');
		},
		tabSong(info){
			Store.commit('tabSong',info);
		},
		chooseMode(){
			Store.commit('chooseMode');
		}
	},
	components:{
		round,
		lrc,
		songList
	},
	mounted(){
		var audio=document.querySelector('#audio');
		var self=this;
		
//		歌曲播放时
		audio.addEventListener('timeupdate',function(){
			var time=parseInt(this.currentTime*100);
			var allTime=parseInt(this.duration*100);
			if(isNaN(allTime)){
				allTime=0;
			}
			Store.commit('updateTime',time);
			Store.commit('getAllTime',allTime);
			if(time == allTime && allTime !=0){
				Store.dispatch('chooseSong');
			}
		},false);		
		audio.volume=Store.state.curVolume;

//		歌曲进度控制	
		var w=parseInt($('.progress-main').css('width'));
		$('.progress-round')[0].addEventListener('touchstart',function(e){
			audio.pause();
			var disX=e.touches[0].pageX/w*100-(parseInt(self.curTime))/(parseInt(self.allTime))*100;
			function fnMove(e){
				var l=e.touches[0].pageX/w*100-disX;
				if(l>100){
					l=100;
				}else if(l<0){
					l=0;
				}
				Store.commit('changeProgress',l/100);
				Store.commit('songCtrl','stop');
			}
			function fnEnd(e){
				var l=e.changedTouches[0].pageX/w*100-disX;
				if(l>100){
					l=100;
				}else if(l<0){
					l=0;
				}
				Store.commit('changeProgress',l/100);
				Store.commit('songCtrl','start');
				audio.currentTime=l/10000*(self.allTime);
				audio.play();
				document.removeEventListener('touchmove',fnMove);
				document.removeEventListener('touchend',fnEnd);
			}
			document.addEventListener('touchmove',fnMove);
			document.addEventListener('touchend',fnEnd);
		});		
		
		
	},
	watch:{
		isStart(value){
			if(value){
				audio.play();
			}else{
				audio.pause();
			}
		},
		curVolume(value){
			audio.volume=value;
		},
		isList(value){
			var list=document.querySelector('.song-list');
			if(value){
				list.style.bottom=0;
			}else{
				list.style.bottom=-800/75+'rem';
			}
		}
	}
}
</script>

<style scoped lang="less">
	.main-play{
		position: relative;
		height: 100%;
	}
	.play{
		height: 100%;
		background: #46352f;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	header{
		display: flex;
		height: 108/75rem;
		position: relative;
	}
	footer{
		width:100%;
		height: 250/75rem;
	}
	.section{
		flex: 1;
		overflow: hidden;
	}
	.icon-back{
		width: 108/75rem;
		height: 108/75rem;
		background: url(../assets/img/icon/icon-back.png) no-repeat;
		background-size: contain;
	}
	.song-info{
		flex: 1;
		padding: 5/75rem 0;
	}
	.song-title{
		font-size: 32/75rem;
		line-height: 60/75rem;
		color: #fff;
	}
	.song-author{
		font-size: 26/75rem;
		line-height: 42/75rem;
		color: #867e7c;
	}
	.progress{
		display: flex;
		line-height: 82/75rem;
		height: 82/75rem;
		font-size: 16/75rem;
		>span{
			width: 90/75rem;
			color: #fff;
			padding-left: 10/75rem;
			box-sizing: border-box;
		}
		>span:first-child{
			text-align: right;
			padding-right: 10/75rem;
			padding-left:0;
			box-sizing: border-box;
			
		}
	}
	.progress-main{
		flex: 1;
	}
	.progress-box{
		width: 548/75rem;
		height: 4/75rem;
		border-radius: 2/75rem;
		background: #65635f;
		margin: 39/75rem auto 0;
		position: relative;
	}
	.progress-bar{
		display: block;
		position: absolute;
		height: 100%;
		border-radius: 2/75rem;
		background: #d83b32;
		top: 0;
		left: 0;
	}
	.progress-round{
		display: block;
		position: absolute;
		top: -13/75rem;
		width: 30/75rem;
		height: 30/75rem;
		background: #fff;
		margin-left: -15/75rem;
		border-radius: 50%;		
	}
	.footer-choose{
		display: flex;
		>i{
			display: block;
			width: 120/75rem;
			height: 132/75rem;
		}
		>span{
			display: block;
			width: 186/75rem;
			height: 132/75rem;
		}
	}
	.icon-mode-loop{
		background: url(../assets/img/icon/icon-mode-loop.png) no-repeat;
		background-size: contain;
	}
	.icon-mode-random{
		background: url(../assets/img/icon/icon-mode-random.png) no-repeat;
		background-size: contain;
	}
	.icon-song-list{
		background: url(../assets/img/icon/icon-song-list.png) no-repeat;
		background-size: contain;
	}
	.icon-ctrl-left{
		background: url(../assets/img/icon/icon-ctrl-left.png) no-repeat;
		background-size: contain;
	}
	.icon-ctrl-right{
		background: url(../assets/img/icon/icon-ctrl-right.png) no-repeat;
		background-size: contain;
	}
	.footer-ctrl{
		flex: 1;
	}
	.ctrl-wrap{
		display: block;
		width: 94/75rem;
		height: 94/75rem;
		border-radius: 50%;
		border: 2/75rem solid #9997a0;
		margin: 18/75rem auto 0;
	}
	.icon-ctrl-start{
		display: block;
		width: 46/75rem;
		height: 46/75rem;
		background: url(../assets/img/icon/icon-ctrl-start.png) no-repeat;
		background-size: contain;
		margin: 22/75rem auto 0;
	}
	.icon-ctrl-stop{
		background: url(../assets/img/icon/icon-ctrl-stop.png) no-repeat;
	}
	.song-list{
		position: absolute;
		bottom: -800/75rem;
		left: 0;
		width: 100%;
		height: 800/75rem;
		background: #fff;
		z-index: 1;
		transition: bottom 1s; 
	}
	
	
	
</style>