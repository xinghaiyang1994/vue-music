<template>
	<div class="side">
		<div class="main">
			<div class="header">
				<img src="../assets/img/default.jpg" class="photo"/>
				<h2 class="name">海风闲闲的</h2>
			</div>
			<div class="main-qrcode">
				<h3>手机扫一扫体验</h3>
				<img src="" id="qrcode" />
			</div>
		</div>
		<div class="side-close" @click="sideShow" v-show="isSide"></div>
	</div>
</template>

<script>
import Store from '../store';

export default {
	methods:{
		sideShow(){
			Store.commit('side','hide');
		}
	},
	props:['isSide'],
	mounted(){
		var qrcode=document.querySelector('#qrcode');
		$.ajax({
			type:"get",
			url:"http://xinghaiyang.com/phpqrcode/index.php",
			data:{
				href:location.href
			},
			success:function(res){
				var src=res.match(/(?=")(.*)(?=")/)[0].replace('"','');
				qrcode.src='http://www.xinghaiyang.com/phpqrcode/'+src;
			}
		});
	}
}
</script>

<style scoped lang="less">
	.side{
		width: 617/75rem;
		height: 100%;
	}
	.main{
		width: 100%;
		height: 100%;
		background: #ffffff;
	}
	.header{
		width: 100%;
		height: 328/75rem;
		background: url(/static/img/side-bg.jpg) no-repeat;
		background-size: cover;
	}
	.side-close{
		position: absolute;
		width: 133/75rem;
		left: 617/75rem;
		top: 0;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	.photo{
		width: 134/75rem;
		height: 134/75rem;
		border-radius: 50%;
		margin-top: 85/75rem;
		margin-left: 20/75rem;
	}
	.name{
		padding-left: 20/75rem;
		color: #fff;
		font-size: 32/75rem;
		line-height: 64/75rem;
	}
	.main-qrcode{
		width: 6rem;
		margin: 1rem auto 0;
		>h3{
			text-align: center;
		}
		>img{
			width: 100%;
			height: 6rem;
		}
	}
</style>