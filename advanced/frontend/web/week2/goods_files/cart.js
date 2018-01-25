if (typeof(www_domain_sub) === "undefined") {
	myDomain = '.feiniu.com';
} else {
	myDomain = www_domain_sub;
}

var IS_LOAD_CART_VIEW = false;
var IS_LOAD_NEW_CART = false;
if (typeof(GLOBAL_LOAD_CART) != "undefined") {
	IS_LOAD_NEW_CART = true;
}
var DOMAIN_SHOP_NEW = '//buy' + myDomain + '/';
var MINICART_SEND_DATA = {
	cart_type: 0,
	is_simple: true,
	return_cart_data: true
};
if (IS_LOAD_NEW_CART) {
	MINICART_SEND_DATA = $.extend(MINICART_SEND_DATA, {
		version: 1
	});
}
var MINICART_CART_URL = 'http:' + DOMAIN_SHOP_NEW + 'cart/index';
var MINICART_DATA_INFO = {};
var MINICART_SCROLL_TOP = 0;
var MINICART_SCROLL_TOP_TYPE = 0;
var MINICART_LAST_CART_TOKEN;
var t;

var miniCart = {
	regular: {
		pint: /^[0-9]\d*$/,
		kznum: 9
	},
	init: function() {
		miniCart.bindEvents();
		miniCart.viewEvent.sdboxMiniCartRightHeight();
		miniCart.viewEvent.setNewScrollTop();
	},
	bindEvents: function() {
		if ($("#minicart .js_no_camp_list").find(".ul_activity").length > 0) {
			$("#minicart .js_no_camp_list").find(".ul_activity").next().css("border-top", "0 none");
		}

		//增加减少商品数量//选择商品数量改变//删除选择商品
		$(".minicartContent").delegate('.js_mini_num a', 'click', miniCart.EventList.addOrMinus);
		$(".minicartContent").delegate('.js_mini_num input', 'change', miniCart.EventList.changeCount);
		$(".minicartContent").delegate('.js_delete', 'click', miniCart.EventList.deletePro);
	},
	utils:{
		getCookie: function(name) {
			var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
				val = document.cookie.match(reg);
			return val ? (val[2] ? unescape(val[2]) : "") : null;
		}
	},
	EventList: {			
		getSpecialQty: function(cart_id) {
			if (MINICART_DATA_INFO[cart_id].kind == 8) {
				var cart_detail_parent_id = MINICART_DATA_INFO[cart_id].cart_detail_parent_id;
				return MINICART_DATA_INFO[cart_detail_parent_id].qty;
			} else {
				var returnQty = 0;
				$.each(MINICART_DATA_INFO, function(i, v) {
					if (v.cart_detail_parent_id == cart_id && v.kind == 8) {
						returnQty = v.qty;
					}
				});
				return returnQty;
			}
		},
		getSpecialCartId: function(cart_id) {
			if (MINICART_DATA_INFO[cart_id].kind == 8) {
				return MINICART_DATA_INFO[cart_id].cart_detail_parent_id;
			} else {
				return cart_id;
			}
		},
		//增加减少商品数量
		addOrMinus: function(e) {
			var $this = $(e.currentTarget),
				$ul = $this.parents(".js_cart_pro_list"),
				cart_id = $ul.attr('cart_id'),
				$input = $this.siblings("input"),
				$maxNum = parseInt($input.data("limit"));
			var value = parseInt($input.val()) + parseInt($this.attr("data-value"));
			var disable_reason = MINICART_DATA_INFO[cart_id].disable_reason || 0;
			var is_prize = MINICART_DATA_INFO[cart_id].is_prize || 0;
			var kind = MINICART_DATA_INFO[cart_id].kind || 0;
			if (disable_reason > 0 || is_prize == 1 || kind == 15) {
				return false;
			}
			if (value < 1) {
				$input.val(1);
				return false;
			}
			if (value > $maxNum) {
				$input.val($maxNum);
				return false;
			}
			miniCart.EventList.updNumUi($input, $ul, value, $maxNum, 300, e);
		}
		//选择商品数量改变
		,
		changeCount: function(e) {
			var $this = $(this),
				$ul = $this.parents(".js_cart_pro_list"),
				cart_id = $ul.attr('cart_id'),
				_s = $this.val(), //当前数量
				$maxNum = parseInt($this.data("limit"));
			var disable_reason = MINICART_DATA_INFO[cart_id].disable_reason || 0;
			var is_prize = MINICART_DATA_INFO[cart_id].is_prize || 0;
			var kind = MINICART_DATA_INFO[cart_id].kind || 1;
			if (disable_reason > 0 || is_prize == 1 || kind == 15) {
				return false;
			}
			if (_s.match(miniCart.regular.pint)) {
				_s = parseInt(_s);
				miniCart.EventList.updNumUi($this, $ul, _s, $maxNum, 0, e);
			} else {
				$this.val(MINICART_DATA_INFO[cart_id].qty);
			}
		}
		//删除商品
		,
		deletePro: function(e) {
			var $this = $(this),
				$ul = $this.parents(".js_cart_pro_list"),
				cart_id = $ul.attr('cart_id'),
				item_data = MINICART_DATA_INFO[cart_id];
			miniCart.viewEvent.getNewScrollTop(e);

			if (MINICART_DATA_INFO[cart_id].source_sell > 0 || MINICART_DATA_INFO[cart_id].kind == 8) {
				cart_id = miniCart.EventList.getSpecialCartId(cart_id);
			}
			var send_data = {
				cart_detail_ids: [cart_id],
				cart_detail_qty: []
			};
			send_data.cart_detail_qty.push({
				cart_detail_id: cart_id,
				qty: item_data.qty
			});
			var deleteListCallBack = {
				sendData: send_data
			};
			deleteListToCart(deleteListCallBack);
		},
		abnormalDisplay: function(message, e) {
			var $this = $(e.currentTarget),
				$input = $this.siblings("input"),
				$miniOp = $this.parents(".mini_op");
			if ($miniOp.length && !$miniOp.find('.cl-xg').length) {
				var $xg = $('<span class="cl-xg">' + message + '<i class="icon-triangle-02"></i></span>');
				$miniOp.append($xg);
				$xg.show(100);
				setTimeout(function() {
					$xg.remove();
				}, 2000); //2秒后消失
			}
		},
		updNumUi: function(objInput, objUi, thisNum, maxNum, outtime, e) {
			var isModify = true;
			var cart_id = objUi.attr('cart_id');
			if (thisNum < 1) {
				thisNum = MINICART_DATA_INFO[cart_id].qty;
				isModify = false;
			}
			objInput.val(thisNum);
			if (MINICART_DATA_INFO[cart_id].source_sell > 0 || MINICART_DATA_INFO[cart_id].kind == 8) {
				thisNum += miniCart.EventList.getSpecialQty(cart_id);
				cart_id = miniCart.EventList.getSpecialCartId(cart_id);
			}

			if (maxNum > 0 && thisNum > maxNum) {
				//判断是否已存在提示
				if (!objUi.find('.cl-xg').length) {
					var msg = '最多可购' + maxNum + '件';
					miniCart.EventList.abnormalDisplay(msg, e);
				}
				thisNum = maxNum;
			}

			if (thisNum == 1) {
				objUi.find(".mini_num a").eq(0).addClass('reduce_gray');
			} else if (thisNum == maxNum) {
				objUi.find(".mini_num a").eq(1).addClass('add_gray');
			} else if (thisNum > 1 && thisNum < maxNum) {
				objUi.find(".mini_num a").removeClass('reduce_gray add_gray');
			}
			if (isModify === true) {
				miniCart.EventList.updNumModify(objInput, objUi, cart_id, thisNum, outtime, e);
			} else {
				objInput.val(thisNum);
			}
		},
		updNumModify: function(objInput, objUi, cart_id, thisNum, outtime, e) {
			clearTimeout(t);
			t = setTimeout(function() {
				var cart_detail_list = [];
				miniCart.viewEvent.getNewScrollTop(e);

				cart_detail_list.push({
					cart_detail_id: cart_id,
					qty: thisNum,
					selected: true,
					campaign_seq: null
				});
				var send_data = {
					cart_detail_list: cart_detail_list
				};
				var modifyListCallBack = {
					sendData: send_data
				};
				modifyListToCart(modifyListCallBack);
			}, outtime);
		}
	},
	ajaxEvent:{
		showMiniCart: function() {
			var timestamp = new Date().getTime();
			$.ajax({
				url: DOMAIN_SHOP_NEW + "cartApi/getAll?timestamp=" + timestamp,
				dataType: "jsonp",
				data: {
					data: JSON.stringify(MINICART_SEND_DATA)
				},
				success: function(data) {
					miniCart.viewEvent.miniCartView(data);
				}
			});
		},
		showMiniCartNum: function() {
			var timestamp = new Date().getTime();
			$.ajax({
				url: DOMAIN_SHOP_NEW + "cartApi/getMiniCartSum?timestamp=" + timestamp,
				dataType: "jsonp",
				data: {
					data: JSON.stringify(MINICART_SEND_DATA)
				},
				success: function(data) {
					miniCart.viewEvent.miniCartViewNum(data);
				}
			});
		}
	},
	viewEvent:{
		sdboxMiniCartRightHeight: function() {
			if($('#miniCartRight').length > 0){
				var wHeight = $(window).height(),
					Jsdb = $(".J-sdb"),
					cHeight = 0;
				if (!Jsdb.hasClass('m-sdb-sale')) {
					cHeight = wHeight - 137;
				} else {
					cHeight = wHeight - 337;
				}
				$(".J-sdb-cb").css('height', cHeight + 'px');
			}
		},
		getNewScrollTop:function(e){
			if($(e.currentTarget).parents('#miniCartRight').length > 0){
				MINICART_SCROLL_TOP = $('#miniCartRight').find(".js_cart_top").scrollTop();
				MINICART_SCROLL_TOP_TYPE = 1;
			}else{
				MINICART_SCROLL_TOP = $('#hd-my-cart').find(".js_cart_top").scrollTop();
				MINICART_SCROLL_TOP_TYPE = 0;
			}
		},
		setNewScrollTop:function(){
			if(MINICART_SCROLL_TOP_TYPE == 0){
				$('#hd-my-cart').find(".js_cart_top").scrollTop(MINICART_SCROLL_TOP);
			}else{
				$('#miniCartRight').find(".js_cart_top").scrollTop(MINICART_SCROLL_TOP);
			}
		},
		cartQuantity: function(qty) {
			qty = parseInt(qty) || 0;
			$('#hd-my-cart').find('.cart_quantity').text(qty);
			if ($('#miniCartRightQty').length > 0) {
				$('#miniCartRightQty').text(qty);
			}
		},
		miniCartViewNum: function(data) {
			//添加后只更新小购物车显示数量
			var miniCartSum = 0;
			if (data.status == 1) {
				miniCartSum = data.info.miniCartSum;
				miniCart.viewEvent.cartQuantity(miniCartSum);
			}

			/**
			 * 促销活动页面的购物车
			 */
			if (typeof send_to_campaign_cart_info === 'function') {
				send_to_campaign_cart_info();
			}
		},
		miniCartView: function(data) {
			if (data.status == 0) {
				var bind_data = {
					info: 2
				};
			} else {
				var info = data.info;
				if(data.status == 1){
					if (!info || typeof(info.cart_camp) == "undefined") {
						var bind_data = {
							info: 0
						};
						miniCart.viewEvent.cartQuantity(0);
					} else {
						MINICART_DATA_INFO = info.cart;
						var bind_data = {
							info: 1,
							total: info.total,
							cart: info.cart_camp,
							shop_url: MINICART_CART_URL
						};
						miniCart.viewEvent.cartQuantity(info.total.qty);
					}
				}
			}
			//var html = template('miniCartScript', bind_data);
			var tplString = getMiniCartTplString();
			var render = template.compile(tplString);
			var html = render(bind_data);
//			var html = template(tplString, bind_data);
			if ($('#content_test').length > 0) {
				$('#content_test').html(html);
			} else {
				$('#show_minicart').html(html);
			}
			/**
			 * 促销活动页面的购物车
			 */
			if (typeof send_to_campaign_cart_info === 'function') {
				send_to_campaign_cart_info();
			}
			if (IS_LOAD_CART_VIEW) {
				$('#miniCartRight').empty();
				$('#minicart').clone(true).appendTo($('#miniCartRight'));
			}
			miniCart.init();
		}
	},
	templateHelper:{
		getNumVali:function(price){
			if (parseInt(price) < 0) {
				return 0.00;
			}
			return price;
		},
		getTagList:function(tag_list) {
			var tag_list_html = '';
			$.each(tag_list, function(i, v) {
				switch (v) {
					case 1:
						tag_list_html += '<span class="span_buyreduce">买立减</span>';
						break;
					case 2:
						tag_list_html += '<span class="span_fresh">生鲜</span>';
						break;
					case 3:
						tag_list_html += '<span class="span_package">加价购</span>';
						break;
					case 4:
						tag_list_html += '<span class="span_gift">赠品</span>';
						break;
					case 5:
						tag_list_html += '<span class="span_comb">组合</span>';
						break;
					case 6:
						tag_list_html += '<span class="span_accessory">配件</span>';
						break;
					case 8:
						tag_list_html += '<span class="span_package">优惠套餐</span>';
						break;
					case 10:
						tag_list_html += '<span class="span_globalp"></span>';
						break;
					case 12:
						tag_list_html += '<span class="span_group">团购</span>';
						break;
					case 13:
						tag_list_html += '<span class="m-sp-col">礼品</span>';
						break;
					case 16:
						tag_list_html += '<span class="span_comb">换购</span>';
						break;
				}
			});
			return tag_list_html;
		},
		getCampTypeTage:function(type) {
			type = parseInt(type);
			var typeName = '';
			switch (type) {
				case 0:
					typeName = '满减';
					break;
				case 1:
					typeName = '满赠';
					break;
				case 2:
					typeName = '限时活动';
					break;
				case 3:
					typeName = '满赠';
					break;
				case 4:
					typeName = '满减';
					break;
				case 5:
					typeName = '折扣';
					break;
				case 6:
					typeName = '折扣';
					break;
				case 7:
					typeName = '满赠';
					break;
				case 8:
					typeName = '折扣';
					break;
				case 9:
					typeName = '优惠';
					break;
				case 10:
					typeName = '优惠';
					break;
				case 11:
					typeName = '优惠';
					break;
				case 12:
					typeName = '优惠';
					break;
				case 13:
					typeName = '换购';
					break;
				case 14:
					typeName = '换购';
					break;
				default:
					typeName = '优惠';
			}
			return '[' + typeName + ']';
		},
		getSellingStatusWarning:function(disableReason) {
			var warning = '';
			disableReason = parseInt(disableReason);
			switch (disableReason) {
				case 1:
					warning = '商品下架';
					break;
				case 2:
					warning = '预购商品预购时间结束';
					break;
				case 3:
					warning = '商品已售罄';
					break;
				case 4:
					warning = '暂不配送';
					break;
				case 5:
					warning = '商品已删除';
					break;
				case 6:
					warning = '优惠已达上限';
					break;
				case 7:
					warning = '已赠完';
					break;
				case 8:
					warning = '企业用户不能购买商城商品';
					break;
				case 9:
					warning = '请先注册为母婴用户';
					break;
				case 10:
					warning = '您已领取过母婴0元商品';
					break;
				case 11:
					warning = '商品暂不出售';
					break;
				case 12:
					warning = '您已领取过睿仕汇开卡礼';
					break;
				case 13:
					warning = '商品需预约后购买';
					break;
				case 14:
					warning = '预售商品需单独购买';
					break;
				case 15:
					warning = '活动已终止';
					break;
				case 16:
					warning = '活动尚未开始';
					break;
				case 17:
					warning = '活动已结束';
					break;
				case 20:
					warning = '积分不足';
					break;
				case 21:
					warning = '会员等级未满足';
					break;
			}
			return warning;
		},
		getUlClass:function(mini_ul_class) {
			var ulClass;
			switch (mini_ul_class) {
				case "plus":
					ulClass = 'ul_plus';
					break;
				case "accessory":
					ulClass = "ul_accessory";
					break;
				case "comb":
					ulClass = "ul_comb";
					break;
				case "gift":
					ulClass = "ul_gift";
					break;
				default:
					ulClass = "";
			}
			return ulClass;
		},
		getUlConnectClass:function(mini_ul_connect) {
			if (mini_ul_connect == true) {
				return '<div class="connect"></div>';
			}
			return '';
		}
	},
	viewAction:{
		mouseover:function(e) {
			var cartToken = miniCart.utils.getCookie('cart_token');
			if (!cartToken || !MINICART_LAST_CART_TOKEN || cartToken != MINICART_LAST_CART_TOKEN) {
				MINICART_LAST_CART_TOKEN = cartToken;
				miniCart.ajaxEvent.showMiniCart();
			}
			$('#show_minicart').show();
		},
		mouseleave:function(e) {
			$('#show_minicart').hide();
		},
		click:function() {
			window.location.href = MINICART_CART_URL;
			return true;
		}
	}
};

