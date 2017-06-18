<template>
	<div class="lrc">
		<div class="lrc-volume">
			<i class="icon icon-volume"></i>
			<div class="volume-wrap">
				<span class="volume-bar" v-bind:style="'width:'+(curVolume*100)+'%'"></span>
				<em class="volume-round" v-bind:style="'left:'+(curVolume*100)+'%'"></em>
			</div>
		</div>
		<div class="lrc-wrap" @click="lrcTab">
			<ul class="lrc-main" v-if="curLrc.length">
				<li v-for="(item,index) in curLrc">{{item.txt}}</li>
			</ul>
			<div class="lrc-main" v-else>
				暂无歌词
			</div>
		</div>
	</div>
</template>

<script>
import Axios from 'axios';

import $ from '../assets/js/jquery.js';

import Store from '../store'; 

function toTime(time){
	return parseInt(time.split(':')[0])*6000+parseInt(time.split(':')[1]*100);
}	

export default {
	data(){
		return {
			lrc:[],
			l:Store.state.curVolume*100
		}
	},
	props:['curTime','allTime'],
	computed:{
		curSong(){
			return Store.state.curSong;
		},
		curLrc(){
			var self=this;
			var curLrc=[];
			$.ajax({
				type:"get",
				url:"http://www.xinghaiyang.com/music/php/getSongTxt.php",
				data:{
					id:Store.state.curSong.id
				},
				async:false,
				success:function(res){
					if(res != null){
						var str=$.trim(res.getElementsByTagName('lyric')[0].innerHTML);
						str=str.replace("<![CDATA[","")
						.replace("]]>","");
						str=str.slice(str.indexOf('[offset:0]')+10);
						
						var arr=str.split("[").slice(1);
					
						for(var i=0;i<arr.length;i++){
							var lrc={};
							lrc.time=toTime(arr[i].split("]")[0]);
							lrc.txt=arr[i].split("]")[1];
							curLrc.push(lrc);
						}
						
					}else{
						return false;
					}
				},
				error:function(err){
					alert(err);
				}
				
			});
			return curLrc;
		},
		curClass(index,curTime){
			if(curTime > this.curLrc.time){
				return 1;
			}else{
				return '';
			}
		},
		curVolume(){
			return Store.state.curVolume;
		}
	},
	methods:{
		lrcTab(){
			Store.commit('lrcTab');
		}
	},
	watch:{
		curTime(value){
			var iNow=-1;
			var l=this.curLrc.length;
			for(var i=0;i<l;i++){
				if(value >= this.curLrc[i].time){
					iNow=i;
				}else{
					break;
				}
			}
			if(iNow != -1){
				$('body .lrc-main').css({
					transform:'translateY(-'+(iNow*60/75)+'rem)'
				});
				$('.lrc-main li').eq(iNow).addClass('lrc-cur').siblings().removeClass('lrc-cur');
			}
			if(value == this.allTime){
				$('.lrc-main li').removeClass('lrc-cur');
				$('body .lrc-main').css({
					transform:'translateY(0)'
				});
			}
		}
	},
	mounted(){
		var self=this;
		
//		音量控制
		var w=parseInt($('.volume-wrap').css('width'));
		$('.volume-round')[0].addEventListener('touchstart',function(e){
			var disX=e.touches[0].pageX/w*100-self.l;
			function fnMove(e){
				self.l=e.touches[0].pageX/w*100-disX;
				if(self.l>100){
					self.l=100;
				}else if(self.l<0){
					self.l=0;
				}
				$('.volume-round').css({
					left:self.l+'%'
				});
				Store.commit('changeVolume',self.l/100);
			}
			function fnEnd(e){
				self.l=e.changedTouches[0].pageX/w*100-disX;
				if(self.l>100){
					self.l=100;
				}else if(self.l<0){
					self.l=0;
				}
				$('.volume-round').css({
					left:self.l+'%'
				});
				document.removeEventListener('touchmove',fnMove);
				document.removeEventListener('touchend',fnEnd);
			}
			document.addEventListener('touchmove',fnMove);
			document.addEventListener('touchend',fnEnd);
		});
		
	}
}
	
</script>

<style scoped lang="less">
	.lrc{
		position: relative;
	}
	.lrc-volume{
		position: absolute;
		top: 0;
		height: 38/75rem;
		width: 100%;
		display: flex;
	}
	.icon-volume{
		display: block;
		width: 38/75rem;
		height: 38/75rem;
		background: url(/static/img/icon/icon-volume.png) no-repeat;
		background-size: contain;
		margin: 0 32/75rem 0 42/75rem;
	}
	.volume-wrap{
		width: 568/75rem;
		position: relative;
		margin-top: 17/75rem;
		margin-right: 70/75rem;
		height: 4/75rem;
		border-radius: 2/75rem;
		background: #4b4540;
		
	}
	.volume-bar{
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background: #fff;
	}
	.volume-round{
		position: absolute;
		display: block;
		width: 26/75rem;
		height: 26/75rem;
		top: -11/75rem;
		margin-left: -13/75rem;
		border-radius: 50%;
		background: #fff;
		
	}
	.lrc-wrap{
		position: absolute;
		top: 38/75rem;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.lrc-main{
		text-align: center;
		font-size: 32/75rem;
		padding-top: 50%;
		color: #8d8a88;
		line-height: 45/75rem;
		transition: all 0.5s;
		>li{
			height: 40/75rem;
			padding-bottom: 20/75rem;
		}
		.lrc-cur{
			color: #fff;
		}
	}

</style>