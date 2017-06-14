<template>
	<transition name="fade">
		<div class="home">
			<div class="main">
				<header>
					<i class="icon icon-back" @click="back"></i>
					<div class="search-wrap">
						<input type="text" placeholder="搜索音乐、歌手、歌词、用户" class="search-inp" v-model="txt" @focus="whenFocus" />
						<i class="icon icon-cancel" v-show="txt" @click="clearTxt"></i>
						<div class="search-sub" v-show="isFocus && txt" @click="search">
							搜索“{{txt}}”
						</div>
					</div>
				</header>
				<section class="middle">
					<div class="find-nothing" v-if="isSearch && (aSong.length==0)">未找到与"{{nTxt}}"相关的内容</div>
					<ul v-else-if="aSong.length!=0" class="song-wrap">
						<li class="song-lists" v-for="(item,index) in aSong">
							<div @click="toPlay(item)">
								<h3 class="song-list-title">{{item.title}}</h3>
								<div class="song-list-bottom">
									<span class="song-list-sq">SQ</span>
									<p class="song-list-author">{{item.author}}
										<span class="song-list-album" v-html="'- '+item.album"></span>
									</p>
									
								</div>
							</div>
						</li>
					</ul>
					
				</section>
				<foot></foot>
			</div>	
			<song-list class="song-list" v-bind:isList="isList"></song-list>
		</div>
	</transition>
</template>

<script>
import Axios from 'axios';
import Store from '../store';
import Router from '../router';

import foot from '../components/foot';
import songList from '../components/songList';

export default {
	name: 'search',
	data() {
		return {
			txt: '',
			isSearch:false,
			isFocus:false,
			aSong:[],
			nTxt:''
		}
	},
	computed:{
		isList(){
			return Store.state.isList;
		}
	},
	components:{
		foot,
		songList
	},
	methods:{
		back (){
			Router.go(-1);
		},
		clearTxt(){
			this.txt='';
		},
		whenFocus(){
			this.isFocus=true;
		},
		search(){
			var self=this;
			Axios({
				url:'http://www.xinghaiyang.com/music/php/search.php',
				params:{
					name:self.txt
				}
			}).then(function(res){
				var aSong=res.data.data.song.list;
				if(aSong.length != 0){
					var newSong=[];
					for(var i=0;i<aSong.length;i++){
						var song={};
						song.title=aSong[i].fsong;
						song.author=aSong[i].fsinger;
						song.album=aSong[i].albumName_hilight;
						song.id=aSong[i].f.split('|')[0];
						song.imgId=aSong[i].f.split('|')[4];
						newSong.push(song);
					}
					self.aSong=newSong;
					self.isFocus=false;
				}else{
					self.isSearch=true;
					self.nTxt=self.txt;
				}
			}).catch(function(err){
				alert(err);
			})
		},
		toPlay(item){
			Store.dispatch('addSearchSong',item);
		}
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
		background: #d33a31;	
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
	.icon-cancel{
		width: 86/75rem;
		height: 72/75rem;
		background: url(../assets/img/icon/icon-cancel.png) no-repeat;
		background-size: contain;
	}
	.middle{
		flex: 1;
		overflow-y: auto;
	}
	.search-wrap{
		flex: 1;
		margin-right: 17/75rem;
		height: 72/75rem;
		padding-top: 17/75rem;
		display: flex;
		border-bottom: 1px solid #fff;
	}
	.search-inp{
		display: block;
		flex: 1;
		height: 72/75rem;
		line-height: 72/75rem;
		font-size: 0.5rem;	
		color: #fff;	
	}
	.search-inp::-webkit-input-placeholder{
	    color: #e0756e;
	}
	.search-sub{
		position: absolute;
		top: 114/75rem;
		right: 17/75rem;
		width: 700/75rem;
		background: #fff;
		line-height: 100/75rem;
		height: 100/75rem;
		font-size: 30/75rem;
		padding: 0 30/75rem;
		color: #4f7cae;
		box-sizing: border-box;
		box-shadow: 0 0.1rem 0.1rem #ccc;
	}
	.middle{
		background: #f2f4f5;
	}
	.find-nothing{
		font-size: 26/75rem;
		line-height: 1.5;
		padding-top: 146/75rem;
		text-align: center;
		color: #9c9c9c;
	}
	.song-lists{
		border-bottom: 1px solid #e2e4e5;
		padding: 15/75rem 0;
	}
	.song-list-title{
		font-size: 30/75rem;
		color: #383939;
		line-height: 50/75rem;
	}
	.song-list-author{
		display: inline-block;
		font-size: 30/75rem;
		color: #383939;
		line-height: 50/75rem;
		font-size: 22/75rem;
		line-height: 38/75rem;
		color: #628bb7;
		vertical-align: middle;
	}
	.song-wrap{
		padding: 0 12/75rem;
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
	.song-list-album{
		color: #6e6e6f;
	}
</style>