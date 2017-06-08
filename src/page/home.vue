<template>
	<div class="home">
		<div class="main">
			<header>
				<i class="icon icon-nav">导航</i>
				<nav>
					
				</nav>
				<i class="icon icon-search" @click="toSearch">搜索</i>
			</header>
			<section class="middle">
			
			</section>
			<footer>
			</footer>
		</div>	
	</div>
</template>

<script>
import Store from '../store';
import Router from '../router';

export default {
	name: 'hello',
	data() {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	},
	methods:{
		toSearch(){
			Router.push('/search');
		}
	}
}
</script>

<style scoped lang="less">
	.home{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.main{
		height: 100%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	header{
		width: 100%;
		height: 108/75rem;
		background: #d33a31;	
		display: flex;
	}
	footer{
		width: 100%;
		height: 102/75rem;
		background: #d33a31;	
	}
	.middle{
		flex: 1;
	}
	.icon-nav{
		width: 1rem;
		height: 100%;
		background: yellow;
	}
	.icon-search{
		width: 1rem;
		height: 100%;
		background: yellow;
	}
	nav{
		flex: 1;
	}
</style>