define(["lib/jquery/1.11.1/jquery-1.11.1","lib/jquery/base64/jquery.base64", "controller/member/fingerprint2"], function(undefined,base64, Fingerprint2) {
(function(){
    var deviceId = null;
    $(function() { 
        new Fingerprint2().get(function(result, components){
            deviceId = result;
        });
    });
   


    var loginMobile = document.getElementById('login-mobile');
    var Util={Cookie:{set:function(a,b,c){var d=new Date;d.setTime(d.getTime()+1e3*60*60*24*c),document.cookie=a+"="+encodeURIComponent(b,"UTF-8")+";expires="+d.toGMTString()+";domain=passport"+siteDomain+";path=/"},get:function(a){var c,d,e,f,g,b=document.cookie?document.cookie.split("; "):[];for(c=0,d=b.length;d>c;c++)if(e=b[c].split("="),f=e.shift(),g=e.join("="),a&&a===f)return g},setALCookie:function(){var a,b;$("input[name='chkRememberMe']")[0].checked?(a=7,this.set("fn_auto_login",$("input[name='username']").val(),a)):(b=this.get("fn_auto_login"),b&&this.set("fn_auto_login","",-100))}}};
    var login = {
    	//定时器，轮询调用接口检查手机端是否扫描二维码登录
    	checkScanTimer:null,
        init : function(){
             login.bindEvents();
            login.extendJQuery();
            login.validation();
			login.getBannerInfo();
            function isPlaceholer(){
            	var input = document.createElement("input");
            	return "placeholder" in input;
            }
            
            if(!isPlaceholer()){
            	$('.J-input-txt').each(function(i){
            		if(!$(this).val()){
            			$('.J-input-txt').eq(i).placeholder({
                            'color' : '#ccc',
                            'font-size' : '14px'
                        });
            		}
            	});
            	$('.J-input-auth').placeholder({
            		'color' : '#ccc',
            		'display' : 'block',
            		'width' : '88px',
            		'text-align' : 'center',
                    'font-size' : '14px'
            	});
            }
            $(".cpcchang").click(function() {
                login.referscaptcha();
            });

        },
        extendJQuery: function () {
            /*
             * 处理placeholder
             * 处理对象：仅限父级relative的input，如需其他情况需将input包裹一层relative的div
             * 处理逻辑：动态改变value值及颜色
             */
            jQuery.fn.placeholder = function (options) {
                var $this = $(this);
                var height = $this.outerHeight() + 'px',
                    display = $this.css('display');
                    paddingLeft = $this.css('padding-left');

                options =  $.extend({
                    'color' : '#d3d3d3',
                    'display' : display,
                    'width' : 'auto',
                    'line-height' : height,
                    'padding-left' : paddingLeft
                }, options);
                
                $.each($this, function (index, el) {
                    var self = $(this),
                        placeholder = self.attr("placeholder"),
                        posi = self.position();
                    var op = $.extend(options, {
                        'position': 'absolute',
                        'left': '0',
                        'top' : '0'
                    });
                    
                    var holder = $('<span></span>').text(placeholder).css(op).
                    addClass(self.attr('name')).appendTo($(this).parent());

                    self.removeAttr('placeholder');

					self.keyup(function (event) {
						if (jQuery(this).val() !== "") {
							holder.hide();
						} else {
							if($(this).attr("name") == "username"){
                    			holder.html("邮箱/用户名/手机号").show();
                    		} else {
                    			holder.show();
                    		}
						}
					});
                    /*self.focus(function (event) {
                        if (!self.val()) {
                            holder.hide();
                        }
                    }).blur(function (event) {
                        if (self.val() == "") {
                            holder.show();
                        }
                    });*/
                    holder.click(function(event) {
                        $(this).hide();
                        self.focus();
                    });
                });
            };            
        },
        bindEvents : function(){
        	/**
        	 * 扫码登录切换
        	 */

        	$(".J-login-switch").on("click", function() {

        		//启动轮询，扫描手机端是否扫描二维码了
        		$(this).hasClass("pc") ? login.stopCheckScanState() :  login.startCheckScanState();
                var getDeviceID = deviceId;
               
                //切换到二维码登录的时候 刷新二维码
                if(!$(this).hasClass("pc")){
                        $.ajax({
                        type : 'post',
                        url : basePath + 'login/chkQrLoginStatus',
                        data : {'CSRF_TOKEN': csrfToken,"deviceId":getDeviceID,"referer":referer},
                        dataType : 'json',
                        success : function(data) {
                            if (data!=null) {
                                var qrCode = data.qrCode;
                                    if(qrCode=="1"){
                                        var qrCodeImgUrl= basePath + 'gateway/qrCodeImg?v='+ (new Date).getTime();
                                        $("#qrCodeImg").attr("src", qrCodeImgUrl);
                                        $("#J-qr-loginerr").hide();
                                    }
                            } 
                        },
                        error : function(XMLHttpRequest, textStatus, errorThrown) {
                            
                        }
                    });
                }
        		
        		$("#J-switch-tip").toggleClass("hide")
        		$("#J-pc-login,#J-qr-login").toggleClass("hide");
        		$(this).toggleClass("pc");
        	});
        	//刷新登录二维码
        	$("#J-refresh-qrcode").on("click", function() {
                var qrCodeImgUrl= basePath + 'gateway/qrCodeImg?v='+ (new Date).getTime();
        		$("#qrCodeImg").attr("src", qrCodeImgUrl);
        		$("#J-qr-loginerr").hide();
                login.startCheckScanState();
        	});
            $('.u-txt').on({
                focus : function(){
                    $(this).addClass('u-txt-focus');
                },
                blur : function(){
                    $(this).removeClass('u-txt-focus u-txt-err');
                    $('.u-msg-wrap .msg').hide();
                }
            });

            /**
             * 是否自动登录
             */              
            $('.J-auto-rmb').on('click', function(event) {
                var $wrap = $(this).parents('.login-form').find('.u-msg-wrap'),
                    $warn = $wrap.find('.msg-warn');
                $warn.find('.J-warnMsg').text('公共场所不建议自动登录，以防帐号丢失');
                $wrap.find('.msg').hide();
                $(this).prop('checked') ? $warn.show() : $warn.hide();
                
            });
            /**
             * 切换登录显示
             */
            $('.J-account-login, .J-mobile-login').on('click', function(event) {
                var $wrap = $('.login-form');
                $wrap.find('#login-mobile, .J-account-login').toggle();
                $wrap.find('#login-form, .m-login-gate').toggle();
                $('.u-msg-wrap .msg').hide();
                $("#J-switch-tip, .J-login-switch").toggleClass("hide");
            });

            /**
             * 发送短信验证码
             */

            /**异地登录手机验证弹层提交验证点击*/
            $("#JDiffLogin").on("click", ".JSendCode", function() {
            	if($(this).hasClass("disable"))
            		return;
            	// 
    			sendSms($(this), basePath + 'common/check/sendLoginSms', 90);
    			
            	/*
        		 * 发送短信验证码
        		 */
        		function sendSms($obj, url, timeInterval){
        			$(".u-errmsg").hide();
        			
        			var remainingSec = timeInterval;
        			$.ajax({
        				type : 'post',
        				url : url,
        				data : {'CSRF_TOKEN': csrfToken},
        				dataType : 'json',
        				success : function(data) {
        					if(!data.result){
        						if(data.msg){
        							$(".u-errmsg").show().text(data.msg);
        						} else {
        							$(".u-errmsg").show().text('发送失败');
        						}
        						remainingSec = data.limit ? data.limit : 0;
        					} else {
								if(data.msg){
        							$(".u-errmsg").show().text(data.msg);
        						}
							}
        				},
        				error : function(XMLHttpRequest, textStatus, errorThrown) {
        					$(".u-errmsg").show().text('网络失败, 请刷新后重试');
        				}
        			});
                    var countDownHandler = setInterval(countDown, 1000);
        			function countDown(){
        				if(remainingSec > 0){
        					$obj.prop("disabled",false).addClass("disable");
        					$obj.html('<em class="JTimer">' + remainingSec + '</em>秒后重新发送');
        					remainingSec--;
        				} else {
        					clearInterval(countDownHandler);
        					$obj.text($obj.attr('tipTxt'));
        					$obj.prop("disabled",false).removeClass('disable');
        				}
        			}
        		}
            });
            $("#JDiffLogin").on("click",".JClose", function(){
            	document.getElementById("JDiffLogin").style.display = "none";
            });
            // 提交验证
            $("a[name='b-submit']").on("click", function(){
            	var msgCode = $("input[name='msgCode']");
            	var codeVal = msgCode.val();
            	if(codeVal == ''){
            		$(".u-errmsg").show().text('请输入验证码');
					return;
            	} else if($.trim(codeVal).length != 6){
            		$(".u-errmsg").show().text('验证码错误, 请重新输入');
					return;
            	}
            	
            	var userVal = document.getElementById('login-form').username.value;
            	$.ajax({
    				type : 'post',
    				url : basePath + 'login/loginConfirm',
    				data : {'CSRF_TOKEN': csrfToken, 'user':userVal, 'referer':referer, 
    						'msgCode': $.trim(codeVal), 'chkRememberMe':$("input[name='chkRememberMe']")[0].checked},
    				dataType : 'json',
    				success : function(data) {
    					if(!data.result){
    						$(".u-errmsg").show().text('验证码错误, 请重新输入');
    					} else {
    						Util.Cookie.setALCookie();
        					top.location.href = data.url;
    					}
    				},
    				error : function(XMLHttpRequest, textStatus, errorThrown) {
    					$(".u-errmsg").show().text('网络失败, 请刷新后重试');
    				}
    			});
            });
            /**异地登录手机验证弹层提交验证点击end*/
        },
        /**
         * 轮询调用后台接口检查手机是否扫描二维码
         */
        startCheckScanState : function(sec) {
        	
        	login.checkScanTimer = setInterval(doCheck, sec || 2000);
        	
        	function doCheck() {
                // $("#J-scan-success").show(); 扫描成功
                // $("#J-qr-loginerr").show();  扫描失败
                //$("#g-qr-body").hide();原始页面
                //检查二维码的状态
                var isLogin = false;
				$.ajax({
                    type : 'post',
                    url : basePath + 'login/chkQrLoginStatus',
                    data : {'CSRF_TOKEN': csrfToken,"deviceId":deviceId,"referer":referer},
                    dataType : 'json',
                    success : function(data) {
                        if (data!=null) {
                            var qrCode = data.qrCode;

                            switch(qrCode){
                                 case "1"://已创建
                                    break;
                                case "2"://扫描成功
                                    $("#J-qr-loginerr").hide();
                                     $("#g-qr-body").hide();
                                    $("#J-scan-success").show();
                                    break;
                                case "4"://登录成功
                                    isLogin = true;
                                    //跳转
                                    referer=$.base64.decode(referer);
                                    location.href=referer;
                                    break;
                                case "3":
                                	login.stopCheckScanState();
                                	login.startCheckScanState(1000);
                                break;
                                case "5"://移动端取消登录,登录失败
                                    $("#J-scan-success").hide();
                                    $("#g-qr-body").show();
                                    $("#J-qr-loginerr").show();
                                    login.stopCheckScanState();
                                    break;
                                case "6"://二维码过期
                                    $("#J-scan-success").hide();
                                    $("#g-qr-body").show();
                                    $("#J-qr-loginerr").find(".tip").text("二维码失效");
                                    $("#J-qr-loginerr").show();
                                    login.stopCheckScanState();
                                    break;
                                default:
                                    $("#J-scan-success").hide();
                                    $("#g-qr-body").show();
                                    $("#J-qr-loginerr").find(".tip").text("二维码失效");
                                    $("#J-qr-loginerr").show();
                                    login.stopCheckScanState();
                                    break;
                            }

                        } else {
                                $("#J-scan-success").hide();
                                $("#J-qr-loginerr").find(".tip").text("请求失败");
                                $("#J-qr-loginerr").show();  
                        }
                    },
                    error : function(XMLHttpRequest, textStatus, errorThrown) {
                        
                    }
                });
        	}
        },
        /**
         * 停止调用
         */
        stopCheckScanState : function() {
        	clearInterval(login.checkScanTimer);
        },
        validation : function(){
            /*
             *策略模式的表单验证
             */

            /**************策略对象******************/
            var strategies = {
                isNonEmpty: function(value, errorMsg) {
                    if (value === '') {
                        return errorMsg;
                    };
                },
                minLength: function(value, length, errorMsg) {
                    if (value.length < length) {
                        return errorMsg;
                    };
                },
                isMobile: function(value, errorMsg) {
                    if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(value)) {
                        return errorMsg;
                    };
                },
                isEmail: function(value, errorMsg) {
                    var reg = /^[a-z0-9]([a-z0-9\\.]*[-_]{0,4}?[a-z0-9-_\\.]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+([\.][\w_-]+){1,5}$/i;
                    if (!reg.test(value)) {
                        return errorMsg;
                    };
                },
                isLength4: function(value, errorMsg) {
                    if ($.trim(value).length != 4) {
                        return errorMsg;
                    };
                }
            };

            /**************Validator 类******************/
            var Validator = function() {
                this.cache = [];
            };

            Validator.prototype.add = function(dom, rules) {

                var self = this;

                for (var i = 0, rule; rule = rules[i++];) {

                    (function(rule) {

                        var strategyAry = rule.strategy.split(':');

                        var errorMsg = rule.errorMsg;

                        self.cache.push(function() {

                            var strategy = strategyAry.shift();

                            strategyAry.unshift(dom.value);

                            strategyAry.push(errorMsg);

                            return strategies[strategy].apply(dom, strategyAry);
                        })

                    })(rule)

                };
            };

            Validator.prototype.start = function() {
                for (var i = 0, validatorFuc; validatorFuc = this.cache[i++];) {
                    var errorMsg = validatorFuc();
                    if (errorMsg) {
                        return errorMsg;
                    };
                };
            };


            /**************客户端调用代码******************/
            var loginForm = document.getElementById('login-form');

            var loginMobile = document.getElementById('login-mobile');
            
            var validataFuc = function(callback) {

                var validator = new Validator();

                if ($(loginForm).is(':visible')) {
                
                    var nameVal = loginForm.username.value;

                    validator.add(loginForm.username, [{
                        strategy: 'isNonEmpty',
                        errorMsg: '请输入账号:1'
                    }]);

                    validator.add(loginForm.password, [{
                        strategy: 'isNonEmpty',
                        errorMsg: '请输入密码:2'
                    }]);
                    
                    var isValidateAuthcode = $(loginForm).find('.J-input-auth').is(':visible');
                    if (isValidateAuthcode) {
                        validator.add(loginForm.authcode, [{
                            strategy: 'isNonEmpty',
                            errorMsg: '请输入验证码:3'
                        },{
                            strategy: 'isLength4',
                            errorMsg: '验证码输入错误:3'
                        }]);
                    };

                    var pwdVal = loginForm.password.value;
                    if(typeof(errorMsg) == "undefined"){
                        if(nameVal.length < 4 || $.trim(pwdVal).length < 6){
                            $('input[name="password"]').val('');
                            return "账号和密码不匹配哦~";
                        }

                        if(isValidateAuthcode && loginForm.authcode.value.trim().length != 4){
                            return "";
                        }
                        if(isValidateImgcode && loginMobile.imgcode.value.trim().length != 4){
                            return "验证码输入错误:5";
                        }
                    }
                }

                if ($(loginMobile).is(':visible')) {
                    validator.add(loginMobile.mobilephone, [{
                        strategy: 'isMobile',
                        errorMsg: '请输入正确的手机号:4'
                    }])
                    var isValidateImgcode = $(loginMobile).find('.J-input-auth').is(':visible');
                    if (isValidateImgcode) {
                        validator.add(loginMobile.imgcode, [{
                            strategy: 'isNonEmpty',
                            errorMsg: '请输入图形验证码:5'
                        },{
                            strategy: 'isLength4',
                            errorMsg: '图形验证码不正确:5'
                        }]);

                    };

                    validator.add(loginMobile.authcode, [{
                        strategy: 'isNonEmpty',
                        errorMsg: '请输入手机验证码:6'
                    }])                    
                };


                var errorMsg = validator.start();

                return errorMsg;
            }


            var smsValidateFuc = function() {

                var validator = new Validator();

                if ($(loginMobile).is(':visible')) {
                    validator.add(loginMobile.mobilephone, [{
                        strategy: 'isMobile',
                        errorMsg: '请输入正确的手机号:4'
                    }])

                    if ($(loginMobile).find('.J-input-auth').is(':visible')) {
                        validator.add(loginMobile.imgcode, [{
                            strategy: 'isNonEmpty',
                            errorMsg: '请输入图形验证码:5'
                        },{
                            strategy: 'isLength4',
                            errorMsg: '图形验证码不正确:5'
                        }]);
                    };
                };

                var errorMsg = validator.start();

                return errorMsg;
            }

            $(document).on('click', '.J-login-submit, .J-mobile-submit', function(event) {

                event.preventDefault();

                dologin();
            });
            $(".login-form").keypress(function(){
            	theEvent = window.event ? window.event
            			: arguments.callee.caller.arguments[0];
            	if (theEvent.keyCode == 13) {
            		dologin();
            	}
            });


            function dologin(){
            	$(".J-input-txt, .J-input-auth").removeClass('u-txt-err');

                $('.u-msg-wrap .msg').hide();
                
                // 验证
            	var errorMsg = validataFuc();
            	if (errorMsg) {
            		showErrorMsg(errorMsg);
            	} else {
                    // 提交用户名密码登录信息
                    if ($('#login-form').is(':visible')) {

                        var data =    'user=' + loginForm.username.value 
                                    + '&pass=' + encodeURIComponent(loginForm.password.value)
                                    + '&captcha=' + loginForm.authcode.value
                                    + '&chkRememberMe='+$("input[name='chkRememberMe']")[0].checked
                                    + '&referer=' + referer + '&CSRF_TOKEN=' + csrfToken + '&deviceId=' + deviceId;
                        
                        var doajax = $.ajax({
                            type : 'post',
                            url : basePath + 'login/clogin',
                            data : data,
                            dataType : 'json',
                            success : function(getback) {
                                clearTimeout(dotime);
                                switch (getback.ret) {
                                case 200:
                                    Util.Cookie.setALCookie();
                                    top.location.href = getback.url;
                                    break;
                                default:
                                    if(getback.isNeedCode){
                                        $('#logincaptcha').show();
										$('#logincaptchaMsg').show();
                                    } 
                                    $('input[name="authcode"]').val('');
                                    login.referscaptcha();
                                    switch (getback.ret) {
                                    case 4021:
                                    case 5023:
                                        showErrorMsg('帐号和密码不匹配哦~');
                                        $('input[name="password"]').val('');
                                        break;
                                    case 5027:
                                        //异地登录验证对话框显示 
                                        $("#JDiffLogin").show();
                                        $(".u-errmsg").hide();
                                        $("input[name='msgCode']").val('');
                                        var data = getback.data.data;
                                        var mTelObj = $(".m-tel");
                                        if(data[0] == "email"){
                                            mTelObj.find("span:eq(0)").text("已绑定邮箱");
                                            $('.JSendCode').text('获取邮箱验证码').attr('tipTxt', '获取邮箱验证码');
                                        } else {
                                            mTelObj.find("span:eq(0)").text("已绑定手机");
                                            $('.JSendCode').text('获取短信验证码').attr('tipTxt', '获取短信验证码');
                                        }
                                        mTelObj.find("span:eq(1)").text(data[1]);
                                        break;
                                    case 5025:
                                        showErrorMsg(getback.msg);
                                        // message('n', 'lock', a.msg);
                                        break;
                                    case 5026:
                                        showErrorMsg('该帐号存在安全问题');
                                        // message("n","black");
                                        break;
                                    case 4010:
                                    case 5010:
                                    case 5011:
                                    case 5012:
                                    case 5013:
                                        $('input[name="authcode"]').val('');
                                        showErrorMsg('验证码错误哦~请重新输入:3');
                                        break;
                                    default:
                                        showErrorMsg('网络失败，请刷新页面后重试');
                                        break
                                    }
                                    login.unlock();
                                    break
                                }
                            },
                            error : function(XMLHttpRequest, textStatus, errorThrown) {
                                clearTimeout(dotime);
                                $('input[name="authcode"]').val('');
                                showErrorMsg('网络失败，请刷新页面后重试');
                                login.unlock()
                            }
                        });
                    } else {
                        /**
                         * 提交手机验证登录信息
                         * loginMobile.mobilephone.value
                         * loginMobile.imgcode.value
                         * loginMobile.authcode.value
                         */
                        var data ='phone=' + loginMobile.mobilephone.value
                            + '&msg=' + loginMobile.authcode.value 
                            + '&chkRememberMe='+$("input[name='chkRememberMe']")[1].checked
                            + '&refer=' + referer + '&CSRF_TOKEN=' + csrfToken+'&deviceId=' + deviceId;
							
							if($('#logincaptchaMsg').is(':visible')){
								data+='&imgCode=' +  loginMobile.imgcode.value
							}
							
                        var url = basePath + 'login/phoneLogin';
                        var doajax = $.ajax({
                            url: url,
                            type: 'POST',
                            dataType: 'json',
                            data: data,
                            success : function(getback){
                                clearTimeout(dotime);
								
                                switch (getback.ret) {
                                    case 200:
                                        Util.Cookie.setALCookie();
                                        top.location.href = getback.url;
                                        break;
                                    default:
                                        if(getback.isNeedCode){
                                            $('#logincaptchaMsg').show();
											login.referscaptcha();
											$('#logincaptcha').show();
                                        }

                                        switch (getback.ret) {
                                            case 4021:
                                            case 5027:
                                            case 5022:
                                            case 4011:
                                                $('.J-errorMsg').text("图形验证码不正确");
                                                $('.msg-err').show();
                                                break;
                                            case 5092:
                                                $('.J-errorMsg').text("手机验证码不正确或已过期");
                                                $('.msg-err').show();
                                                break;
                                            case 5025:
                                                $('.J-errorMsg').text(getback.msg);
                                                $('.msg-err').show();
                                                break;
                                            case 5026:
                                                $('.J-errorMsg').text(getback.msg);
                                                $('.msg-err').show();
                                                // message("n","black");
                                                break;
                                            case 4010:
                                            case 5010:
                                            case 5011:
                                            case 5012:
                                            case 5013:
                                                $('input[name="authcode"]').val('');
                                                $('.J-errorMsg').text(getback.msg);
                                                $('.msg-err').show();
                                                break;
                                            default:
                                                showErrorMsg('网络失败，请刷新页面后重试');
                                                break;
                                        }
                                        login.unlock();
                                        break;
                                }
                            },
                            error : function(XMLHttpRequest, textStatus, errorThrown) {
                                clearTimeout(dotime);
                                $('input[name="authcode"], input[name="imgcode"]').val('');
                                showErrorMsg('网络失败，请刷新页面后重试');
                                login.unlock()
                            }
                        });
                        
                    };

            		   
            		login.locked();

            		var dotime = setTimeout(function() {
            			doajax.abort();
            			showErrorMsg('网络失败，请刷新页面后重试');
            			login.unlock();
            			return false
            		}, 3000000);
            	}
            }

            /**
             * 发送短信验证码
             */
            $('.J-get-code').on('click', function(event) {

                $(".J-input-txt, .J-input-auth").removeClass('u-txt-err');

                $('.u-msg-wrap .msg').hide();

                var errorMsg = smsValidateFuc();

                if(errorMsg) {
                    showErrorMsg(errorMsg);
                }else{

                    // 验证图形码是否正确
                    var url = basePath + '/dovcode/chkVcodeL';
                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'json',
                        data: {'CSRF_TOKEN': csrfToken, "captcha": loginMobile.imgcode.value},
                        success:function(data){
                            if(data.code == 200){
                                pcSendSem();
                            }else{
                                $('.J-errorMsg').text("图形验证码不正确");
                                $('.msg-err').show();
                                // 更新图形验证码
                                login.referscaptcha();
                                $(".J-input-auth").val("").focus();
                            }
                        },
                        error:function(err) {
                            /* Act on the event */
                            console.log(err);

                        }
                    });
                    // 发送短信方法
                    var self = $(this);
                    function pcSendSem(){
                        var counts = 90;
                        if (self.hasClass('z-dis')) {
                            return;
                        };
                        self.addClass('z-dis').html('<span class="J-count-num">'+counts+'秒</span>后重新获取');
                        var $num = self.find('.J-count-num').get(0);
                        countdown(counts, '秒', $num, function(){
                            self.removeClass('z-dis').html('获取验证码');
                        });
                        function countdown(count, unit, obj, callback) {
                            var intervalStr = setInterval(function() {
                                if (0 >= count) {
                                    clearInterval(intervalStr);
                                    try {
                                        callback && callback();
                                    } catch (e) {
                                        throw e;
                                    }
                                    return;
                                }
                                var countStr = --count;
                                if (count < 10) {
                                    countStr = '0' + count;
                                }
                                obj.innerHTML = countStr + unit;
                            }, 1000);
                        }
                        var url = basePath + 'common/check/pcSendSms';
                        var phoneNum = loginMobile.mobilephone.value;
                        var imgCode = loginMobile.imgcode.value;
                        var isShow = $('#logincaptchaMsg').css('display');
                        var isCheckCaptcha = '0';
                        if(isShow!='none') {
                            isCheckCaptcha = '1';
                        }
                        $.ajax({
                            type : 'post',
                            url : url,
                            data : {'CSRF_TOKEN': csrfToken,'phoneNum':phoneNum,'imgCode':imgCode,'isCheckCaptcha':isCheckCaptcha},
                            dataType : 'json',
                            success : function(data) {
                                if(data.code==100){
                                    $('.J-warnMsg').text(data.info);
                                    $('.msg-warn').show();
                                } else {
                                    $('.J-errorMsg').text(data.info);
                                    $('.msg-err').show();
                                }
                            },
                            error : function(XMLHttpRequest, textStatus, errorThrown) {
                                $(".u-errmsg").show().text('网络失败, 请刷新后重试');
                            }
                        });
                    }
                }


            });

            function showErrorMsg(errorMsg){
            	if (errorMsg) {

                    var msgError = $('.J-errorMsg');

                    var errorMsgArr = errorMsg.split(':');

                    msgError.html(errorMsgArr[0]);

                    msgError.parent().siblings('.msg').hide();

                    msgError.parent().show();

                    /*增加相应的错误样式*/
                    switch (errorMsgArr[1]) {
                        case '1':
                            $("#login-form .J-input-txt[name='username']").addClass('u-txt-err');
                            break;
                        case '2':
                            $("#login-form .J-input-txt[name='password']").addClass('u-txt-err');
                            break;
                        case '3':
                            $("#login-form .J-input-auth[name='authcode']").addClass('u-txt-err');
                            break;
                        case '4':
                            $("#login-mobile .J-input-txt[name='mobilephone']").addClass('u-txt-err');
                            break;
                        case '5':
                            $("#login-mobile .J-input-auth[name='imgcode']").addClass('u-txt-err');
                            break;
                        case '6':
                            $("#login-mobile .J-input-txt[name='authcode']").addClass('u-txt-err');
                            break;

                    }
                    return false;
                }; 
            }
        },
		
		getBannerInfo: function() {
            $.ajax({
                        type : 'post',
                        url : basePath+'gateway/getBannerInfo',
                        data : {'CSRF_TOKEN': csrfToken},
                        dataType : 'json',
                        success : function(data) {
                            $('#aBanner').attr('href',data.bannerUrl);
							$('#aBannerImg').attr('src',data.bannerImg);
                        },
                        error : function(XMLHttpRequest, textStatus, errorThrown) {
                            $(".u-errmsg").show().text('网络失败, 请刷新后重试');
                        }
                    });
        },
      
        locked: function() {
            $('input[name="username"], input[name="password"], input[name="authcode"], input[name="mobilephone"], input[name="imgcode"]')
            .attr('disabled', true);
            $('a[name="sbtbutton"]').attr('disabled', true).val('登录中，请稍等...');
        },
        unlock: function() {
            $('input[name="username"], input[name="password"], input[name="authcode"], input[name="mobilephone"], input[name="imgcode"]')
            .attr('disabled', false);
            $('a[name="sbtbutton"]').attr('disabled', false).val('登&nbsp;&nbsp;&nbsp;录');
        },
        referscaptcha: function() {
            var a = basePath + "dovcode/getVcodeL";
            $(".vcode").attr("src", a + "?t=" + (new Date).getTime());
        }
    };


    $(function() {
        login.init();
        new Fingerprint2().get(function(result, components){
        	deviceId = result;
		});
    });
})();
});
