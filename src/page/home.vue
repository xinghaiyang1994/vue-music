<template>
	<div class="body">
		<div class="home">
			<div class="main">
				<header>
					<i class="icon icon-nav" @click="sideShow"></i>
					<nav>
					</nav>
					<i class="icon icon-search" @click="toSearch"></i>
				</header>
				<section class="middle">
					<router-view></router-view>
				</section>
				<footer @click="toPlay">
					<div class="footer-left">
						<img src="../assets/img/default.jpg" class="footer-img"/>
						<div class="footer-info">
							<h3>{{curSong.title}}</h3>
							<p>{{curSong.author}}</p>
						</div>
					</div>
				</footer>
			</div>	
		</div>
		<side class="side" id="side" v-bind:isSide="isSide"></side>	
	</div>
</template>

<script>
import Store from '../store';
import Router from '../router';

import side from '../components/side';

export default {
	name: 'hello',
	data() {
		return {
		}
	},
	computed:{
		curSong(){
			return Store.state.curSong;
		},
		isSide(){
			return Store.state.isSide;
		}
	},
	components:{side},
	methods:{
		toSearch(){
			Router.push('/search');
		},
		toPlay(){
			Router.push('/play');
		},
		sideShow(){
			Store.commit('side','show');
		}
	},
	watch:{
		isSide(value){
			var side=document.querySelector('#side');
			if(value){
				side.style.left=0;
			}else{
				side.style.left=-(617/75)+'rem';
			}
		}
	}
}
</script>

<style scoped lang="less">
	.body{
		height: 100%;
		position: relative;
	}
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
		display: flex;
		height: 102/75rem;
		background: #ffffff;	
	}
	.middle{
		flex: 1;
		background: #f2f4f5;
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
	.side{
		position: absolute;
		top: 0;
		left: -617/75rem;
		transition: left 1s;
	}
	
</style>