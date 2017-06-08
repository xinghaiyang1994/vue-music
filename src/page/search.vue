<template>
	<transition name="fade">
		<div class="home">
			<div class="main">
				<header>
					<i class="icon icon-back" @click="back">返回</i>
					<div class="search-wrap">
						<input type="text" class="search-inp" />
						<i class="icon icon-cancel" >取消</i>
					</div>
				</header>
				<section class="middle">
				
				</section>
			</div>	
		</div>
	</transition>
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
		back (){
			Router.go(-1);
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
	.icon-back{
		width: 1rem;
		height: 100%;
		background: yellow;
	}
	.icon-cancel{
		width: 1rem;
		height: 100%;
		background: yellow;
	}
	.search-wrap{
		flex: 1;
		display: flex;
	}
	.search-inp{
		display: block;
		flex: 1;
		height: 108/75rem;
		font-size: 0.5rem;		
	}
</style>