<template>
	<div class="footer">
		<div class="footer-left" @click="toPlay">
			<img v-bind:src="src" class="footer-img"/>
			<div class="footer-info">
				<h3>{{curSong.title}}</h3>
				<p>{{curSong.author}}</p>
			</div>
		</div>
		<div class="canvas-wrap">
			<canvas id="canvas" width="400" height="400"></canvas>
			<i class="icon-foot-ctrl" v-bind:class="isStart?'icon-foot-start':'icon-foot-stop'" @click="ctrl"></i>
		</div>
		<i class="icon icon-foot-nav"  @click="songListShow"></i>
	</div>
</template> 

<script>
import Store from '../store';
import Router from '../router';


import img from '../assets/img/default.jpg';

function d2a(num){
	return num/180*Math.PI;
}
function draw(curTime,allTime,color){
	//底部控制暂停播放进度按钮
	var oC=document.querySelector('#canvas');
	var w=oC.width;
	var h=oC.height;
	var p=oC.getContext('2d');
	
	p.save();
	p.rotate(d2a(20));
	p.restore();
	p.lineWidth=26;
	var curDeg=curTime/allTime*360;
	p.clearRect(0,0,w,h);
	p.beginPath();
	p.arc(w/2,w/2,187,0,d2a(360),true);
	p.strokeStyle='#c7c7c7';
	p.stroke();
	p.closePath();
	
	p.beginPath();
	p.save();
	p.translate(w/2,w/2);
	p.rotate(d2a(-90));
	p.arc(0,0,187,0,d2a(curDeg),false);
	p.strokeStyle='#d33a31';
	p.stroke();
	p.closePath();
	p.restore();		

}

export default {
	computed:{
		curSong(){
			return Store.state.curSong;
		},
		curTime(){
			return Store.state.curTime;
		},
		allTime(){
			return Store.state.allTime;
		},
		src(){
			if(Store.state.curSong.imgId ){
				return "http://imgcache.qq.com/music/photo/album_500/"+(Store.state.curSong.imgId%100)+"/500_albumpic_"+Store.state.curSong.imgId+"_0.jpg";
			}else{
				return img;
			}
		},
		isStart(){
			return Store.state.isStart;
		}
	},
	methods:{
		toPlay(){
			Router.push('/play');
		},
		songListShow(){
			Store.commit('songListShow','show');
		},
		ctrl(){
			Store.commit('ctrl');
		}
	},
	watch:{
		curTime(value){
			var color;
			if(this.isStart){
				color='#c7c7c7';
			}else{
				color='#393939';
			}
			draw(value,this.allTime,color)
		},
		isStart(value){
			if(value){
				audio.play();
			}else{
				audio.pause();
			}
		}
	},
	mounted(){
		var color;
		if(this.isStart){
			color='#c7c7c7';
		}else{
			color='#393939';
		}
		draw(this.curTime,this.allTime,color)
	}
	
}
</script>

<style scoped lang="less">
	.footer{
		width: 100%;
		display: flex;
		height: 102/75rem;
		background: #ffffff;	
	}
	.footer-left{
		padding-top: 13/75rem;
		padding-left: 12/75rem;
		display: flex;
		flex: 1;
	}
	.footer-img{
		width: 1rem;
		height: 1rem;
		margin-right: 19/75rem;
	}
	.canvas-wrap{
		width: 56/75rem;
		height: 56/75rem;
		margin: 23/75rem 20/75rem 0;
		position: relative;
	}
	#canvas{
		width: 56/75rem;
		height: 56/75rem;
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
	.icon-foot-nav{
		width: 91/75rem;
		height: 102/75rem;
		background: url(../assets/img/icon/icon-foot-nav.png) no-repeat;
		background-size: contain;
	}
	.icon-foot-ctrl{
		width: 30/75rem;
		height: 30/75rem;
		position: absolute;
		top: 13/75rem;
		left: 13/75rem;
	}
	.icon-foot-start{
		background: url(../assets/img/icon/icon-foot-start.png) no-repeat;
		background-size: contain;
	}
	.icon-foot-stop{
		background: url(../assets/img/icon/icon-foot-stop.png) no-repeat;
		background-size: contain;
	}
</style>