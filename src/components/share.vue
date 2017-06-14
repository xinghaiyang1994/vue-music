<template>
	<div class="share">
		<div class="share-main">
			<h2 class="share-title">分享:</h2>
			<div class="share-wrap">
			   <i class="icon icon-share-qzone" data-share="qzone"></i>
			   <i class="icon icon-share-wb" data-share="weibo"></i>
			</div>
		</div>
		<div class="share-close" v-show="isShare" @click="shareShow"></div>
	</div>
</template>

<script>
import Store from '../store'; 

import $ from '../assets/js/jquery.js';
import Share from '../assets/js/share.js';

export default {
	props:['isShare'],
	methods:{
		shareShow(){
			Store.commit('shareShow','hide');
		}
	},
	mounted(){
		new Share({  
		    dom:['.icon-share-qzone','.icon-share-wb'],         
		    contentDom:'http://www.music.xinghaiyang.com',  
		    title:'Vue移动版网易云音乐'        
		});
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
		transition: all 1s; 
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
	.share-wrap{
		padding: 1rem;
	}
	.icon-share-qzone{
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background: url(../assets/img/icon/icon-share-qzone.png) no-repeat #fff;
		background-size: contain;
		margin-right: 0.5rem;
	}
	.icon-share-wb{
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background: url(../assets/img/icon/icon-share-wb.png) no-repeat #fff;
		background-size: contain;
	}
	
	
	
</style>