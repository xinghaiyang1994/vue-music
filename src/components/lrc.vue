<template>
	<div class="lrc">
		<ul class="lrc-main">
			<li v-for="(item,index) in curLrc">{{item.txt}}</li>
		</ul>
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
			lrc:[]
		}
	},
	props:['curTime'],
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
						alert('没有歌词')
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
		}
	}
}
	
</script>

<style scoped lang="less">
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