<template>
	<div class="side">
		<div class="main">
			<div class="header">
				<img src="../assets/img/default.jpg" class="photo"/>
				<h2 class="name">海风闲闲的</h2>
			</div>
		</div>
		<div class="side-close" @click="sideShow" v-show="isSide"></div>
	</div>
</template>

<script>
import Store from '../store';
	
export default {
	methods:{
		sideShow(){
			Store.commit('side','hide');
		}
	},
	props:['isSide']
}
</script>

<style scoped lang="less">
	.side{
		width: 617/75rem;
		height: 100%;
	}
	.main{
		width: 100%;
		height: 100%;
		background: #ffffff;
	}
	.header{
		width: 100%;
		height: 328/75rem;
		background: url(../assets/img/side-bg.jpg) no-repeat;
		background-size: cover;
	}
	.side-close{
		position: absolute;
		width: 133/75rem;
		left: 617/75rem;
		top: 0;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	.photo{
		width: 134/75rem;
		height: 134/75rem;
		border-radius: 50%;
		margin-top: 85/75rem;
		margin-left: 20/75rem;
	}
	.name{
		padding-left: 20/75rem;
		color: #fff;
		font-size: 32/75rem;
		line-height: 64/75rem;
	}
</style>