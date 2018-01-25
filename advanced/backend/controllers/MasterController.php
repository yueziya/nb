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
/**
 * Site controller
 */
class MasterController extends Controller
{
    public $enableCsrfValidation = false;
    public $layout = false;
    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
        $this->layout="mia.php";
    }

    //企业列表
    public function actionIndex()
    {

        $showObj = new Query();//实例化Query查询类
        // print_r($showObj);
        $data = $showObj->from('company')->select('*')->join('left JOIN','lg_areas','company.area_id = lg_areas.area_id')->all();
//     print_r($data);
        return $this->render('master_static.html',['data'=>$data]);
    }
    //企业添加
            public function actionT_add()
            {
                $showObj = new Query();//实例化Query查询类
                $ast = $showObj->select("*")->from("lg_type")->all();
                $tree =$this-> actionSubtree($ast,0,1);
                return $this->render('mas_add.html',['data'=>$tree]);
                // return $this->render('callback');
            }
            //添加


    public function actionWbl()
    {
        //echo 1;die;
        return $this->render('weibolist');
    }
    //删除
    public function actionMaster_del(){
        $id=Yii::$app->request->get('id');
        $res = \Yii::$app->db->createCommand()->delete('company', "company_id=".$id)->execute();
        if($res){
            echo "<script>alert('删除成功');location.href='?r=master/index'</script>";
        }else{
            echo "<script>alert('删除失败');location.href='?r=master/index'</script>";
        }
    }


    //企业编辑
    public function actionMaster_upd(){
        $id=Yii::$app->request->get('id');
        $showObj = new Query();//实例化Query查询类
        $ast = $showObj->select("*")->from("lg_type")->all();
        $name = $showObj->select("*")->from("company")->join('left JOIN','lg_areas','company.area_id = lg_areas.area_id')->where('company_id='.$id)->one();
        $tree =$this-> actionSubtree($ast,0,1);
        return $this->render('mas_upd.html',['data'=>$tree,'arr'=>$name]);
    }

    //递归树
    public function actionSubtree($arr,$id=0,$lev=1) {
        $subs = array(); // 子孙数组
        foreach($arr as $v) {
            if($v['parent_id'] == $id) {
                $v['lev'] = $lev;
                $subs[] = $v; // 举例说找到array('id'=>1,'name'=>'安徽','parent'=>0),
                $subs = array_merge($subs,$this->actionSubtree($arr,$v['id'],$lev+1));
            }
        }
        return $subs;
    }

    public function actionAdd_upd(){
        $id=Yii::$app->request->post('id');
        $post=Yii::$app->request->post();
//        print_r($post);die;
        $connection = new \yii\db\Connection([
            'dsn' => "mysql:host=127.0.0.1;dbname=ll",
             'username' => 'root',
             'password' => 'root',
        ]);
        // $res =  \Yii::$app->db->createCommand()->update('company', "company_id=".$id)->execute();

        $res = $connection->createCommand("update company set company_shenhe = ". $post['company_shenhe']. " where company_id = '$id'")->execute();
        // $res = $connection->createCommand('UPDATE post SET status=1 WHERE company_id='.$id)->execute();
        if($res){
            echo "<script>alert('审核完成');location.href='?r=master/index'</script>";
        }else{
            echo "<script>alert('审核失败');location.href='?r=master/index'</script>";
        }
    }




}
