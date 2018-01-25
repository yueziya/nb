<?php 
namespace frontend\controllers;
header('content-type:text/html;charset=utf-8');
   use yii;
   use yii\web\Controller;
   use frontend\widgets\Weibo;
   use Freedom;
   use yii\web\SaeAuth;
   use yii\web\SaeTClient;
   use yii\base\Exception;
   use yii\web\NotFoundHttpException;
   use common\models\OpenInfo;
   use common\models\User;
   use yii\web\Cookie;
   use Jami;
   /**
    * 展示页面
    * @return [type] [description]
    */
   class LoginController extends Controller
   {
   	   public $layout = false;
       public $enableCsrfValidation = false;
       public $app_key;
       public $app_secret;
       public $back_url;
       public $app_id;
       
        // 加载配置
        public function init()
        {
            $this->app_key = Yii::$app->params['weibo']['app_key'];
            $this->app_secret = Yii::$app->params['weibo']['app_secret'];
            $this->back_url = Yii::$app->params['weibo']['back_url'];
            $this->app_id = Yii::$app->params['wechat']['appid'];
        }
        public function successCallback($client)
        {
            $attributes = $client->getUserAttributes();
            var_dump($attributes);
            // 用户的信息在$attributes中，以下是您根据您的实际情况增加的代码
            // 如果您同时有QQ互联登录，新浪微博等，可以通过 $client->id 来区别。
         
        }
       /**
        * 展示页面
        */
	   public function actionIndex()
	   {
        //
	   	  $sea = new SaeAuth($this->app_key, $this->app_secret);
        $weibo_url = $sea->getAuthorizeURL( $this->back_url);
        $weixin_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx12072d2506733330&redirect_uri=http%3A%2F%2Fchenzhao.tunnel.echomod.cn%2Fphp%2F9%2Fadvanced%2Ffrontend%2Fweb%2Findex.php%3Fr%3Dwechat%2Faccesstoken&response_type=code&scope=snsapi_userinfo&state=1213#wechat_redirect";
        // var_dump($weibo_url);die;
	   	  return $this->render('index',['weibo_url'=>$weibo_url,'weixin_url'=>$weixin_url]);
	   }

     /**
      *  登录
      */
     public function actionLogin()
     {
         // 判读是否是ajax
        if(Yii::$app->request->isAjax){
          // 接值
          $data = Yii::$app->request->post();
          $password =md5($data['password']);
          $arr = Yii::$app->db->createCommand("select * from lg_user where username='".$data['email']."' ")->queryOne();
          if(!$arr){
            echo "2";die;
          }
          if($arr['user_password']==$password){
            $res=1;
          }else{
            $res=0;
          }
          if($res){
            $cookie = new Cookie();
            $cookie ->name = 'username';        //cookie的名称
            $cookie ->expire = time()+7*24*3600;     //存活的时间
            $cookie ->httpOnly = true;      //无法通过js读取cookie
            $cookie ->value = $data['email'];    //cookie的值
            \Yii::$app->response->getCookies()->add($cookie);
            echo 1;
          }else{
            echo 2;
          }
        }else{
          return $this->goHome();
        }
     }

      //  处理微博回跳后处理  回调地址。
       
	   public function actionWeiback()
	   {
	   	  $code = Yii::$app->request->get('code');
        // 获取token
        $sea = new SaeAuth( $this->app_key,$this->app_secret);
        // var_dump($sea);die;
        if($code){
          $keys = array();
          $keys['code'] = $code;
          $keys['redirect_uri'] = $this->back_url;
          try {
            $token = $sea->getAccessToken('code',$keys);
          } catch (Exception $e) {
            throw new NotFoundHttpException;
          }
        }

        // 如果获取token成功,就将其放入session存起来
        if($token){
            $session = Yii::$app->session;
            $session['token'] = [
                   'access_token' => $token['access_token'],
                   'uid' => $token['uid'],
                   'lefttime' => 24*3600,  // 一天时间
            ];
            // $this->redirect(Url::toRoute('/login/register'));
            $this->redirect('index.php?r=login/weigoin');
        }
	   }

     /**
      * 
      */
      public function actionWeigoin()
      {
        $token = Yii::$app->session->get("token");//5851975860
        //var_dump($token);die;
        $c = new SaeTClient( $this->app_key , $this->app_secret , $token['access_token'] );
         // var_dump($c);die;
        $uid_get = $c->get_uid();
        // var_dump($uid_get);die;
        $uid = $uid_get['uid'];  // 5410632577
        // 查询如果存在，则说明用户已经绑定账号，直接自动登录
        $open = new OpenInfo();
        // var_dump($open);die;
       $open_user = $open->findOne(['open_id'=>$uid , 'type'=>'1']); // 其中 type = 1 代表微博。
      if($open_user){

        // 当open_info信息存在，则直接取其user_id去用户表查询用户信息
        
        $data = Yii::$app->db->createCommand("select * from lg_user where user_id=".$open_user['user_id'])->queryOne();
        // var_dump($data['username']);die;
        // 将信息存入cookie
        // $cookies=Yii::$app->response->cookies;
        // $cookie_data=array('name'=>'username','value'=>$open_user['nickname']);
        // $cookies->add(new Cookie($cookie_data));
        //第一种方法
        $cookie = new Cookie();
        $cookie ->name = 'username';        //cookie的名称
        $cookie ->expire = time() + 3600;     //存活的时间
        $cookie ->httpOnly = true;      //无法通过js读取cookie
        $cookie ->value = $data['username'];    //cookie的值
        \Yii::$app->response->getCookies()->add($cookie);
        return $this->redirect('?r=index/index');
      }
     //如果没有绑定，我们获取用户基本信息，展示用户补全信息表单，填写绑定账号。
      // else{
      //    $user_message = $c->show_user_by_id($uid);//根据ID获取用户等基本信息
      //    //var_dump($user_message);die;
      //   Yii::$app->db->createCommand()->insert('lg_user',[
      //       'username'=>$user_message['name'],
      //       'last_time'=>time(),
      //       ])->execute(); 
      //   $user_id=Yii::$app->db->getLastInsertID();
      //   $openinfo= new OpenInfo();
      //   $openinfo->open_id=$uid;
      //   $openinfo->user_id=$user_id;
      //   $openinfo->nickname=$user_message['name'];
      //   $openinfo->type='1';
      //   $openinfo->create_time=time();
      //   $openinfo->save();

      //   $cookies=Yii::$app->response->cookies;
      //   $cookie_data=array('name'=>'username','value'=>$user_message['name']);
      //   $cookies->add(new Cookie($cookie_data));
      //   return $this->redirect('?r=index/index');
      //   }
        $user_message = $c->show_user_by_id($uid);//根据ID获取用户等基本信息
        var_dump($user_message);die;
         return $this->render('new',['info'=>$user_message]);
      }

      /**
       *  退出
       */
      public function actionLogout() 
      {  
        $cookie = Yii::$app->request->cookies->get('username');

      //移除一个Cookie对象
      \Yii::$app->response->getCookies()->remove($cookie);
      $session = \Yii::$app->session;

      //删除所有session
      $session->removeAll();
       return $this->redirect('?r=login/index');  
      }  

      /**
       * 账号绑定、注册账号
       */
      public function actionLogindo()
      {
           // 判断是否是post
           if(Yii::$app->request->isAjax){
            // echo 1;die;
             $data = Yii::$app->request->post();
             $res = Yii::$app->db->createCommand()->insert('lg_user',[
               'username' => $data['username'],
               'user_password'=> md5($data['password']),
               'user_email' => $data['email'],
               'last_time' => time()
              ])->execute();

             $user_id = Yii::$app->db->getLastInsertID(); // 获取用户id
             // 添加第三方表
               $res = Yii::$app->db->createCommand()->insert('lg_open_info',[
               'open_id' => $data['open_id'],
               'user_id'=> $user_id,
               'nickname' => $data['nickname'],
               'type' => 1,
               'create_time'=> time(),
              ])->execute();
               if($res){
                  // 将信息存入cookie
                $cookie = new Cookie();
                $cookie ->name = 'username';        //cookie的名称
                $cookie ->expire = time() + 3600;     //存活的时间
                $cookie ->httpOnly = true;      //无法通过js读取cookie
                $cookie ->value = $data['username'];    //cookie的值
                \Yii::$app->response->getCookies()->add($cookie);
                echo 1;
               }else{
                 echo 2;
               }
              
           }else{
              return $this->render('new');  
           }
      }
      
      public function actionRegister()
      {

         if(Yii::$app->request->isAjax){
          $data = Yii::$app->request->post();

         $only = Yii::$app->db->createCommand("select * from lg_user where username='".$data['username']."'")->queryOne();
           if($only){
              echo "1";die;
           }

         $password=md5($data['password']);

          // var_dump($password);die;
          if($data['type'] == 0){
             $type = 0;
          }else{
             $type = 1;
          }
          $res = Yii::$app->db->createCommand()->insert('lg_user',[
               'username' => $data['username'],
               'user_password'=> $password,
               'user_email' => $data['email'],
               'user_type' => $type,
               'last_time' => time()
              ])->execute();

          if($res){
            echo 2;die;
          }else{
            echo 0;die;
          }


         }else{
             $sea = new SaeAuth($this->app_key, $this->app_secret);
            $weibo_url = $sea->getAuthorizeURL( $this->back_url);
            // var_dump($weibo_url);die;
            return $this->render('register',['weibo_url'=>$weibo_url]);
         }        
      }
   }
?>