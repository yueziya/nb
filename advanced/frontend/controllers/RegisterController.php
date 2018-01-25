<?php 
   
   namespace frontend\controllers;

   use yii;
   use yii\web\Controller;
   use frontend\widgets\Weibo;
   use yii\web\SaeAuth;
   use yii\web\SaeTClient;
   use yii\base\Exception;
   use yii\web\NotFoundHttpException;
   /**
    * 展示页面
    * @return [type] [description]
    */
   class RegisterController extends Controller
   {
   	   public $layout = "empty";
       public $app_key;
       public $app_secret;
       public $back_url;
       
        // 加载配置
        public function init()
        {
            $this->app_key = Yii::$app->params['weibo']['app_key'];
            $this->app_secret = Yii::$app->params['weibo']['app_secret'];
            $this->back_url = Yii::$app->params['weibo']['back_url'];
        }
     /**
      * 
      */
      public function actionIndex()
      {
        $token = Yii::$app->session->get("token");
        $c = new SaeTClient( $this->app_key , $this->app_secret , $token['access_token'] );
        // var_dump($c);die;
        $uid_get = $c->get_uid();
        $uid = $uid_get['uid'];
        // var_dump($uid);die;
        $user_message = $c->show_user_by_id($uid);//根据ID获取用户等基本信息
        //var_dump($user_message);die;
        // return $this->render('completeInfo',['info'=>$user_message]);
      }
   }
?>