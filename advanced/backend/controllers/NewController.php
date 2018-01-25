<?php

namespace backend\controllers;

use Yii;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\Response;
use yii\db\Query;//首先在开头加上这句话
use yii\base\Exception;
use yii\web\NotFoundHttpException;
use yii\web\Controller;
use yii\web\fileupload;
use common\controllers\MyController;

/**
 * Default controller for the `admin` module
 */
class NewController extends Controller
{
    public $enableCsrfValidation = false;
    public $layout = false;
    public function init(){
       $this->layout="mia.php";
    }
    //主页
    public function actionIndex(){
        $command = \Yii::$app->db->createCommand("SELECT * FROM news_type ");
        $user_arr= $command->queryAll();
        if($type_id= Yii::$app->request->get('type_id')){
            $command = \Yii::$app->db->createCommand("SELECT * FROM news_con where type_id=$type_id ");
            $type_arr= $command->queryAll();
        }else{
            $command = \Yii::$app->db->createCommand("SELECT * FROM news_con where type_id=1 ");
            $type_arr= $command->queryAll();

        }
        return $this->render('index.htm',['user_arr'=>$user_arr,'type_arr'=>$type_arr]);
    }
    public function actionZan(){

        $type_id= Yii::$app->request->get('type_id');
        $news_con= Yii::$app->request->get('zan');
        $command = \Yii::$app->db->createCommand("SELECT * FROM news_con where id=$type_id ");
        $type_arr= $command->queryOne();
        if(empty($type_arr)){
            echo json_encode(2);//失败
        }else{
            $post=array(
                'zan'=>$news_con
            );
            $res =  \Yii::$app->db->createCommand()->update('news_con', $post,["id" => $type_id])->execute();
            if($res){
                echo json_encode(1);//成功
            }
        }
    }
    //详情
    public function actionLists(){
        $id= Yii::$app->request->get('id');
        $command = \Yii::$app->db->createCommand("SELECT * FROM news_con where id=$id ");
        $user_arr= $command->queryOne();
        $is_shi = \Yii::$app->db->createCommand("SELECT * FROM news_ping where con_id=$id ORDER BY is_zan desc limit 2 ");
        $is_arr= $is_shi->queryAll();
        $is_time = \Yii::$app->db->createCommand("SELECT * FROM news_ping where con_id=$id ORDER BY time desc limit 2 ");
        $z_time= $is_time->queryAll();
       // print_r($z_time);die;
        return $this->render('lists.htm',['user_arr'=>$user_arr,'is_arr'=>$is_arr,'z_time'=>$z_time]);
    }
    public function  actionType(){
       if($post = Yii::$app->request->post()){
           $res = \Yii::$app->db->createCommand()->insert('news_type', $post)->execute();
           if($res){
               echo "<script>alert('添加成功');location.href='?r=new/con'</script>";
           }else{
               echo "<script>alert('添加失败');location.href='?r=new/type'</script>";
           }
       }else{
           return $this->render('type');
       }
    }
    public function  actionPinglun(){
        $type_id= Yii::$app->request->post('type_id');
        $text= Yii::$app->request->post('text');
        $post=array(
            'con_id'=>$type_id,
            'user'=>'张三',
            'text'=>$text,
            'time'=>time(),
            'is_zan'=>0,
        );
        $res = \Yii::$app->db->createCommand()->insert('news_ping', $post)->execute();
        if($res){
            echo json_encode(1);
        }else{
            echo json_encode(2);
        }
    }
    public function  actionDianzan(){
        $type_id= Yii::$app->request->post('type_id');
        $text= Yii::$app->request->post('sum');
    }


    public function  actionCon(){
        if($post = Yii::$app->request->post()){
            $up = new fileupload();
            //设置属性（上传的位置、大小、类型、设置文件名是否要随机生成）
            $up->set("path","./uploads/img");
            $up->set("maxsize",2000000); //kb
            $up->set("allowtype",array("gif","png","jpg","jpeg"));//可以是"doc"、"docx"、"xls"、"xlsx"、"csv"和"txt"等文件，注意设置其文件大小
            $up->set("israndname",true);
            $post=Yii::$app->request->post();
            if($up->upload("img")){
                $post['img']=$up->getFileName();
            }else{
                echo '<pre>';
            }
            $post['time']=time();
          //  print_r($post);die;
            $res = \Yii::$app->db->createCommand()->insert('news_con', $post)->execute();
            if($res){
                echo "<script>alert('添加成功');location.href='?r=new/index'</script>";
            }else{
                echo "<script>alert('添加失败');location.href='?r=new/type'</script>";
            }
        }else{
            $command = \Yii::$app->db->createCommand("SELECT * FROM news_type ");
            $user_arr= $command->queryAll();
            //print_r($user_arr);die;
            return $this->render('content',['user_arr'=>$user_arr]);
        }
    }
}
