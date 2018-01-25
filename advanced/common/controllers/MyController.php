<?php
namespace common\controllers;
use Yii;
use yii\web\Controller;

class MyController extends Controller
{
    public function init()
    {
        parent::init();
     //   $this->layout="mia.php";
        $session = Yii::$app->session;
        if(!isset($session['admin_user']['username'])){
            echo "<script>alert('请重新登陆');location.href='?r=home/index'</script>";die;
        }
    }
}

/***************前台基类控制器  begin***************************/
class HController extends Controller
{
    public $name;
    public function init()
    {
        parent::init();
       // $this->layout="mia.php";
        $session = Yii::$app->session;
        //print_r($session['user']['username']);die;
        if(!empty($session['user'])){
            $this->name=$session['user']['username'];
            //   print_r($session['user']['username']);die;
        }else{
            $this->name="";
        }
    }
}
?>