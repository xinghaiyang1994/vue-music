<template>
	<div class="play">
		<audio v-bind:src="src" autoplay id="audio"></audio>
		<header>
			<i class="icon icon-back" @click="toBack">back</i>
			<div class="song-info">
				<h2 class="song-title">{{curSong.title}}</h2>
				<p class="song-author">{{curSong.author}}</p>
			</div>
			<i class="icon">share</i>
		</header>
		<round class="section" v-show="!isLrc"></round>
		<lrc class="section" v-show="isLrc" v-bind:curTime="curTime"></lrc>
		<footer>
			<i class="icon" @click="lrcTab">点击</i>
		</footer>
	</div>
</template>

<script>
import Store from '../store'; 
import Router from '../router'; 

import round from '../components/round'; 
import lrc from '../components/lrc'; 
 
function toTime(time){
	return parseInt(time.split(':')[0])*6000+parseInt(time.split(':')[1]*100);
}	
 
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
		}
	},
	methods:{
		toBack(){
			Router.go(-1);
		},
		lrcTab(){
			Store.commit('lrcTab');
		}
	},
	components:{
		round,
		lrc
	},
	mounted(){
		var audio=document.querySelector('#audio');
		audio.addEventListener('timeupdate',function(){
			var time=parseInt(this.currentTime*100);
			Store.commit('updateTime',time);
		},false)		
	}
}
</script>

<style scoped lang="less">
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
		background: red;
	}
	.section{
		flex: 1;
		overflow: hidden;
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
	
	
	
</style>