<template>
	<div class="share">
		<div class="share-main">
			<h2 class="share-title">分享:</h2>
			<div class="mip-share-container">
			    <mip-share></mip-share>
			</div>
		</div>
		<div class="share-close" v-show="isShare" @click="shareShow"></div>
	</div>
</template>

<script>
import Store from '../store'; 

export default {
	props:['isShare'],
	methods:{
		shareShow(){
			Store.commit('shareShow','hide');
		}
	}
}
</script>

<style scoped lang="less">
	.share{
		position: absolute;
		width: 100%;
		height: 500/75rem;
		bottom: -600/75rem;
		left: 0;
		transition: bottom 1s; 
		background: #f3f3f3;
		z-index: 1;
	}
	.share-close{
		position: absolute;
		left: 0;
		bottom: 500/75rem;
		width: 100%;
		height: 300%;
		background: rgba(0,0,0,0.5);
	}
	.share-title{
		text-indent: 60/75rem;
		font-size: 22/75rem;
		color: #8a8a8a;
		padding-top: 50/75rem;
	}
	
	
	
	
</style>