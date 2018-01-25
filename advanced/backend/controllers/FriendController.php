<?php 
namespace backend\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use yii\db\Query;//首先在开头加上这句话
use  yii\web\fileupload;
use common\controllers\MyController;


class FriendController extends Controller{

	public function init()
    {
        parent::init();
        $this->layout="mia.php";
    }
	//友链列表
	public function actionIndex(){
		$showObj = new Query();//实例化Query查询类
		// print_r($showObj);
		 $data = $showObj->from('friend')->select('*')->all();
		 // print_r($data);
		return $this->render('friend.html',['data'=>$data]);
	}
	public function actionAdd_index(){

		return $this->render('add_index.php');
	}
	public function actionAdd_friend(){
		$showObj = new Query();//实例化Query查询类
		
		$post = Yii::$app->request->post();
		$post['friend_url'] = "http://".$post['friend_url']."/";

		$res = \Yii::$app->db->createCommand()->insert('friend', $post)->execute();
		
		if($res){
			echo "<script>alert('添加成功');location.href='?r=friend/index'</script>";
		}else{
			echo "<script>alert('添加失败');location.href='?r=friend/add_friend'</script>";
		}
	}

}

 ?>