<template>
	<div class="footer" @click="toPlay">
		<div class="footer-left">
			<img v-bind:src="src" class="footer-img"/>
			<div class="footer-info">
				<h3>{{curSong.title}}</h3>
				<p>{{curSong.author}}</p>
			</div>
		</div>
	</div>
</template>

<script>
import Store from '../store';
import Router from '../router';

import img from '../assets/img/default.jpg';

export default {
	methods:{
		toPlay(){
			Router.push('/play');
		}
	},
	computed:{
		curSong(){
			return Store.state.curSong;
		},
		src(){
			if(Store.state.curSong.imgId ){
				return "http://imgcache.qq.com/music/photo/album_500/"+(Store.state.curSong.imgId%100)+"/500_albumpic_"+Store.state.curSong.imgId+"_0.jpg";
			}else{
				return img;
			}
		}
	}
}
</script>

<style scoped lang="less">
	.footer{
		width: 100%;
		display: flex;
		height: 102/75rem;
		background: #ffffff;	
	}
	.footer-left{
		padding-top: 13/75rem;
		padding-left: 12/75rem;
		display: flex;
	}
	.footer-img{
		width: 1rem;
		height: 1rem;
		margin-right: 19/75rem;
	}
	.footer-info{
		flex: 1;
		>h3{
			font-size: 26/75rem;
			font-weight: normal;
			line-height: 38/75rem;
			color: #1f1f1f;
		}
		>P{
			font-size: 22/75rem;
			line-height: 38/75rem;
			color: #888888;
		}		
	}
</style>