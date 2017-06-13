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
	}
}
</script>

<style>

</style>