$(function() {
	template.helper('helperNumVali', miniCart.templateHelper.getNumVali);
	template.helper('helperTagList', miniCart.templateHelper.getTagList);
	template.helper('helperCampTypeTage', miniCart.templateHelper.getCampTypeTage);
	template.helper('helperSellingStatusWarning', miniCart.templateHelper.getSellingStatusWarning);
	template.helper('helperUlClass', miniCart.templateHelper.getUlClass);
	template.helper('helperUlConnectClass', miniCart.templateHelper.getUlConnectClass);
	
	
	if ($('#miniCartRight').length > 0) {
		IS_LOAD_CART_VIEW = true;
		MINICART_LAST_CART_TOKEN = miniCart.utils.getCookie('cart_token');
	}

	
	if (IS_LOAD_CART_VIEW) {
		miniCart.ajaxEvent.showMiniCart();
	} else {
		miniCart.ajaxEvent.showMiniCartNum();
	}
	/*var timestamp = new Date().getTime();
	var url_template = DOMAIN_SHOP_NEW + "cart/minicart?timestamp=" + timestamp;
	if (IS_LOAD_NEW_CART) {
		url_template = url_template + '&version=1';
	}
	$.ajax({
		url: url_template,
		dataType: "jsonp",
		success: function(data) {
			$('body').append(data.data);
			$('#show_minicart').hide();
			if (IS_LOAD_CART_VIEW) {
				miniCart.ajaxEvent.showMiniCart();
			} else {
				miniCart.ajaxEvent.showMiniCartNum();
			}
		},
		error: function() {

		}
	});*/
	if(IS_LOAD_NEW_CART){
		$('#hd-my-cart').on('mouseover touchstart', '.c-n,.c-num', miniCart.viewAction.mouseover)
						.on('mouseleave', miniCart.viewAction.mouseleave)
						.on('click touchstart', '.c-n,.c-num', miniCart.viewAction.click);
	}else{
		$('#hd-my-cart').on('mouseover touchstart', '.icon-cart-gwc,.icon-cart-hd', miniCart.viewAction.mouseover)
						.on('mouseleave', miniCart.viewAction.mouseleave)
						.on('click touchstart', '.icon-cart-gwc,.icon-cart-hd', miniCart.viewAction.click);
	}
	
});

