
var new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","../js/md5.js");// 在这里引入了a.js
document.body.appendChild(new_element);

var load_element=document.createElement("script");
load_element.setAttribute("type","text/javascript");
load_element.setAttribute("src","../js/load.js");// 在这里引入了a.js
document.body.appendChild(load_element);


	var httpUrl = "http://182.140.244.73:91/gateway/router?";
	var app_key = "9e304d4e8df1b74cfa009913198428ab";
	var v = "v1.0";
	var sign_method = "md5";
	var signConstant = "4f4f8dd219bbdde0ae6bbe02be217c3a";
	session_key = localStorage.getItem('session_key');
	
	//获取当前时间戳
	function getTimestamp(){
		return (Date.parse(new Date())/1000).toString();
	}
	//获取sign签名 
	function getSign(keyOptions){
		var sign = signConstant;
		var isFirst = false;
		for (var  key in keyOptions) {
			if (!isFirst) {
				sign = sign +key+'='+keyOptions[key];
				isFirst = true;
			}else {
				sign = sign + '&';
				sign = sign +key+'='+ keyOptions[key];
			}
		}
		sign = sign + signConstant;
		return sign;
	}
	//获取发送数据的
	 function getdata(options,apiName){
		var timestamp = getTimestamp();
		var sign = hex_md5(getSign(options));
		var data = {
			app_key:app_key,
			method:apiName,
			timestamp:timestamp,
			v:'v1.0',
			sign_method:'md5',
			session_key:session_key,
			sign:sign,
		};
		
		for (var key in options) {
			data[key] = options[key];
		}
		return data;
	}
	 
	function logData(data){
		console.log(JSON.stringify(data));
	}
	 

(function(w){
	//获取sessionKey
	w.ajax_get_SessionKey = function(){
		mui.ajax('http://182.140.244.73:91/sessionkey',{
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				localStorage.setItem('session_key',data.session_key);
				//关闭启动页面
				closeStartScreent();
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	};
	
	//用户注册
	w.ajax_register = function(options){
		var data = getdata(options,'com.huihoo.user.register');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				registerSeccess(data);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	
	//用户登陆
	w.ajax_login = function(options){
		var data = getdata(options,'com.huihoo.user.login');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				data.account = options.user_name;
				loginSuccess(data);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	
	//修改密码
	w.ajax_change_pwd = function(options){
		var data = getdata(options,'com.huihoo.user.change_pwd');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				changePwdSuccess(data);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//退出登录
	w.ajax_logout = function(options){
		var data = getdata(options,'com.huihoo.user.loginout');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				logoutSuccess(data);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//获取分类第一级
	w.ajax_get_first_category = function(options) {
		startLoad();
		var data = getdata(options,'com.huihoo.category.first_category');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				
				logData(data);
				setTimeout(function(){
					endLoad();
					categoryStairSuccess(data);
				},500);
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//获取分类第二级
	w.ajax_get_sub_category = function(options){
		startLoad();
		var data = getdata(options,'com.huihoo.category.sub_category');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				setTimeout(function(){
					endLoad();
					categoryMoversSuccess(options.parent_category_id,data);
				},500);
				
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//获取分类产品
	w.ajax_get_product_list = function(options){
		startLoad();
		var data = getdata(options,'com.huihoo.product.product_list');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				setTimeout(function(){
					endLoad();
					productlistSuccess(data);
				},500);
				
				
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//查询用户喜欢的商品
	w.ajax_get_likelist = function(options){
		startLoad();
		var data = getdata(options,'com.huihoo.user.collect_list');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				setTimeout(function(){
					endLoad();
					likelistSuccess(data);
				},500);
				
				
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//删除喜欢的商品
	w.ajax_delete_likeItem = function(options){
		startLoad();
		var data = getdata(options,'com.huihoo.user.delete_collect');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				data.id = options.product_id;
				setTimeout(function(){
					endLoad();
					deleteItemSuccess(data);
				},500);
				
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
		
	}
	
	//商品详情
	w.ajax_get_product_detail = function(options){
		startLoad();
		var data = getdata(options,'com.huihoo.product.product_detail');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				logData(data);
				data.id = options.product_id;
				setTimeout(function(){
					endLoad();
					productDetailSuccess(data);
				},500);
				
				
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	//获取首页跑马灯
	w.ajax_get_Marquee = function(options){
		var data = getdata(options,'com.huihoo.content.paomadeng');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',
			type:'get',
			timeout:10000,
			success:function(data){
				logData(data);
				setTimeout(function(){
					endLoad();
					getMarqueeSuccess(data);
				},500);
				
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	//获取推荐商品
	w.ajax_get_Recommend = function(options){
		startLoad();
		var data = getdata(options,'com.huihoo.product.get_hot_products');
		mui.ajax(httpUrl,{
			data:data,
			dataType:'json',
			type:'get',
			timeout:10000,
			success:function(data){
				logData(data);
				setTimeout(function(){
					endLoad();
					getRecommendSuccess(data);
				},500);
				
				
			},
			error:function(xhr,type,errorThrown){
				
			}
		});
	}
	
	
})(window);
