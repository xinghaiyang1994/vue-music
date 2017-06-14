//需要引入jQuery
//分享的节点需要设置data-share属性
//data-share属性值:
//	qzone			QQ空间
//	weibo 			微博
//	tweibo 			腾讯微博
//	douban          豆瓣
//	people          人人网

//new Share({
//	dom:[],				//数组，必填，存放触发事件的节点
//	contentDom:''		//分享的内容节点
//	title:''				//分享的标题
//})



(function(window,document,$){
	
		function Share(obj){
			if(!obj.dom)return;
			this.dom=obj.dom
			this.obj=obj||{};
			
			//分享信息
			this.info={
				url:this.obj.url || window.location.href,
				title:this.obj.title || document.title,
				content:$(this.obj.contentDom).text() 
			};

			
			//窗口信息
			this.width=630;
			this.height=580;
			this.top=(window.screen.availHeight - 30 - this.height) / 2;
			this.left=(window.screen.availWidth - 10 - this.width) / 2;
			
			
			
			this.shareUrl={
				qzone:'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+this.info.url+'&title='+this.info.title+'&summary='+this.info.content,
				weibo:'http://service.weibo.com/share/share.php?url='+this.info.url+'&title='+this.info.title+'&searchPic=false',
				tweibo:'http://share.v.t.qq.com/index.php?c=share&a=index&url='+this.info.url+'&title='+this.info.title+'&appkey=801cf76d3cfc44ada52ec13114e84a96',
				douban:'https://www.douban.com/share/service?href='+this.info.url+'&name='+this.info.title+'&text='+this.info.content,
				people:'http://widget.renren.com/dialog/share?resourceUrl='+this.info.url+'&srcUrl='+this.info.url+'&title='+this.info.title+'&description='+this.info.content
			}

			this.init();
		
		}
		
		Share.prototype.init=function(){
			var self=this;
			for(var i=0;i<this.dom.length;i++){
				$(this.dom[i]).on('click',function(e){
					var type=$(this).data('share');
					self.openUrl(type);
					e.preventDefault();
				})
			}
			
		};
		
		Share.prototype.openUrl=function(type){
			window.open(this.shareUrl[type], "", "height=" + this.height + ", width=" + this.width + ", top=" + this.top + ", left=" + this.left + "" + ",toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
		};
		
		window.Share=Share;
		
})(window,document,jQuery);

export default Share;
