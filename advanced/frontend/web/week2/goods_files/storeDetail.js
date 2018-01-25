/**
 * 装修模块相关的js。
 */
$(function () {	
	
	/**
	 * 优惠券模块渲染
	 */
	function renderCouponJs () {
		var couponidArray = $("input[id^='coupon_']");
		var ids = new Array();
		if (couponidArray.length > 0) {
			couponidArray.each(function(i, dom) {
				var id = $(dom).val();
				if (id != null && id != "") {
					ids[i] = id;
				}
			});
		}
		if (ids.length > 0) {
			var url = $("#storeFrontHost").val() + "/coupon/getCouponInfo";
			$.ajax({
				type : "POST",
				url : url,
				data : {
					"ids" : ids.join(","),
					"merchantId": $('#merchantId').val()
				},
				dataType : "jsonp",
				jsonpCallback : 'jsonpCallbackCouponInfo',
				success : function(data) {
					$(data.datas).each(function(i, obj) {
						var couponId = obj.couponId// 活动编号
						var title = obj.title// 活动名称
						var description = obj.description // 活动描述
						var alreadyGetTotalCount = obj.alreadyGetTotalCount // 已经领取数量
						var dkjMan = obj.dkjMan// 抵扣满条件
						var dkjJian = obj.dkjJian// 抵扣减条件
						var activityStatus = obj.activityStatus;// 活动状态 已开始 =
																// 2;已停领 = 3;已注销
																// = 4;
						var receiveEndTime = obj.receiveEndTime; 
						var receiveEndTimestamp = Date.parse(new Date(receiveEndTime))/ 1000;
						var nowTimestamp = Date.parse(new Date())/1000;
						
						var merchantId = $('#merchantId').val() || "";
						var url = $("#merchantCouponHost").val() + "/PrintCookie.jsp?couponId=" + couponId + "&merchantId=" + merchantId;
						if($('.itemlist div[data-id=' + obj.id + ']').length > 0){
							if (nowTimestamp > receiveEndTimestamp || activityStatus == 4 || activityStatus == 3) {
								$('.itemlist div[data-id=' + obj.id + '] .btn a').css("background","#999"); 
								$('.itemlist div[data-id=' + obj.id + '] .btn a').removeClass("post");
							}
							$('.itemlist div[data-id=' + obj.id + '] .inline-box .num').html(dkjJian);
							$('.itemlist div[data-id=' + obj.id + '] .inline-box .ell').find("p").first().html("满"+dkjMan+"元使用");
							$('.itemlist div[data-id=' + obj.id + '] .post').unbind('click').bind('click', function() {
								window.open(url);
							});
						}else{
							if (activityStatus == 4) {
								$('.itemlist dl[data-id=' + obj.id + ']').closest('.item').removeClass().addClass("item expire");
							}
							$('.itemlist dl[data-id=' + obj.id + '] a.line').text(description);
							$('.itemlist dl[data-id=' + obj.id + '] .info .ell').html(title);
							$('.itemlist dl[data-id=' + obj.id + '] .post').unbind('click').bind('click', function() {
								window.open(url);
							});
						}

					});
				},error : function(e){
					console.info(e);
				}
			});
		}
	}
	
	
	 //当前JSURL
	 function getdoJsUrl(){
	 	var js=document.scripts;
		var jsPath;
		for(var i=js.length;i>0;i--){
			 if(js[i-1].src.indexOf("storeDetail.js")>-1){
			   jsPath=js[i-1].src.substring(0,js[i-1].src.lastIndexOf("/")+1);
			 }
		}
		return jsPath;
	 }
	
	/**
	 * 为装修的UI添加必要的事件。
	 */
	function addEventForDecorateHtml(){
		 
		/*** 搜索关键字	 */
		 $('.fstore-sysdetail-search-inshop').off('click', '.search-btn').on('click','.search-btn',function() {
			var ul = $(this).closest('ul');
			var key = $(ul).find('li').eq(0).find('.keyword-input').val();
			var lowPrice = "";
			var highPrice = "";
			var inputObj = $(ul).find('li').eq(1).find('input');
			if(inputObj != null && inputObj.length > 0){
				lowPrice = $(ul).find('li').eq(1).find('input').eq(0).val();
				highPrice = $(ul).find('li').eq(1).find('input').eq(1).val();
				var pattern = /^(|0|[1-9]\d*)$/;
				if (!lowPrice.match(pattern)) {
					alert("请输入大于0的整数");
					return;
				}
				if (!highPrice.match(pattern)) {
					alert("请输入大于0的整数");
					return;
				}
				if(parseInt(lowPrice,10) > parseInt(highPrice,10)){
					alert("请输入正确的价格区间");
					return;
				}
			}
			var frontUrl = $("#storeFrontHost").val(),merchantId = $('#merchantId').val();
			var url =frontUrl + "/s-"+merchantId+".html?1=1";
			if(key != null){
				url = url +"&keywords="+key;
			}
			if(lowPrice != null){
				url = url +"&minPrice="+lowPrice;
			}
			if(highPrice != null){
				url = url +"&maxPrice="+highPrice;
			}
			url = encodeURI(url);
			url = encodeURI(url);
			var merchantId = $('#merchantId').val()||"";
			var categoryId = $('#categoryId').val()||"";
			var sortType = $('#sortType').val()||"";
			var pageSize = $('#pageSize').val()||"48";
			var u = $("#storeFrontHost").val()+"/s-"+merchantId+".html?pageSize="+pageSize+"&keywords="+key
			 +"&minPrice="+lowPrice +"&maxPrice="+highPrice +"&sortType="+sortType+"&pageIndex= "+1+"&merchantId=" + merchantId + "&categoryId=" + categoryId;
			u = encodeURI(u);
			window.location.href= u;
		});
		 
		/*** 直接点击关键字	 */
		 $('.fstore-sysdetail-search-inshop').off('click', '.search-keyword-btn').on('click','.search-keyword-btn',function() {
			 var merchantId = $('#merchantId').val()||"";
			 var u = $("#storeFrontHost").val()+"/s-"+merchantId+".html?keywords="+$(this).text();
			 u = encodeURI(u);
			 window.location.href= u;
		 });
		 
	    /*** 分类	 */
		 $('.fstore-sysdetail-category-tree .cates-tree .node-hd i').off('click').on('click',function() {
				var p = $(this).parent('div').parent('div');
				if($(p).hasClass('node-expand')){
					$(p).removeClass('node-expand');
				}else{
					$(p).addClass('node-expand');
				}
			});
		 
		renderCouponJs(); //领券的js
		var temp  = getdoJsUrl();
		 $.getScript(temp+'detail.min.js',function(){  });//轮播js
		initDecorateEvent();//初始化收藏店铺模块的事件 -
		priceInit();
	}
	
	

	
	
	/**
	 * 展示装修数据。
	 */
//	exports.showDecorateHtml  = function(){
	var showDecorateHtml  = function(){
		var merchantId = Config.merchantId;
		var goodsId = $("#goodsId").val();
		$.get(Config.itemOneselfHost+'/merchantStore/getMerchantStoreDetailHtml/'+merchantId,{secondCategorySeq :secondCategorySeq,goodsId:goodsId},function(result){
			if(result!=null && result.datas!=null){
				var data = result.datas;
				
				var leftHtml = data.left;
				var rightTopHtml = data.rightTop;
				var rightBottomHtml = data.rightBottom;
				
				$('#leftHtml').replaceWith(leftHtml);
				$('#rightTopHtml').replaceWith(rightTopHtml);
				$('#rightBottomHtml').replaceWith(rightBottomHtml);
				
				addEventForDecorateHtml();
				
				showLazyLoadImg("module");
			}
		});
	};
	/**
	 * 初始展示装修数据。
	 */
	showDecorateHtml();
	
/************************************ 店铺收藏部分  *********************************
 from favorite.js
************************************************************************************/
	
	/*** 初始化收藏店铺模块的事件。	 */
	var initDecorateEvent = function(){
		$('.fn-store .fstore-sysdetail-favorite-store #favoriteStore').off('click').on('click', function(){
			var merchantId = $('#merchantId').val();
			var noCache = new Date();
			$.getJSON(Config.loginCheckinUrl+"?callback=?", function(res) { 
						writelog(res);
						if( res.code == "200"){
									rs =  res.data;
									//$.getJSON(Config.addFavoriteUrl+"?favorite_seq="+merchantId+"&nocach="+noCache.getTime()+"&type=2&seq_kind=0&callback=?", function(data) { 
									$.post(Config.itemOneselfHost+"/favorite/favoriteStore/"+rs.MEM_GUID+"/"+merchantId,	function(rsdata) { 
											writelog(data);
											$('#favoriteProductDialogTitle').html("收藏店铺");
											showFavoriteDialog("favoriteProductDialog", data, 2, function(){
												if(data.code == 1){
													data.msg = "成功加入收藏夹！";
												}else if(data.code=="10005"){
													data.msg = "店铺已收藏！";
												}
											});
							    	});
						}else{
							fnDialog({ });
						}
			});
		});
	};
	
	
	
/************************************ 价格替换部分  *********************************
 from price.js
************************************************************************************/
	
//	 exports.init = function($target) {
	var priceInit = function($target) {
		 var $target =  $target || $(document);
		 var fnSkuArray = scan($target);
		 search(fnSkuArray,$target);
	 }
	 
	 function scan($target){
		 var fnSkuArray = [];
		 var fnSkuFinSkuArray = [];
		 var fnSkuOriSkuArray = [];
		 $target.find('.fn_sku_fin_price').each(function(index,domEle){
			 fnSkuFinSkuArray.push($(domEle).attr('fn_sku_id'));
		 });
		 $target.find('.fn_sku_ori_price').each(function(index,domEle){
			 fnSkuOriSkuArray.push($(domEle).attr('fn_sku_id'));
		 });
		 fnSkuArray.push(fnSkuFinSkuArray);
		 fnSkuArray.push(fnSkuOriSkuArray);
		 return fnSkuArray;
	 }
	 
	 function search(fnSkuArray,$target){
		 try{
			 var url = $("#storeFrontHost").val()  + "/priceSearch/getPrice";
			 $.ajax({
		        type: "GET",
		        url: url,
				data: {
					"params" : "{\"skuIds\":\"" + fnSkuArray + "\"}"
				},
				dataType : "jsonp",
				jsonpCallback : 'jsonpCallbackPrice',
	            success: function(data){
	            	replace(data,$target);
	            }
		    }); 
		}catch(e){
		}
	 }
	 
	 function replace(json,$target){
		 /*var json = [{"merchantId":"10048","skuId":"254763","skuPrice":"11.01","price":"11.01","skuQty":"1111","goodsMprice":"11.00"},{"merchantId":"10048","skuId":"254765","skuPrice":"1.02","price":"1.02","skuQty":"123","goodsMprice":"11.00"},{"merchantId":"10048","skuId":"254766","skuPrice":"12.03","price":"12.03","skuQty":"1231","goodsMprice":"123.00"},{"merchantId":"10048","skuId":"254768","skuPrice":"123.04","price":"123.04","skuQty":"123","goodsMprice":"321.00"},{"merchantId":"10048","skuId":"254769","skuPrice":"123.05","price":"123.05","skuQty":"123","goodsMprice":"321.00"},{"merchantId":"10048","skuId":"254770","skuPrice":"123.06","price":"123.06","skuQty":"123","goodsMprice":"321.00"},{"merchantId":"10048","skuId":"254771","skuPrice":"123.07","price":"123.07","skuQty":"231","goodsMprice":"321.00"},{"merchantId":"10048","skuId":"254772","skuPrice":"31.08","price":"31.08","skuQty":"321","goodsMprice":"123.00"}];*/
		 var map = new Object();
		 for(var i in json){
			 map[json[i].skuId] = json[i];
		 }
		 var skuId = '';
		 //替换为最终价
		 $target.find('.fn_sku_fin_price').each(function(index,domEle){
			 skuId = $(domEle).attr('fn_sku_id');
			 if(null != skuId && skuId != '' && map[skuId] != null && map[skuId].skuPrice != null){
				 var prices = map[skuId].skuPrice.split(".");
				 var intPrice = prices[0];
				 var decimalPrice = "00";
				 if(prices.length>1){
					 decimalPrice = prices[1];
				 }
				 $(domEle).html(intPrice+".<em>"+decimalPrice+"</em>");
			 }else if(null != skuId && skuId != '' && map[skuId] != null && map[skuId].skuPrice == null){
			 	if($(domEle) !=null){
					$(domEle).each(function(i,dom){
						if($(dom).prev() !=null && $(dom).prev().hasClass("symbol")){//aa
							$(dom).prev().remove();
						}
						if($(dom).parent() != null && $(dom).parent().text().indexOf("¥") != -1){//ab
							$(dom).parent().html('<em class="num">已售完</em>');
						}
					})
				}
			 	$(domEle).html('<em class="num">已售完</em>');
			 }
		 });
		 //替换为原价
		 $target.find('.fn_sku_ori_price').each(function(index,domEle){
			 skuId = $(domEle).attr('fn_sku_id');
			 if(null != skuId && skuId != '' && map[skuId] != null && map[skuId].goodsMprice != null){
				 $(domEle).text(map[skuId].goodsMprice);
			 }
		 });
	 }
	
});



/************************************ 详情页面左侧分类收缩  *********************************
 from basic.js
************************************************************************************/	 
	
$(function () {
	$(".dp-middleContentLeft").on('click','.pro-classContent .a-title i',function(){
		$(this).closest('li').toggleClass('open')
	})
});