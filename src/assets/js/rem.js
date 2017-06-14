(function(win,doc){
	var scale=1/devicePixelRatio;
	
	document.querySelector('meta[name=viewport]').setAttribute('content','initial-scale='+scale+',minimum-scale='+scale+',maximum-scale='+scale+',user-scalable=no');
	
	function change(){
		var w=doc.documentElement.clientWidth;
		doc.documentElement.style.fontSize=w/10+'px';
	}
	change();
	win.addEventListener('resize',change,false);
})(window,document);