function getMiniCartTplString(){
	if(IS_LOAD_NEW_CART){
		return tplMiNiCartNew;
	}else{
		return tplMiNiCartOld;
	}
}

/**
* 添加到购物车
* @param {obj} options
* options = {
beforeSend:function(){},
done:function(data){},
fail:function(){}
};
* @returns {undefined}
*/
function addListToCart(optionsParam) {
	if (!optionsParam.sendData) {
		alert('添加商品不能为空哦！');
		return false;
	}
	var options = {};
	options = $.extend({
		beforeSend: function() {},
		done: function(data) {
			if (data.stauts == 1) {
				alert('加入成功!');
			} else {
				alert(data.msg);
			}
		},
		fail: function() {
			alert('服务请求错误，请稍后再试或联系客服！');
		},
		always: function() {}
	}, optionsParam || {});
	options.sendData.return_cart_data = false;
	options.sendData = $.extend({}, MINICART_SEND_DATA, options.sendData);
	$.ajax({
		url: DOMAIN_SHOP_NEW + "cartApi/addList",
		dataType: "jsonp",
		cache: false,
		data: {
			source: window.location.toString(),
			data: JSON.stringify(options.sendData)
		},
		beforeSend: options.beforeSend
	}).done(options.done)
		.done(function(data) {
			if (data.status == 1 || data.status == 2) {
				miniCart.viewEvent.miniCartViewNum(data);
			}
		})
		.fail(options.fail)
		.always(options.always);
}

