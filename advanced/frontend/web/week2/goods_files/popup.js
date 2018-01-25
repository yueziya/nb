/**
@describe 弹窗
@create By Damon.Dwq
@contact qq361904805	
**/
/*
	===使用API===
	//debugger;
    	myPopup({
			"elem": "传入的html的id",
			"popHtml" : "html 字符串拼接",
			"confirm":"确认按钮",
			"close": "class 关闭弹窗的按钮",
			"callback":function(e){}，
			"noMask":“参数”；默认带灰色遮罩，传入true为屏蔽遮罩层
		});
	myPopup
	mask：默认不填
*/
(function(){

	myPopup = function(opts) {
		if (!(this instanceof myPopup)) {
			return new myPopup(opts);
		}
		
		if(opts.popHtml){
			this.popHtml=$(opts.popHtml);// +++++
			$('body').find("."+this.popHtml.attr("class")).remove();
			$('body').append(this.popHtml);
			this.elem = this.popHtml;
		} else {
			this.elem=$(opts.elem);
		}

        if(opts.position){
            this.position = opts.position;
        }
		
		this.mask=$("<div id='mask'></div>");
		this.confirm=$(opts.confirm);
		this.argMask=opts.noMask;
		this.close=$(opts.close);
		this.srollFn=function(){};
		this.callback=opts.callback;

		
		var _this=this;
		$(window).resize(function () {
			_this.maskFn(_this.argMask);
			_this.setPos();
		});
		
		
		this.iframe=$("<iframe id='iframe'></iframe>");
		
		this.pup();
	}
	myPopup.prototype.pup= function() {
		var _this=this;
		_this.maskFn(_this.argMask);
		_this.setPos();
		_this.close.bind("click.pup",function(){
			_this.closeFn();
			$(this).unbind("click.pup");
		});

		_this.confirm.bind("click.confirm",function(e){
			if(_this.callback && !_this.callback.call(_this.elem[0],e)){
				return false;
			}
			_this.confirmFn(e);
			$(this).unbind("click.confirm");
		});

		

	}
	myPopup.prototype.setPos=function(){
		var _this=this;
		var _width=_this.elem.width(), //获取弹出框宽度
				_height=_this.elem.height();

		//不传参
		if(!_this.position){
			_this.position = {};
			
			
			//垂直居中
			_this.position.x=(($(window).width())-_width)/2;
            _this.position.y=(($(window).height())-_height)*382/1000;
            _this.elem.css('position',(_this.position.fixed ? "absolute" : "fixed") );
			
		}

		posForCenter();
		//center
		function posForCenter(){
			if ('undefined' == typeof(document.body.style.maxHeight)) {//jq高版本写法
				var _srcoll_top=$(window).scrollTop();
				$(window).bind("scroll", function() {
					_this.srollFn()
				});
				_this.srollFn=function(){
					_this.position.y=$(window).scrollTop()+($(window).height()-_height)/2;
					_this.elem.css("top",_this.position.y);
				}
				_this.elem.css("position","absolute");
				_this.position.y=_srcoll_top+($(window).height()-_height)/2;

			} else {
					_this.elem.css("position","fixed");
			}
		}

			
			if(_this.position.fixed===false){

				_this.elem.css('position',"absolute");

			}else{
				_this.elem.css('position',"fixed");
				
				_this.position.y=($(window).height()-_height)*382/1000;				
				_this.position.x=(($(window).width())-_width)/2;
			}
		

		

		// _this.elem.css('position':(_this.position.fixed ? "fixed" : "absolute") );
		//设置水平
		_this.elem.css({
			"top":  _this.position.y,
			"left": _this.position.x,
			"margin":0,
			"z-index":10001
		}).fadeIn(200);
	}
	myPopup.prototype.closeFn= function() {
		var _this=this
		_this.elem.fadeOut(0);

		_this.mask && _this.mask.css("display","none");
		_this.mask && _this.mask.remove();
		_this.popHtml && _this.popHtml.remove();//+++++++

		_this.iframe.css("display","none");
		$(window).unbind("scroll",_this.srollFn);
		$(window).unbind("resize");
		
	}
	myPopup.prototype.confirmFn= function(e) {
		var _this=this
		_this.elem.fadeOut(0);
		_this.mask.css("display","none");
		_this.mask.remove();
		_this.popHtml.remove();//+++++++
		_this.iframe.css("display","none");
		$(window).unbind("scroll",_this.srollFn);
		$(window).unbind("resize");
		
		
		
	}
	myPopup.prototype.maskFn= function(a) {
		if(arguments[0]){
			return false;
		}
		var _this=this;
		var mask_height=Math.max($("body").height(),$(window).height());
		var mask_width=$("body").width();
		if ('undefined' == typeof(document.body.style.maxHeight)) {//jq高版本写法
			if(!$("#iframe")[0]){
				$("body").append(_this.iframe);
			}else{
				//alert(1)
				_this.iframe=$("#iframe");
			}
			_this.iframe.css({
				"width":  mask_width,
				"height": mask_height,
				"margin":0,
				"z-index":98,
				"opacity":0,
				"position": "absolute",
				"left": 0,
				"top":0,
				"display":"block"
			})
		}
		if(!$("#mask")[0]){
			$("body").append(_this.mask);
		}else{
			_this.mask=$("#mask");
		}
		_this.mask.css({
			"height":mask_height,
			"width":mask_width,
			"display":"block",
			"backgroundColor": "#000000",
			"opacity":0.7,
			"position":"absolute",
			"left":0,
			"top":0,
			"z-index":10000
		})
	}
	myPopup.prototype.srcoll= function(_srcoll_top) {
		var _this=this
		var srcoll_top=$(window).scrollTop();
		if($.browser.msie && $.browser.version<7) {
			_this.elem.css("top",srcoll_top+_top-_srcoll_top);
		} else {
			_this.elem.css("top",_top)
		}
	}

	
})();