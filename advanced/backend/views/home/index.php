<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="csrf-param" content="_csrf-backend">
    <meta name="csrf-token" content="_eVOoWEgQg-HsMUjbf1jQ5_Z9HOBmyE_BCiZt9d54LjqsxGGejggw945v0GNaH5jAhZUE9PHrT7YCj8FUsWoEA==">
    <title></title>
    <link href="css/in.css" rel="stylesheet">
    <link href="css/signin.css" rel="stylesheet">
    <link href="css/elements.css" rel="stylesheet">
</head>
<body>
<style type="text/css">
    .linear {
        width:100%;
        height:760px;
        FILTER: progid: DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #b8c4cb, endColorStr = #f6f6f8); /*IE 6 7 8*/
        background: -ms-linear-gradient(top, #fff, #ff6cd1); /* IE 10 */
        background: -moz-linear-gradient(top, #b8c4cb, #4658f8); /*火狐*/
        background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#47cb59), to(#f6f6f8)); /*谷歌*/
        background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#91ff62)); /* Safari 4-5, Chrome 1-9*/
        background:url("images/3.jpg") no-repeat; /*Safari5.1 Chrome 10+*/
        background-size:100%;
        background: -o-linear-gradient(top, #fff, #59e6ff);
    }
    .linears {
        font-family: 微软雅黑;
        font-size: 24px;
    }
</style>
<div class="linear">
    <div class="row-fluid login-wrapper">
        <form id="w0" action="?r=home/adlogin" method="post" role="form">
            <input type="hidden" name="_csrf" value="VGVVTVVZb0UmKzIrLWtCL2VdNB0tLxoQJVU0AQA6JzMwIgQ0Zy0sNw==">
            <div class="span4 box">
                <div class="content-wrap">
                    <h6>后台管理</h6>
                    <div class="form-group field-admin-adminuser">
                        <p class="help-block help-block-error"></p>
                        <input type="text" id="admin-adminuser" class="span12" name="admin_name" placeholder="管理员账号"></div>
                    <div class="form-group field-admin-adminpass">
                        <p class="help-block help-block-error"></p>
                        <input type="password" id="admin-adminpass" class="span12" name="password" placeholder="管理员密码"></div>
                    <div class="form-group field-remember-me">
                        <div class="remember">
                            <input type="hidden" name="Admin[rememberMe]" value="0">
                        </div>
                        <button type="submit" class="btn-glow primary login">登录</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</body>
</html>