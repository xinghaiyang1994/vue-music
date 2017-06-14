<template>
	<div class="music">
		<div class="music-main">
			<div class="music-header" @click="changeHomeList">
				<div class="header-left">
					<em class="arrow" v-bind:class="isHomeList?'':'arrow-close'"></em>
				</div>
				<h2>创建的歌单</h2>
			</div>
			<ul v-show="isHomeList" class="music-alls">
				<li class="music-list" @click="toMySong">
					<div class="music-list-left">
						<img src="../assets/img/default.jpg"/>
						<span class="music-list-left-bg"></span>
						<em class="music-list-heart"></em>
					</div>
					<div class="music-list-middle">
						<div class="music-list-info">
							<h3>我喜欢的音乐</h3>
							<p>{{songList.length}}首</p>
						</div>
						<i class="icon icon-home-volume"></i>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Store from '../store';
import Router from '../router';

export default{
	computed:{
		isHomeList(){
			return Store.state.isHomeList;
		},
		songList(){
			return Store.state.songList;
		}
	},
	methods:{
		changeHomeList(){
			Store.commit('changeHomeList');
		},
		toMySong(){
			Router.push('/mysong');
		}
	}
}
</script>

<style scoped lang="less">
	.music-header{
		background: #e7e9e9;
		height: 62/75rem;
		display: flex;
		>h2{
			font-size: 24/75rem;
			line-height: 62/75rem;
		}
	}
	.header-left{
		margin: 0 10/75rem 0 12/75rem;
		width: 48/75rem;
		height: 100%;
		position: relative;
	}
	.arrow{
		position: absolute;
		top: 37/75rem;
		left: 24/75rem;
		display: block;
		width: 16/75rem;
		height: 16/75rem;
		border: 2/75rem solid transparent;
		border-top-color: #3c3d3d;
		border-left-color: #3c3d3d;
		transform-origin: left top;
		transform: rotateZ(225deg); 
		transition: all .5s; 
	}
	.arrow-close{
		top: 30/75rem;
		left: 30/75rem;
		transform: rotateZ(135deg); 
	}
	.music-alls{
		padding: 0 12/75rem;
	}
	.music-list{
		display: flex;
	}
	.music-list-left{
		margin-top: 6/75rem;
		width: 113/75rem;
		height: 113/75rem;
		margin-right: 22/75rem;
		position: relative;
		>img{
			width: 100%;
		}
	}
	.music-list-left-bg{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.5);
	}
	.music-list-heart{
		position: absolute;
		display: block;
		top: 50%;
		left: 50%;
		margin-left: -25/75rem;
		margin-top: -25/75rem;
		width: 34/75rem;
		height: 34/75rem;
		border: 8/75rem solid transparent;
		transform: rotateZ(45deg);
		border-bottom-color: #fff; 
		border-right-color: #fff; 
		&:before{
			content: '';
			display: block;
			position: absolute;
			left: -8/75rem;
			top: -26/75rem;
			border-radius: 50%;
			width: 100%;
			height: 100%;
			border: 8/75rem solid transparent;
			transform: rotateZ(45deg);
			border-left-color: #fff;
			border-top-color: #fff;
		}
		&:after{
			content: '';
			display: block;
			position: absolute;
			top: -8/75rem;
			left: -26/75rem;
			border-radius: 50%;
			width: 100%;
			height: 100%;
			border: 8/75rem solid transparent;
			transform: rotateZ(45deg);
			border-left-color: #fff;
			border-bottom-color: #fff;
		}
	}
	.music-list-middle{
		flex: 1;
		display: flex;
		padding: 6/75rem 0;
		height: 113/75rem;
		border-bottom: 1px solid #e3e5e6;
	}
	.music-list-info{
		flex: 1;
		>h3{
			font-size: 32/75rem;
			color: #1e1f1f;
			line-height: 64/75rem;
		}
		>P{
			color: #5f6061;
			font-size: 22/75rem;
			line-height: 32/75rem;
		}
	}
	.icon-home-volume{
		margin-top: 11/75rem;
		display: block;
		width: 47/75rem;
		height: 90/75rem;
		background: url(../assets/img/icon/icon-voice-cur.png) no-repeat;
		background-size: contain;
	}
	
	
</style>