<template>
	<div class="home">
		<div class="main">
			<header>
				<i class="icon icon-nav"></i>
				<nav>
					
				</nav>
				<i class="icon icon-search" @click="toSearch"></i>
			</header>
			<section class="middle">
				<router-view></router-view>
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
		width: 108/75rem;
		height: 108/75rem;
		background: url(../assets/img/icon/icon-nav.png) no-repeat;
		background-size: contain;
	}
	.icon-search{
		width: 108/75rem;
		height: 108/75rem;
		background: url(../assets/img/icon/icon-search.png) no-repeat;
		background-size: contain;
	}
	nav{
		flex: 1;
	}
</style>