function modifyListToCart(optionsParam) {
	if (!optionsParam.sendData) {
		alert('修改商品不能为空哦！');
		return false;
	}
	var options = {};
	options = $.extend({
		beforeSend: function() {},
		done: function(data) {},
		fail: function() {
			alert('服务请求错误，请稍后再试或联系客服！');
		},
		always: function() {}
	}, optionsParam || {});
	options.sendData = $.extend({}, MINICART_SEND_DATA, options.sendData);
	var timestamp = new Date().getTime();
	$.ajax({
		url: DOMAIN_SHOP_NEW + "cartApi/modifyList?timestamp=" + timestamp,
		dataType: "jsonp",
		cache: false,
		data: {
			data: JSON.stringify(options.sendData)
		},
		beforeSend: options.beforeSend
	}).done(options.done)
		.done(function(data) {
			miniCart.viewEvent.miniCartView(data);
			if (data.status == 2) {
				alert(data.msg);
			} else if (data.status == 3) {
				alert('修改失败！');
			}
		})
		.fail(options.fail)
		.always(options.always);
}

function deleteListToCart(optionsParam) {
	if (!optionsParam.sendData) {
		alert('删除商品不能为空哦！');
		return false;
	}
	var options = {};
	options = $.extend({
		beforeSend: function() {},
		done: function(data) {},
		fail: function() {
			alert('服务请求错误，请稍后再试或联系客服！');
		},
		always: function() {}
	}, optionsParam || {});
	options.sendData = $.extend({}, MINICART_SEND_DATA, options.sendData);
	var timestamp = new Date().getTime();
	$.ajax({
		url: DOMAIN_SHOP_NEW + "cartApi/deleteList?timestamp=" + timestamp,
		dataType: "jsonp",
		cache: false,
		data: {
			data: JSON.stringify(options.sendData)
		},
		beforeSend: options.beforeSend
	}).done(options.done)
		.done(function(data) {
			miniCart.viewEvent.miniCartView(data);
			if (data.status == 2) {
				alert(data.msg);
			} else if (data.status == 3) {
				alert('删除失败！');
			}
		})
		.fail(options.fail)
		.always(options.always);
}

