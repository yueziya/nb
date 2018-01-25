<?php

/* @var $this \yii\web\View */
/* @var $content string */
  
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use frontend\assets\AppAsset;
use common\widgets\Alert;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
   <script id="allmobilize" charset="utf-8" src="js/allmobilize.min.js"></script>
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="alternate" media="handheld"  />
    <!-- end 云适配 -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta property="qc:admins" content="23635710066417756375" />
    <meta content="" name="description">
    <meta content="" name="keywords">
    <meta name="baidu-site-verification" content="QIQ6KC1oZ6" />
     
    <!-- <div class="web_root"  style="display:none">h</div> -->
    <script type="text/javascript">
      var ctx = "h";
      console.log(1);
    </script>
    <link rel="Shortcut Icon" href="h/images/favicon.ico">
    <link rel="stylesheet" type="text/css" href="css/style.css"/>
    <link rel="stylesheet" type="text/css" href="css/external.min.css"/>
    <link rel="stylesheet" type="text/css" href="css/popup.css"/>
    <script src="js/jquery.1.10.1.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/jquery.lib.min.js"></script>
    <script src="js/ajaxfileupload.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/additional-methods.js"></script>
  <!--[if lte IE 8]>
      <script type="text/javascript" src="style/js/excanvas.js"></script>
      <![endif]-->
      <script type="text/javascript">
        var youdao_conv_id = 271546; 
      </script> 
      <script type="text/javascript" src="js/conv.js"></script>
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>

<div id="body">
   
    <?php  
       use yii\web\Cookie;
        $cookie = \Yii::$app->request->cookies;
        //判断一个Cookie是否存在
        if($cookie->has('username')){
            //直接返回Cookie的值
           $user_info = $cookie->getValue('username'); //$cookie[‘smister’] 其实这样也是可以读取的

           // 查询判断此用户是否是企业用户
           $data_user = Yii::$app->db->createCommand("select * from lg_user where username='".$user_info."'")->queryOne();
           // var_dump($data_user['user_type']);die;
           // if($data_user){
              
           // }
        }else{
          $user_info = "";
        }
     ?>
      <div id="header">
        <div class="wrapper">
          <a href="index.html" class="logo">
            <img src="images/logo.png" width="229" height="43" alt="拉勾招聘-专注互联网招聘" />
          </a>
          <ul class="reset" id="navheader">
            <li class="current"><a href="?r=index/index">首页</a></li>
            <?php if($data_user['user_type'] == 1) { ?>
            <!-- <li ><a href="?r=company/index" >公司</a></li> -->
            <?php }else{ ?>

            <?php }?>
            <li ><a href="#" target="_blank">论坛</a></li>
            <?php if($data_user['user_type'] == 0): ?>
            <li ><a href="?r=resume/index" rel="nofollow">我的简历</a></li>
            <?php endif; ?>
            <?php if($data_user['user_type'] == 1): ?>
            <li ><a href="?r=company/create" rel="nofollow">发布职位</a></li>
          <?php endif; ?>
          </ul>
          <?php if($user_info==""): ?>
          <ul class="loginTop">
            <li><a href="index.php?r=login/index" rel="nofollow">登录</a></li> 
            <li>|</li>
            <li><a href="register.html" rel="nofollow">注册</a></li>
            </ul>
            <?php else: ?>
              <dl class="collapsible_menu">
              <dt>
                <span><?=$user_info?></span> 
                <span class="red dn" id="noticeDot-0"></span>
                <i></i>
              </dt>
              <?php if($data_user['user_type'] == 0): ?>
              <dd><a rel="nofollow" href="?r=resume/index">我的简历</a></dd>
              <dd><a href="?r=resume/collections">我收藏的职位</a></dd>
              <dd><a href="?r=resume/delivery">我投递的职位 <span id="noticeNo" class="red dn">(0)</span></a></dd>
              <dd class="btm"><a href="subscribe.html">我的订阅</a></dd>
              <?php else: ?>
                <dd><a href="?r=company/myindex">我的公司</a></dd>
              <dd><a href="create.html">我要招人</a></dd>
              <?php endif; ?>
              <dd><a href="accountBind.html">帐号设置</a></dd>
              <dd class="logout"><a rel="nofollow" href="?r=login/logout">退出</a></dd>
            </dl>       
           <?php endif; ?>
        </div>
      </div><!-- end #header -->
    

<?= $content ?>
</div>


<?php $this->endBody() ?>
</body>
</html>

