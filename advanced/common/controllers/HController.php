<?php
namespace common\controllers;
use Yii;
use yii\web\Controller;
/***************前台基类控制器  begin***************************/
class HController extends Controller
{
    public $name;
    public function init(){
        parent::init();
   //     $this->layout="mia.php";
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