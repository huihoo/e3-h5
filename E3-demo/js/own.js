

(function(own){
	
	//当页面hide的时候将其中的页面close掉
	own.closeChildWebviewOfhide = function(currentWebview,closedWebviewId){
		currentWebview.addEventListener('hide',function(){
			
			var closeWeb = plus.webview.getWebviewById(closedWebviewId);
			
			if (!currentWebview.getURL() ||!closeWeb ) {
				return;
			}
			closeWeb.close();
			closeWeb = null;
		},false);
	}
	//当页面close的时候将其中的页面close掉
	own.closeChildWebviewOfclose = function(currentWebview,closedWebviewId){
		currentWebview.addEventListener('close',function(){
			var closeWeb = plus.webview.getWebviewById(closedWebviewId);
			if (!currentWebview.getURL() ||!closeWeb ) {
				return;
			}
			closeWeb.close();
			closeWeb = null;
		},false);
	}
	
	//一般情况下设置anishow
	own.getaniShow = function(){
		var aniShow = 'pop-in';
		if (mui.os.android) {
			var androidlist = document.querySelectorAll('ios-only');
			if (androidlist) {
				mui.each(androidlist,function(num,obj){
					obj.style.display = 'none';
				});
			}
			
			if (parseFloat(mui.os.version) < 4.4) {
				aniShow = 'slide-in-right';
			}
		}
		
		return aniShow;
	}
})(window);
