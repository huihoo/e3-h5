

var new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","../js/ajax.js");// 在这里引入了a.js
document.body.appendChild(new_element);

(function(w){
	
	//获取购物车信息
	w.ajax_get_cart = function(options) {
		startLoad();
		var data = getdata(options,'com.huihoo.shopping.get_cart_items');
		mui.ajax(httpUrl,{
			
			data:data,
			dataType:'json',
			type:'get',
			timeout:1000,
			success:function(data) {
				logData();
				setTimeout(function(){
					endLoad();
					getCartItem(data);
				});
			},
			error:function(xhr,type,errorThrown) {
				
			}
		});
	}
})(window);
