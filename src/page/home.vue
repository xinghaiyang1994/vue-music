<template>
	<div class="body">
		<div class="home">
			<div class="main">
				<header>
					<i class="icon icon-nav" @click="sideShow"></i>
					<nav>
						<router-link to="/music" class="icon-nav-cm icon-nav-music"></router-link>
						<router-link to="/song" class="icon-nav-cm icon-nav-song"></router-link>
						<router-link to="/group" class="icon-nav-cm icon-nav-group"></router-link>
					</nav>
					<i class="icon icon-search" @click="toSearch"></i>
				</header>
				<section class="middle">
					<router-view></router-view>
				</section>
				<foot></foot>
			</div>	
		</div>
		<side class="side" id="side" v-bind:isSide="isSide"></side>	
	</div>
</template>

<script>
import Store from '../store';
import Router from '../router';

import side from '../components/side';
import foot from '../components/foot';

export default {
	name: 'home',
	computed:{
		curSong(){
			return Store.state.curSong;
		},
		isSide(){
			return Store.state.isSide;
		}
	},
	components:{
		side,
		foot
	},
	methods:{
		toSearch(){
			Router.push('/search');
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
	nav{
		flex: 1;
		text-align: center;
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
	
	.side{
		position: absolute;
		top: 0;
		left: -617/75rem;
		transition: left 1s;
	}
	.icon-nav-cm{
		display: inline-block;
		width: 108/75rem;
		height: 108/75rem;
	}
	.icon-nav-music{
		background: url(../assets/img/icon/icon-nav-music.png) no-repeat;
		background-size: contain;
	}
	.icon-nav-song{
		background: url(../assets/img/icon/icon-nav-song.png) no-repeat;
		background-size: contain;
	}
	.icon-nav-group{
		background: url(../assets/img/icon/icon-nav-group.png) no-repeat;
		background-size: contain;
	}
	.icon-nav-music.router-link-active{
		background-image: url(../assets/img/icon/icon-nav-music-cur.png);
	}
	.icon-nav-song.router-link-active{
		background-image: url(../assets/img/icon/icon-nav-song-cur.png);
	}
	.icon-nav-group.router-link-active{
		background-image: url(../assets/img/icon/icon-nav-group-cur.png);
	}
	
</style>