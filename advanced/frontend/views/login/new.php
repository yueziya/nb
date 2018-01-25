<!DOCTYPE HTML>
<html>
<head>
<script id="allmobilize" charset="utf-8" src="style/js/allmobilize.min.js"></script>
<meta http-equiv="Cache-Control" content="no-siteapp" />
<link rel="alternate" media="handheld"  />
<!-- end 云适配 -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>登录-拉勾网-最专业的互联网招聘平台</title>
<meta property="qc:admins" content="23635710066417756375" />
<meta content="拉勾网是3W旗下的互联网领域垂直招聘网站,互联网职业机会尽在拉勾网" name="description">
<meta content="拉勾,拉勾网,拉勾招聘,拉钩, 拉钩网 ,互联网招聘,拉勾互联网招聘, 移动互联网招聘, 垂直互联网招聘, 微信招聘, 微博招聘, 拉勾官网, 拉勾百科,跳槽, 高薪职位, 互联网圈子, IT招聘, 职场招聘, 猎头招聘,O2O招聘, LBS招聘, 社交招聘, 校园招聘, 校招,社会招聘,社招" name="keywords">

<meta name="baidu-site-verification" content="QIQ6KC1oZ6" />

<!-- <div class="web_root"  style="display:none">h</div> -->
<script type="text/javascript">
var ctx = "h";
console.log(1);
</script>
<link rel="Shortcut Icon" href="h/images/favicon.ico">
<link rel="stylesheet" type="text/css" href="style/css/style.css"/>

<script src="style/js/jquery.1.10.1.min.js" type="text/javascript"></script>

<script type="text/javascript" src="style/js/jquery.lib.min.js"></script>
<script type="text/javascript" src="style/js/core.min.js"></script>


<script type="text/javascript">
var youdao_conv_id = 271546; 
</script> 
<script type="text/javascript" src="style/js/conv.js"></script>
</head>

<body id="login_bg">
	<div class="login_wrapper">
        
    	<input type="hidden" id="resubmitToken" value="" />		
		 <div class="login_box">
		 <label for="user_NoAccount" class="checked" value="0" id="user_NoAccount">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建一个拉勾帐号，并绑定你现在登录的<span class="oauthTypeClass">新浪微博</span></label>
                    <p>绑定后，使用<span class="oauthTypeClass">新浪微博</span>或者拉勾帐号均可以登录到你现有的帐号。</p><hr>
        	<form id="loginForm" action="?r=login/bang">
        	     <input type="hidden" id="open_id" name="open_id" value="<?php echo $info['idstr']; ?>" tabindex="1" placeholder="拉勾名称" />
				<input type="text" id="username" name="username" value="" tabindex="1" placeholder="拉勾名称" />
				<input type="text" id="email" name="email" value="" tabindex="2" placeholder="邮箱" />
			  	<input type="password" id="password" name="password" tabindex="3" placeholder="请输入密码" />
				<span class="error" style="display:none;" id="beError"></span>
                  <input name="_csrf" type="hidden" id="_csrf" value="<?= Yii::$app->request->csrfToken ?>">
                  <input type="hidden" id="nickname" value="<?php echo $info['screen_name']; ?>">
			    
				<input type="submit" id="submitLogin" class="submitLogin" value="登 &nbsp; &nbsp; 录" />
				<!-- <a style="color:#fff;" class="submitLogin" title="绑 &nbsp; &nbsp; 定"/>确认绑定</a> -->

			     
			    <input type="hidden" id="callback" name="callback" value=""/>
                <input type="hidden" id="authType" name="authType" value=""/>
                <input type="hidden" id="signature" name="signature" value=""/>
                <input type="hidden" id="timestamp" name="timestamp" value=""/>
			</form>
			<div class="login_right">
				<div><?php echo $info['screen_name']; ?></div>
				<a  href="register.html"  class="registor_now"><img src="<?php echo $info['avatar_hd']; ?>" width="100"></a>
			</div>
        </div>
        <div class="login_box_btm"></div>
    </div>

<script type="text/javascript">
$(function(){
	//验证表单
	 	$("#loginForm").validate({
	 		/* onkeyup: false,
	    	focusCleanup:true, */
	        rules: {
	        	username: {
	    	   		required: true,
	    	   	},
	    	   	email: {
	    	    	required: true,
	    	    	email: true
	    	   	},   	
	    	   	password: {
	    	    	required: true
	    	   	}
	    	},
	    	messages: {
	    		username: {
	    	   	    required: "请证明你不是机器人",
	    	   	},
	    	   	email: {
	    	    	required: "请输入登录邮箱地址",
	    	    	email: "请输入有效的邮箱地址，如：vivi@lagou.com"
	    	   	},  
	    	   	password: {
	    	    	required: "请输入密码"
	    	   	}
	    	},
	    	submitHandler:function(form){
	    		if($('#remember').prop("checked")){
	      			$('#remember').val(1);
	      		}else{
	      			$('#remember').val(null);
	      		}
	    		var open_id = $('#open_id').val();
	    		var password = $('#password').val();
	    		var username = $('#username').val();
	    		
	    		var nickname = $('#nickname').val();
	    		var email = $('#email').val();
	    		var signature = $('#signature').val();
	    		var timestamp = $('#timestamp').val();
	    		
	    		$(form).find(":submit").attr("disabled", true);
	            $.ajax({
	            	type:'post',
	            	data:{open_id:open_id,password:password,username:username,nickname:nickname,email:email},
	            	url:'?r=login/logindo'
	            }).done(function(result) {
	            	// alert(result);
	            	if(result == 1){
	            	   window.location.href='?r=index/index';
	            	}else{
	            		alert('输入有误！')
	            	}
					// if(result.success){
					//  	if(result.content.loginToUrl){
					// 		window.location.href=result.content.loginToUrl;
	    //         		}else{
	    //         			window.location.href=ctx+'/index.php';
	    //         		} 
					// }else{
					// 	$('#beError').text(result.msg).show();
					// }
					// $(form).find(":submit").attr("disabled", false);
	            }); 
	        }  
		});
})
</script>
</body>
</html>