//将原send_data格式，适配为新格式
function parseSendDataToCart(send_data) {
	if ($.isPlainObject(send_data)) {
		var send_datas = send_data;
	} else {
		var send_datas = $.parseJSON(send_data);
	}
	var send_data = {
		product_list: []
	};
	var product_list = [];
	var pro_main = {
		"kind": 1,
		"type": 0,
		"sm_seq": send_datas.s,
		"parent_seq": "",
		"qty": send_datas.q,
		"campaign_seq": send_datas.campaign_seq === 'undefined' ? '' : send_datas.campaign_seq
	};
	product_list.push(pro_main);
	if (!$.isEmptyObject(send_datas.g)) {
		for (var num_g = 0; num_g < send_datas.g.length; num_g++) {
			product_list.push({
				"kind": 2,
				"type": 0,
				"sm_seq": send_datas.g[num_g].i,
				"parent_seq": send_datas.s,
				"qty": send_datas.g[num_g].q,
				"campaign_seq": ""
			});
		}
	}
	if (!$.isEmptyObject(send_datas.p)) {
		for (var num_p = 0; num_p < send_datas.p.length; num_p++) {
			product_list.push({
				"kind": 3,
				"type": 0,
				"sm_seq": send_datas.p[num_p].i,
				"parent_seq": send_datas.s,
				"qty": send_datas.p[num_p].q,
				"campaign_seq": ""
			});
		}
	}
	if (!$.isEmptyObject(send_datas.m)) {
		for (var num_m = 0; num_m < send_datas.m.length; num_m++) {
			product_list.push({
				"kind": 6,
				"type": 0,
				"sm_seq": send_datas.m[num_m].i,
				"parent_seq": send_datas.s,
				"qty": 1,
				"campaign_seq": ""
			});
		}
	}
	send_data.product_list.push(product_list);
	return send_data;
}

