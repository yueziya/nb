<?php
namespace backend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\Response;
use yii\web\SaeAuth;
use yii\web\SaeTClientV2;
use yii\base\Exception;
use yii\web\NotFoundHttpException;
use yii\db\Query;//首先在开头加上这句话
use  yii\web\fileupload;

/**
 * Site controller
 */
class HomeController extends Controller
{
    /**
     * @inheritdoc
     */
   public function init()
    {
        parent::init();
        $this->layout="mia.php";
    }

//后台登陆
    public function actionIndex(){
       return $this->render('index');
    }
    //后台登陆
    public function actionList(){
        $showObj = new Query();//实例化Query查询类
        $res = $showObj->select("*")->from("lgg_admin")->all();
        $data=$showObj->select("*")->from("lgg_admin")->where('id=1')->all();
        unset($res[0]);
     //   print_r($res);die;
        return $this->render('table-dynamic.html',['arr'=>$res,'data'=>$data]);
    }


     //登陆成功
    public function actionAdlogin(){
        $session = Yii::$app->session;
        $admin_name = Yii::$app->request->post('admin_name');
        $password   = Yii::$app->request->post('password');
        $password=md5($password);
        $showObj = new Query();//实例化Query查询类
        $res = $showObj->select("*")->from("lgg_admin")->where("admin_name='".$admin_name."' and  password='".$password."' ")->one();
        if($res){
            $session['admin_user'] = [
                'username'=>$res['admin_name'],
                'id'=>$res['id'],
                'lifetime'=> 24*3600 // 这里我设置了一天，你们可以自己设置合适时间
            ];
            echo "<script>alert('登陆成功');location.href='?r=default/index'</script>";
        }else{
            echo "<script>alert('登陆失败');location.href='?r=home/index'</script>";
        }
    }



}
