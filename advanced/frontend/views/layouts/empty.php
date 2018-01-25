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



<?= $content ?>
</div>



<?php $this->endBody() ?>
</body>
</html>