var tplMiNiCartNew = [
	'<div class="minicartContent" id="minicart">',
	'{{if info == 1}}',
	'<div class="mn-c-m oh">',
	'<div class="mn-c-box J-sdb-cb js_cart_top">',
			'{{each cart as merchant}}',
			'<dl class="c-store mb15">',
				'<dt class="c-store-tt fixed">',
					'<a href="#" class="n fl" alt="" title="">{{merchant.info[0].merchantName}}</a>',
				'</dt>',
				'<dd class="c-list">',
					'{{each merchant.data as camp}}',
					'{{if camp.info[0] != null}}',
					'<div class="c-prod">',
						'<div class="c-sale-tip" class="js_no_camp_list" id="js_no_camp_{{camp.info[0].campId}}">',
							'<div class="c-sale-b">',
								'<span class="i">{{camp.info[0].type | helperCampTypeTage}}</span>',
								'<span class="c">{{camp.info[0].camp_desc}}</span>',
							'</div>',
						'</div>',
						'{{/if}}',
						'{{each camp.data as product productKey}}',
						'{{if camp.info[0] == null}}',
						'<div class="c-prod">',
						'{{/if}}',
							'{{each product as item itemKey}}',
							'<div class="c-item fixed {{if item.disable_reason }}c-soldout{{/if}} js_cart_pro_list" cart_id="{{item.cart_id}}">',
								'{{if item.is_delete}}<a class="del js_delete"></a>{{/if}}',
								'<p class="i fl mr5">',
									'<a {{if item.source_url}}href="{{item.source_url}}"{{/if}} alt="" title=""><img src="{{item.it_pic}}" height="50" width="50" alt="" title=""></a>',
								'</p>',
								'<p class="n fl">',
									'<a {{if item.source_url}}href="{{item.source_url}}"{{/if}} class="" alt="" title="">{{#item.tag_list | helperTagList}}{{item.name}}</a>',
								'</p>',
								'{{if item.is_upd}}',
								'<p class="num fl js_mini_num">',
									'<a href="javascript:void(0);" class="reduce {{if (item.disable_reason || item.qty <= 1 || item.kind == 15)}}reduce_gray{{/if}} fl" data-value="-1"></a>',
									'<input type="text" autocomplete="off" value="{{item.qty}}" data-limit="{{item.max_buy_num}}" {{if item.is_prize== 1 || item.is_voucher_present== 1 || item.kind == 15}}disabled="disabled" {{/if}}>',
									'<a href="javascript:void(0);" class="add {{if (item.disable_reason || item.qty >= item.max_buy_num || item.kind == 15)}}add_gray{{/if}} fr" data-value="1"></a>',
								'</p>',
								'{{/if}}',
								'<p class="p fr mt5">',
									'{{if item.is_price}}<em>￥</em><span>{{item.price}}</span>{{/if}}',
								'</p>',
								'{{if item.integral_product_points > 0}}',
								'<p class="u-e-p">+<span>{{item.integral_product_points}}</span>积分</p>',
								'{{/if}}',
								'{{if item.disable_reason}}',
								'<p class="out fr">{{item.disable_reason | helperSellingStatusWarning}}</p>',
								'{{/if}}',
							'</div>',
							'{{/each}}',
							'{{if camp.info[0] == null}}',
						'</div>',
						'{{/if}}',
						'{{/each}}',
						'{{if camp.info[0] != null}}',
					'</div>',
					'{{/if}}',
					'{{/each}}',
				'</dd>',
			'</dl>',
			'{{/each}}',
		'</div>',
		'<div class="mn-c-total">',
			'<div class="c-t fixed">',
				'<p class="t-n fl">',
					'<span id="total_qty">{{total.qty}}</span>件',
				'</p>',
				'<p class="t-p fr">',
					'<em>￥</em><span id="total_pay">{{total.total_pay}}</span>',
					'{{if total.total_score > 0}}',
					'<span class="u-e-p">+<em>{{total.total_score}}</em>积分</span>',
					'{{/if}}',
				'</p>',
			'</div>',
			'<div class="c-btn">',
				'<a href="{{shop_url}}" alt="" title="">去购物车结算 &gt;&gt;</a>',
			'</div>',
		'</div>',
	'</div>',
	'{{else}}',
	'<div class="empty-c">',
		'<span class="ma"><i class="c-i oh"></i>购物车中没有飞牛商品哟！</span>',
	'</div>',
	'{{/if}}',
'</div>'
].join('');
var tplMiNiCartOld = [
	'<div class="ui_poptip minicart minicartContent" id="minicart">',
	'<input type="hidden" id="miniCartIsLoad" value="0">',
	'<div class="ui_poptip_container">',
		'<div class="ui_poptip_arrow poptip_up"></div>',
		'<div class="ui_poptip_content">',
			'{{if info == 1}}',
			'<div class="mini_product">',
				'<p class="mini_tit">最新加入商品</p>',
				'<div class="cart_con js_cart_top">',
					'{{each cart as merchant}}',
					'{{each merchant.data as camp}}',
					'{{if camp.info[0] != null}}',
					'<div class="one_active js_no_camp_list" id="js_no_camp_{{camp.info[0].campId}}">',
						'<ul class="ul_activity">',
							'<li>',
								'<p class="name"><strong>{{#camp.info[0].type | helperCampTypeTage}}</strong>{{camp.info[0].camp_desc}}</p>',
								'<p class="subtotal">',
									'<span>小计：</span>',
									'<span class="price">',
										'<em class="symbol">&yen;</em>',
										'<span class="payable">{{camp.info[0].payable | helperNumVali}}</span>',
									'</span>',
								'</p>',
							'</li>',
						'</ul>',
						'{{/if}}',
						'{{each camp.data as product product_index}}',
						'{{if camp.info[0] == null}}',
						'<div class="one_active js_camp_list">',
							'{{/if}}',
							'{{each product as item item_index}}',
							'<ul class="ul_product {{#item.mini_ul_class | helperUlClass}} {{if item.disable_reason}}ul_abnormal{{/if}} js_cart_pro_list" cart_id="{{item.cart_id}}">',
								'<li>{{#item.mini_ul_connect | helperUlConnectClass}}',
									'<a class="pdetail" {{if item.source_url}}href="{{item.source_url}}"{{/if}} >',
									'<img src="{{item.it_pic}}"/>',
									'<p>',
										'<span class="name">{{#item.tag_list | helperTagList}}{{item.name}}</span>',
										'{{if item.is_price}}<span class="price"><em class="symbol">&yen;</em>{{item.price}}</span>{{/if}}',
									'</p>',
									'<div class="mini_op">',
										'<a class="delete js_delete" href="javascript:;">{{if item.is_delete}}删除{{/if}}</a>',
										'{{if item.is_upd}}',
												'<span class="mini_num js_mini_num">',
													'<a href="javascript:;" class="reduce {{if (item.disable_reason || item.qty <= 1 || item.kind == 15)}}reduce_gray{{/if}}" data-value="-1"></a>',
													'<input type="text" autocomplete="off" value="{{item.qty}}" data-limit="{{item.max_buy_num}}" {{if item.is_prize==1 || item.is_voucher_present== 1 || item.kind == 15}}disabled="disabled" {{/if}} />',
													'<a href="javascript:;" class="add {{if (item.disable_reason || item.qty >= item.max_buy_num || item.kind == 15)}}add_gray{{/if}}" data-value="1"></a>',
												'</span>',
										'{{/if}}',
									'</div>',
								'</li>',
							'</ul>',
							'{{/each}}',
						'{{if camp.info[0] == null}}',
						'</div>',
						'{{/if}}',
						'{{/each}}',
					'{{if camp.info[0] != null}}',
					'</div>',
					'{{/if}}',
					'{{/each}}',
					'{{/each}}',
				'</div>',
				'<div class="mini_total clearfix">',
					'<p class="cart_num">共<span class="num" id="total_qty">{{total.qty}}</span>件商品</p>',
					'<p class="cart_total"><span class="tit">共计</span><span class="price"><em class="symbol">&yen;</em><span id="total_pay">{{total.total_pay}}</span></span></p>',
				'</div>',
				'<p class="cart_bot">',
					'<a class="cart_buy" href="{{shop_url}}">去购物车结算</a>',
				'</p>',
			'</div>',
			'{{else if info == 2}}',
			'<span class="nop refresh"><a class="r_btn" onclick="javascript:show_minicart();"></a>系统异常，请刷新</span>',
			'{{else}}',
			'<span class="nop emptycart">购物车中没有飞牛商品哟！</span>',
			'{{/if}}',
		'</div>',
	'</div>',
'</div>'
].join('');