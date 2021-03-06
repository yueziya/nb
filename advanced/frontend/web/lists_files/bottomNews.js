var BottomNews=function (){
}
BottomNews.prototype={
	//添加事件执行方法
	attachEvent : function(o,e,f){
		if(o.addEventListener){
			return o.addEventListener(e,f,false)
			}
		if(o.attachEvent){
			return o.attachEvent("on"+e,f)
			}
		return o["on"+e]=f
		},
	//访问接口方法
	getScript : function(src, callback) {
			var head = document.getElementsByTagName("head")[0];
			var js = document.createElement("script");
			js.setAttribute("src", src);
			js.onload = js.onreadystatechange = function () {
				if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
					head.removeChild(js);
					if (callback)
						callback();
				}
			}
			head.appendChild(js);
		},
	//检查数据是否正确
	checkData : function(data) {
		if(data != null && data != "" && undefined != typeof(data)){
			return true;
		}else{
			return false;
		}
	},
	isNullEmpty : function(obj){
		for (var name in obj)
		{
			return true;
		}
		return false;
	},
	compareDate : function(sTime,eTime){
		var sFlag;
		var eFlag;
		//开始时间
		var sDate = new Date(sTime.split('-')[0].split('/')[0],parseInt(sTime.split('-')[0].split('/')[1] - 1),sTime.split('-')[0].split('/')[2],sTime.split('-')[1].split(':')[0],sTime.split('-')[1].split(':')[1]);
		var nDate = new Date();
		if(sDate.getTime() < nDate.getTime()){
			sFlag = true;
		}else{
			sFlag = false;
		}
		//过期时间
		var eDate = new Date(eTime.split('-')[0].split('/')[0],parseInt(eTime.split('-')[0].split('/')[1] - 1),eTime.split('-')[0].split('/')[2],eTime.split('-')[1].split(':')[0],eTime.split('-')[1].split(':')[1]);
		if(eDate.getTime() > nDate.getTime()){
			eFlag = true;
		}else{
			eFlag = false;
		}
		
		if(sFlag && eFlag){
			return true;
		}else{
			return  false;
		}
	},
	//种一个cookie
	setcookie : function(name, value, time) {
		var date = new Date();
		var expiresTime = new Date(date.getTime() + time * 3600000 * 24 );
		var domain = '.ifeng.com';
		document.cookie = name + "=" + escape(value) + ";path=/;expires=" + expiresTime.toGMTString() + ";"+"domain="+ domain +";";
	},
	getCookie : function(N) {
		var c=document.cookie.split("; ");for(var i=0;i<c.length;i++){var d=c[i].split("=");if(d[0]==N){return unescape(d[1]);}}return "";
	},
	init:function (){
		var _ = this;
		//先获取script中接口数据，然后调用run();
		try{
			//if(_.getCookie('bottomNewsClose') != 'on'){
				_.getScript('http://news.ifeng.com/cmpp_17001/chip/s_global_detail_adBottom_js4ad2.html',function(){
					var arr = eval("("+bottomNewsData+")");
					if(_.checkData(bottomNewsData) && _.isNullEmpty(arr)){
						if(_.checkData(arr[0]["title"])){
							//判断是否在开始终止时间内
							if(_.compareDate(arr[0]["startDate"],arr[0]["expDate"])){
								//判断cookie此条新闻是否显示过
								if(arr[0]["title"] != _.getCookie('bottomNews')){
								    _.run();
								}
							}
						}
					}
				});
			//}
		}catch(e){};
    },
	run:function (){
		var _ = this;
		 var arr = eval("("+bottomNewsData+")");
		 //对跳转链接进行赋值
		 document.getElementById("hotnewsurl").href = arr[0]["link"];
		 //对显示文字内容进行赋值
		 document.getElementById("hotnewsurl").innerHTML = arr[0]["title"];
		 document.getElementById("hotnews").style.display="block";
		 //_.setcookie("bottomNewsClose", "on", arr[0]["expDate"]);
		 _.setcookie("bottomNews", arr[0]["title"], 30);
		 var fun=function(){
				if(document.body.clientWidth <1000){
					 //可见区域小于1000时对定位进行处理;
					 document.getElementById("hotnews").style.left="0px";
					 document.getElementById("hotnews").style.margin="0 0 0 0";
				}else{
					 document.getElementById("hotnews").style.left="50%";
					 document.getElementById("hotnews").style.margin="0 0 0 -500px";
				}
		 };
		 this.attachEvent(window,"resize",fun);
		 document.getElementById("s_btn_close").onclick=function(){
			 document.getElementById("hotnews").style.display="none";
		};
    }
}
//屏蔽移动端
if(("undefined" != typeof INice) && !INice.getBrowser().IPAD){
	var bnews=new BottomNews();
	//对cookie进行判断
	
	bnews.init();
}