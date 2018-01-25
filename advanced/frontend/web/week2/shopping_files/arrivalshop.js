/*
 *  @name arrivalshop.js
 *  @Copyright feiniu         //版权声明
 *  @Designed @davy.gao
 *  @date 2016-08-03          //制作时间
 *  @update 2016-08-13        //最后更新时间
 */
define(['jquery'],function($) {

	//立执行闭包
	(function(arrivalFun){

		var strHtml = "";

			//<!-- 订阅到货通知 start [[-->
	        strHtml += '<div id="togoods-box" class="collect-public" tp-area="4014">';
	        strHtml += '    <div class="togoods-title">';
	        strHtml += '        <span>30日内商品一旦到货，我们立即通过手机短信、邮件、消息中心通知您</span>';
	        strHtml += '    </div>';
	        strHtml += '    <div class="togoods-content">';
	        strHtml += '        <ul>';
	        strHtml += '            <li><em>手机号码：</em>';
	        strHtml += '                <input type="text" class="go-input txt-phone-num"><i></i>';
	        strHtml += '            </li>';
	        strHtml += '            <li><em>邮箱地址：</em>';
	        strHtml += '                <input type="text" class="go-input txt-email"><i></i>';
	        strHtml += '            </li>';
	        strHtml += '            <li>';
	        strHtml += '                <label>';
	        strHtml += '                    <input type="checkbox" checked="checked" class="radio">添加到收藏夹</label>';
	        strHtml += '            </li>';
	        strHtml += '            <li class="button"><a href="javascript:void(0);" class="ui-button ui-button-80" id="togoodsSubmit">提交</a>';
	        strHtml += '            </li>';
	        strHtml += '        </ul>';
	        strHtml += '    </div>';
	        strHtml += '</div>';
	        //<!-- 订阅到货通知 end ]]-->
	        //<!-- 订阅到货通知成功 start [[-->
	        strHtml += '<div id="togoods-sub-box" class="collect-public to-public" tp-area="4015">';
	        strHtml += '    <div class="colect-top">';
	        strHtml += '        <i class="colect-icon"></i>';
	        strHtml += '        <div class="conect-title">';
	        strHtml += '            <span>商品订阅到货通知成功！</span>';
	        strHtml += '        </div>';
	        strHtml += '    </div>';
	        strHtml += '    <div id="watch">';
	        strHtml += '        <span>游览了此商品的用户还看了：</span>';
	        strHtml += '        <ul class="fn-clear watch-list">';

	        strHtml += '        </ul>';
	        strHtml += '    </div>';
	        strHtml += '</div>';
	        //<!-- 订阅到货通知 end ]]-->

	    $("body").append(strHtml);

		arrivalFun();

	}(function(){

		//无法使用jquery自带的beta64会导致返回数据无法解析
		function Base64() {  
   
		    // private property  
		    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
		   
		    // public method for encoding  
		    this.encode = function (input) {  
		        var output = "";  
		        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
		        var i = 0;  
		        input = _utf8_encode(input);  
		        while (i < input.length) {  
		            chr1 = input.charCodeAt(i++);  
		            chr2 = input.charCodeAt(i++);  
		            chr3 = input.charCodeAt(i++);  
		            enc1 = chr1 >> 2;  
		            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
		            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
		            enc4 = chr3 & 63;  
		            if (isNaN(chr2)) {  
		                enc3 = enc4 = 64;  
		            } else if (isNaN(chr3)) {  
		                enc4 = 64;  
		            }  
		            output = output +  
		            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
		            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
		        }  
		        return output;  
		    }  
		   
		    // public method for decoding  
		    this.decode = function (input) {  
		        var output = "";  
		        var chr1, chr2, chr3;  
		        var enc1, enc2, enc3, enc4;  
		        var i = 0;  
		        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
		        while (i < input.length) {  
		            enc1 = _keyStr.indexOf(input.charAt(i++));  
		            enc2 = _keyStr.indexOf(input.charAt(i++));  
		            enc3 = _keyStr.indexOf(input.charAt(i++));  
		            enc4 = _keyStr.indexOf(input.charAt(i++));  
		            chr1 = (enc1 << 2) | (enc2 >> 4);  
		            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
		            chr3 = ((enc3 & 3) << 6) | enc4;  
		            output = output + String.fromCharCode(chr1);  
		            if (enc3 != 64) {  
		                output = output + String.fromCharCode(chr2);  
		            }  
		            if (enc4 != 64) {  
		                output = output + String.fromCharCode(chr3);  
		            }  
		        }  
		        output = _utf8_decode(output);  
		        return output;  
		    }  
		   
		    // private method for UTF-8 encoding  
		    _utf8_encode = function (string) {  
		        string = string.replace(/\r\n/g,"\n");  
		        var utftext = "";  
		        for (var n = 0; n < string.length; n++) {  
		            var c = string.charCodeAt(n);  
		            if (c < 128) {  
		                utftext += String.fromCharCode(c);  
		            } else if((c > 127) && (c < 2048)) {  
		                utftext += String.fromCharCode((c >> 6) | 192);  
		                utftext += String.fromCharCode((c & 63) | 128);  
		            } else {  
		                utftext += String.fromCharCode((c >> 12) | 224);  
		                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
		                utftext += String.fromCharCode((c & 63) | 128);  
		            }  
		   
		        }  
		        return utftext;  
		    }  
		   
		    // private method for UTF-8 decoding  
		    _utf8_decode = function (utftext) {  
		        var string = "";  
		        var i = 0;  
		        var c = c1 = c2 = 0;  
		        while ( i < utftext.length ) {  
		            c = utftext.charCodeAt(i);  
		            if (c < 128) {  
		                string += String.fromCharCode(c);  
		                i++;  
		            } else if((c > 191) && (c < 224)) {  
		                c2 = utftext.charCodeAt(i+1);  
		                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
		                i += 2;  
		            } else {  
		                c2 = utftext.charCodeAt(i+1);  
		                c3 = utftext.charCodeAt(i+2);  
		                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
		                i += 3;  
		            }  
		        }  
		        return string;  
		    }  
		};

		var newBase64 = new Base64();

		//弹层重新定义
		var dialog = pubdialog;

		//验证信息
	    var regular = {
	        //用户相关的正则验证
	        user_VARS: {
	            "email": /^[a-z0-9]([a-z0-9\\.]*[-_]{0,4}?[a-z0-9\\.]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+([\.][\w_-]+){1,5}$/i, //edit by PJ //[\\.][a-z]{2,3}([\\.][a-z]{2})?,
	            "phone": /^1\d{10}$/,//手机
	            "username": /^[_a-zA-Z][_0-9a-zA-Z-]{3,19}$/i,
	            "password": /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*[a-z])|(?=.*[A-Z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])|(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[0-9])(?=.*[^A-Za-z0-9])).{6,}/,
	            "Chinese": /[\u4E00-\u9FA5]/,
	            "captcha": /^\d{4,6}$/,
	            "emailform": /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
	            // "is_email": /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/,
	        },
	        number_VARS:{
	            "money": "^[0-9]+[\.][0-9]{0,3}$",
	            "number": /^[1][3][0-9]{9}$/,
	            "pint": /^[0-9]\d*$/,
	            "limit":/^[0-9]{2}$/,
	            "isnull": "^[ ]+$"
	        }

	    };

	   	//错误信息
	    var errorMsg = {

	        username: {
	            0:'*期望价格不能为空',
	            1:'*价格格式不正确',
	            2:'*期望价格要小于当前的价格',
	            3:'*邮箱格式不正确',
	            4:'*手机号格式不正确',
	            5:'*邮箱/手机号至少填一个',
	            6:'有效',
	            7:'*邮箱地址不能为空',
	            8:'*手机号不能为空',
	            9:'*验证码不正确',
	            10:'*手机验证码不正确'
	        },

	        toGoods:{
	            0:'商品订阅到货通知成功！',
	            2:'很抱歉，商品订阅到货通知失败！'
	        }

	    };

	    //弹层title
	    var dialogTitle = {

	    	1:'收藏单品',

	    	2:'到货通知',

	    	3:'降价通知',

	    	4:'填写预约信息',

	    	5:'温馨提示'

	    };

	        //当前的弹层
	    var _dialog = null,
	    	//获取用户正则
	    	user_VARS = regular.user_VARS,

	        number_VARS = regular.number_VARS,
	        //用户信息错误提示
	        usernameMsg = errorMsg.username,
	        //订阅成功信息
	        toGoodsMsg = errorMsg.toGoods,
	        //收藏数据
	        _request = {},
	        //到货通知数据
	        request_data= {"sm_status" : usernameMsg[6]};

        /*
         * 到货通知弹窗
         * @returns {undefined}
         */
        var toGoods = function(){

        	var $this = $(this),

	            _ssm_type = $this.attr("data-ssm-type"),

	            _sm_seq = $this.attr("data-sku-seq"),

	            _price = $this.attr("data-price"),

	            _seq_kind = $this.attr("data-seq-kind"),

	            _type = $this.attr("data-type"),

	            _sm_title = $this.attr("data-sm-title");

            $.ajax({

                url: ac_url+"/check_login/v1?v="+Date.parse(new Date()),

                dataType: "jsonp",

                success: function(data) {

                    if (data.code !== 0) {

                        fnDialog();

                    }
                    else {

                        var $togoods_box = $('#togoods-box'),

                            mem_email = data.data.email,

                            cell_phone = data.data.phone;

                        dialogsFuns.toGoods();

                        $togoods_box.find('.txt-phone-num').val(cell_phone);

                        $togoods_box.find('.txt-email').val(mem_email);

                    }
                }
            });

            if(!$('.watch-list').children().length){

	            //游览了此商品的用户还看了
				show_recommend_read_item(_type,_sm_seq);

			}

            $.extend(_request,{"price":_price,"favorite_seq":_sm_seq,"seq_kind":_seq_kind,"type":_type});

            $.extend(request_data,{"sm_seq" : _sm_seq,"sm_name" : _sm_title,"sm_pattern" : _ssm_type});

        };

        /*
         * 到货通知申请提交
         * @param {type} arr
         * @returns {Boolean}
         */
        var toGoodSubmit = function(){

            var _that = this,

                $togoods_box = $('#togoods-box'),

                email_box  = $togoods_box.find('.txt-email'),

                phone_box = $togoods_box.find('.txt-phone-num'),

                email_error = $togoods_box.find('.txt-email ~ i'),

                phone_error = $togoods_box.find('.txt-phone-num ~ i'),

                radio = $togoods_box.find('.radio'),

                mem_email = email_box.val(),

                cell_phone = phone_box.val(),

                validate_result = false;

            /*验证手机号输入框*/
            if(!validation.isEmail(mem_email) && !validation.checkMobile(cell_phone)){

                phone_box.parent().addClass('go-error');

                phone_error.html(usernameMsg[4]);

            }else{

            	phone_box.parent().removeClass('go-error');

                validate_result = true;

            }

            /*验证邮箱输入框*/
            if(!validation.checkMobile(cell_phone) && !validation.isEmail(mem_email)){

                email_box.parent().addClass('go-error');

                email_error.html(usernameMsg[3]);

            }else{

            	email_box.parent().removeClass('go-error');

                validate_result = true;

            }

            if(validate_result){

            	$.extend(request_data,{"email" : mem_email,"phone":cell_phone});

                $.ajax({
                    url: ac_url+"/add_arrival_notice/v1?data="+newBase64.encode(JSON.stringify(request_data))+'&v='+Date.parse(new Date()),
                    dataType: "jsonp",
                    success: function(data) {

                        if(data.code == 0){

                            dialogsFuns.goGoodsEnd(0,toGoodsMsg[0]);

                        }
                        else{

                            dialogsFuns.goGoodsEnd(2,toGoodsMsg[2]);

                        }
                        //加入收藏夹
                        if(radio.prop('checked')){

                            collect_no_dialog();

                        }
                    }
                });



            }

        };

        /*
         * 看了又看
         * @author davy.gao
         */
        var show_recommend_read_item = function (_type,_sm_seq) {

        	var url = item_url.mall+'/rec_look_again?sku_seq=' + _sm_seq;

        	if(_type == 1){

        		url = item_url.mall+'/mall_rec_look_again?sku_seq='+_sm_seq;

        	}

            $.ajax({

                url: url,

                dataType: "jsonp",

                success: function(data) {

                	if (data.code == 0) {

	                    var list = data.data.list;

	                    var bind_watchlist = function(link,big_image,title,price){

	                        var _html = "<li>";

	                            _html += '<a href="'+link+'" class="watch-img"  target="_blank"><img src="'+big_image+'" alt="">';

	                            _html += '</a>';

	                            _html += '<h4><a href="'+link+'"  target="_blank">'+title+'</a></h4>';

	                            _html += '<p>';

	                            _html += '<q class="fn-rmb">&yen;</q><strong class="fn-rmb-num">'+price+'</strong>';

	                            _html += '</p>';

	                            _html += '</li>';

	                        $('.watch-list').append(_html);

	                    };

	                    for (var i=0;i<list.length;i++) {

	                        if(i>3)
	                            break;

	                        var sm_seq = list[i].id,

	                            title = list[i].title,

	                            link = item_url.mall+'/' + sm_seq,

	                            big_image = list[i].pic,

	                            price = list[i].price,

	                            it_price = list[i].item_price;

	                        bind_watchlist(link,big_image,title,price);

	                    }

	                }

                }

            });

        };

        /*
         * 无弹窗加入收藏夹
         * @returns {undefined}
         */
        var collect_no_dialog = function(){

            var url = ac_url + "/add_favorite/v1";

            $.ajax({

                url: url,

                dataType: "jsonp",

                data:_request,
                
                success:function(data){

                }

            });

        };

        var dialogsFuns = {

        	//到货通知登录
	        toGoods : function() {

	            tools.dialogs("togoods-box",{id:'addGift',width: '450px',height: '203px',title: dialogTitle[2]},false);

	        },

	        //到货通知提示成功
	        goGoodsEnd : function(type,text) {

	            tools.dialogs("togoods-sub-box",{width: '450px',height: '238px',title: dialogTitle[2],opacity: 0.2},false,function(){

	                dialog({

	                    id: "addGift"

	                }).close();

	                tools.changeAlear("togoods-sub-box",type,text);

	            });

	        }
        };

        var validation = {

        	/**
	         * 用判断输入手机号码是否正确
	         * davy.gao
	         */
	        checkMobile: function(s) {

	            var regu = user_VARS.phone;

	            var re = new RegExp(regu);

	            if (re.test(s)) {

	                return true;

	            }

	            return false;

	        },
	        /**
	         * 用判断输入对象的值是否符合E-Mail格式
	         * davy.gao
	         */
	        isEmail: function(str) {

	            var myReg = user_VARS.email;

	            if (myReg.test(str))
	                return true;

	            return false;

	        }

        };

        var tools = {
			/**
	         * 弹层公用
	         * davy.gao
	         */
	        dialogs: function(_id, obj, type, Fun) {

	            //初始值
	            var _default = {
	                fixed: true,
	                width: '450px',
	                height: '289px',
	                title: '温馨提示',
	                content: document.getElementById(_id),
	                cancelValue: '关闭',
	                quickClose: true,
	                opacity:0.4
	            },
	            //深度合并
	            opts = $.extend(true, _default, obj),
                //启用dialog
                d = dialog(opts);

	            //遮盖层
	            d.showModal();

	            //判断是否需要定时
	            if (type) {

	                setTimeout(function() {

	                    d.close().remove();

	                }, 5000);

	            }

	            //判断是否需要外部执行函数
	            if (typeof arguments[3] === "function") {

	                arguments[3]();

	            }
	            _dialog = d;
	            return;

	        },

			/**
		     * 弹层状态
		     * davy.gao
		     */
		    changeAlear : function(id,type,text){

		        var $this = $("#"+id),

		            tagI = $this.find("i"),

		            tagH3 = $this.find(".conect-title").children("span");

		        switch(type){

		            case 0:

		            tagI.removeClass().addClass("colect-icon");

		            tagH3.html(text);

		            break;

		            case 1:

		            tagI.removeClass().addClass("colect-wram");

		            tagH3.html(text);

		            break;

		            case 2:

		            tagI.removeClass().addClass("colect-fail");

		            tagH3.html(text);

		            break;

		        }

		    }

		};

		//4.davy.gao:到货通知
        $(document).on("click",".z-grey",toGoods);

        //5.davy.gao:到货通知提交
        $(document).on("click","#togoodsSubmit",toGoodSubmit);

	}));

});