<template>
  <div id="app">
  	<audio v-bind:src="src" autoplay id="audio"></audio>
    <router-view></router-view>
  </div>
</template>

<script>
import Store from './store'; 

export default {
	computed:{
		src(){
			if(Store.state.curSong.id){
				return "http://ws.stream.qqmusic.qq.com/"+Store.state.curSong.id+".m4a?fromtag=46";
			}else{
				return '';
			}
		}
	},
	mounted(){
		
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
		
	}
}
</script>

<style>

</style>
