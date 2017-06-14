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
				<li></li>
			</ul>
		</div>
	</div>
</template>

<script>
import Store from '../store';

export default{
	computed:{
		isHomeList(){
			return Store.state.isHomeList;
		}
	},
	methods:{
		changeHomeList(){
			Store.commit('changeHomeList');
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
</style>