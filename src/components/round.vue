<template>
	<div class="round" @click="lrcTab">
		<em class="round-top" v-bind:class="rTop" v-bind:style="'transform:rotate(-'+curDeg+'deg);'"></em>
		<div class="round-main" v-bind:class="isStart?'':'round-stop'" >
			<div class="round-cell">
				<img v-bind:src="src" class="round-img"/>
			</div>
		</div>
	</div>
</template>

<script>
import Store from '../store'; 
	
import img from '../assets/img/default.jpg';
	
export default {
	data(){
		return {
			rTop:{
				'round-top-start':true,
				'round-top-stop':false
			}
		}
	},
	props:[
		'isStart'
	],
	computed:{
		src(){
			if(Store.state.curSong.imgId ){
				return "http://imgcache.qq.com/music/photo/album_500/"+(Store.state.curSong.imgId%100)+"/500_albumpic_"+Store.state.curSong.imgId+"_0.jpg";
			}else{
				return img;
			}
		},
		curDeg(){
			if(this.isStart){
				return 0;
			}else{
				return 45;
			}
		}
	},
	methods:{
		lrcTab(){
			Store.commit('lrcTab');
		}
	},
	watch:{
		isStart(value){
			if(value){
				this.curDeg=0;
			}else{
				this.curDeg=45;
			}
		}
	}
}
</script>

<style scoped lang="less">
	@keyframes round{
		from{
			transform: rotateZ(0);
		}
		to{
			transform: rotateZ(360deg);
		}
	}
	.round{
		position:relative; 
		&:before{
			content: '';
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 1px;
			background: linear-gradient(90deg,transparent 0,#fff 50%,transparent 100%);
		}
	}
	.round-top{
		display: block;
		position: absolute;
		z-index: 1;
		top: 1px;
		left: 346/75rem;
		width: 185/75rem;
		height: 264/75rem;
		background: url(/static/img/round-top.png) no-repeat center;
		transform-origin:30/75rem top;
		transform: rotateZ(-45deg);
		transition: all 0.5s;
		background-size: contain;
		&:before{
			content: '';
			display: block;
			position: absolute;
			top: -20/75rem;
			left: 8/75rem;
			width: 40/75rem;
			height: 40/75rem;
			border-radius: 50%;
			background: #f7f7f8;
		}
		&:after{
			content: '';
			display: block;
			position: absolute;
			top: -8/75rem;
			left: 20/75rem;
			width: 16/75rem;
			height: 16/75rem;
			border-radius: 50%;
			background: #dededf;
		}
	}
	.round-main{
		width: 546/75rem;
		height: 546/75rem;
		background: linear-gradient(0deg,#111113 30%,#2a2a2c 50%,#111113 70%);
		border-radius: 50%;
		overflow: hidden;
		margin: 130/75rem auto 0;
		border: 10/75rem solid #4f4039;
		animation: round 10s linear infinite;
	}
	.round-cell{
		width: 546/75rem;
		height: 546/75rem;
		display: table-cell;
		vertical-align: middle;
		text-align: center;
	}
	.round-img{
		width: 368/75rem;
		height: 368/75rem;
		border-radius: 50%;
		border: 8/75rem solid #000;
	}
	.round-stop{
		animation-play-state:paused;
	}
	
	
</style>