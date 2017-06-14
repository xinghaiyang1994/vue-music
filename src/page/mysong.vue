<template>
	<transition name="fade">
		<div class="home">
			<div class="home">
				<div class="main">
					<header>
						<i class="icon icon-back" @click="back"></i>
						<h2 class="title">我喜欢的音乐</h2>
						<i class="icon icon-search" @click="toSearch"></i>
					</header>
					<section>
						<div class="mysong-top">
							<div class="mysong-top-left">
								<img src="../assets/img/default.jpg"/>
								<span class="music-list-left-bg"></span>
								<em class="music-list-heart"></em>
							</div>
							<div class="mysong-top-right">
								<h3>我喜欢的音乐</h3>
								<div class="mysong-top-user">
									<img src="../assets/img/default.jpg"/>
									<h3>海风闲闲的</h3>
								</div>
							</div>
						</div>
						<div class="mysong-main">
							<div class="main-header" @click="tabOne">
								<i class="icon icon-mysong-start"></i>
								<h3>播放全部<span>(共{{songList.length}}首)</span></h3>
							</div>
							<ul class="mysong-alls">
								<li class="mysong-list" v-for="(item,index) in songList" @click="tabSong(index)">
									<i class="icon icon-mysong-cur" v-show="item.id == curSong.id"></i>
									<span class="mysong-list-num" v-show="item.id != curSong.id">{{index+1}}</span>
									<div class="mysong-list-right">
										<h3 class="song-list-title">{{item.title}}</h3>
										<div class="song-list-bottom">
											<span class="song-list-sq">SQ</span>
											<p class="song-list-author" v-html="item.author+' - '+item.album">
											</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</section>
					<foot></foot>
				</div>
				<song-list class="song-list" v-bind:isList="isList"></song-list>
			</div>
		</div>
	</transition>
</template>

<script>
import Store from '../store';
import Router from '../router';

import foot from '../components/foot';
import songList from '../components/songList';

export default {
	computed:{
		isList(){
			return Store.state.isList;
		},
		songList(){
			return Store.state.songList;
		},
		curSong(){
			return Store.state.curSong;
		}
	},
	methods:{
		back (){
			Router.go(-1);
		},
		toSearch(){
			Router.push('/search');
		},
		tabSong(index){
			Store.commit('tabSong',index);
		},
		tabOne(){
			Store.commit('tabSong',0);
			Router.push('/play');
		}
	},
	components:{
		foot,
		songList
	},
	watch:{
		isList(value){
			var list=document.querySelector('.song-list');
			if(value){
				list.style.transform='translateY(-'+(800/75)+'rem)';
			}else{
				list.style.transform='translateY(0)';
			}
		}
	}
}
</script>

<style scoped lang="less">
	.body{
		width: 100%;
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
		background: #181c1f;	
		display: flex;
		position: relative;
	}
	footer{
		width: 100%;
		height: 102/75rem;
		background: #d33a31;	
	}
	.icon-back{
		width: 108/75rem;
		height: 108/75rem;
		background: url(../assets/img/icon/icon-back.png) no-repeat;
		background-size: contain;
	}
	.icon-search{
		width: 108/75rem;
		height: 108/75rem;
		background: url(../assets/img/icon/icon-search.png) no-repeat;
		background-size: contain;
	}
	.title{
		flex: 1;
		line-height: 108/75rem;
		font-size: 36/75rem;
		color: #fff;
	}
	section{
		flex: 1;
		overflow-y: auto;
	}
	.mysong-top{
		padding: 20/75rem 48/75rem;
		background: #15191d;
		display: flex;
	}
	.mysong-top-left{
		width: 250/75rem;
		height: 250/75rem;
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
		margin-left: -59/75rem;
		margin-top: -59/75rem;
		width: 90/75rem;
		height: 90/75rem;
		border: 14/75rem solid transparent;
		transform: rotateZ(45deg);
		border-bottom-color: #fff; 
		border-right-color: #fff; 
		&:before{
			content: '';
			display: block;
			position: absolute;
			left: -14/75rem;
			top: -60/75rem;
			border-radius: 50%;
			width: 100%;
			height: 100%;
			border: 14/75rem solid transparent;
			transform: rotateZ(45deg);
			border-left-color: #fff;
			border-top-color: #fff;
		}
		&:after{
			content: '';
			display: block;
			position: absolute;
			top: -14/75rem;
			left: -60/75rem;
			border-radius: 50%;
			width: 100%;
			height: 100%;
			border: 14/75rem solid transparent;
			transform: rotateZ(45deg);
			border-left-color: #fff;
			border-bottom-color: #fff;
		}
	}
	.mysong-top-right{
		flex: 1;
		margin-left: 26/75rem;
		color: #fff;
		>h3{
			font-size: 34/75rem;
			line-height: 78/75rem;
		}
	}
	.mysong-top-user{
		display: flex;
		padding-bottom: 30/75rem;
		>img{
			width: 56/75rem;
			height: 56/75rem;
			border-radius: 50%;
			margin-right: 13/75rem;
		}
		>h3{
			font-size: 26/75rem;
			line-height: 56/75rem;
		}
	}
	.main-header{
		height: 102/75rem;
		line-height: 102/75rem;
		display: flex;
		border-bottom: 2/75rem solid #e7e9ea;
		>h3{
			font-size: 34/75rem;
			color: #121313;
			>span{
				color: #939495;
			}
		}
	}
	.icon-mysong-start{
		width: 104/75rem;
		height: 102/75rem;
		background: url(../assets/img/icon/icon-mysong-start.png) no-repeat;
		background-size: contain;
	}
	.mysong-alls{
		padding: 0 12/75rem;
	}
	.mysong-list{
		display: flex;
		height: 113/75rem;
	}
	.mysong-list-num{
		width: 80/75rem;
		line-height: 113/75rem;
		font-size: 30/75rem;
		text-align: center;
		color: #7e7f80;
	}
	.icon-mysong-cur{
		width: 80/75rem;
		height: 113/75rem;
		background: url(../assets/img/icon/icon-mysong-cur.png) no-repeat;
		background-size: contain;
	}
	.mysong-list-right{
		flex: 1;
		border-bottom: 2/75rem solid #e2e4e5;
	}
	.song-list-title{
		padding-top: 12/75rem;
		font-size: 30/75rem;
		color: #383939;
		line-height: 40/75rem;
	}
	.song-list-author{
		display: inline-block;
		font-size: 30/75rem;
		color: #383939;
		font-size: 22/75rem;
		line-height: 30/75rem;
		vertical-align: middle;
		color: #6e6e6f;
	}
	.song-list-sq{
		display: inline-block;
		font-size: 10/75rem;
		border: 2/75rem solid #fe662d;
		border-radius: 4/75rem;
		padding:0 2/75rem 2/75rem;
		color: #fe662d;
		vertical-align: middle;
	}
	.song-list-bottom{
	}
</style>