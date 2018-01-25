<?php

namespace backend\controllers;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use yii\db\Query;//首先在开头加上这句话
use common\controllers\MyController;
/**
 * Default controller for the `admin` module
 */
class TypeController extends MyController
{
    public $enableCsrfValidation = false;
    public $layout = false;
    /**
     * Renders the index view for the module
     * @return string
     */
//    public function init()
//    {
//        parent::init();
//
//        $this->layout="mia.php";
//    }
    //分类首页
    public function actionIndex(){
        $showObj = new Query();//实例化Query查询类
        $res = $showObj->select("*")->from("lg_type")->all();
        $tree =$this-> actionSubtree($res,0,1);
     //  print_r($tree);die;
        // print_r($res);die;
       return $this->render('type-static.html',['arr'=>$tree]);
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
    //修改页面
    public function actionType_upd(){
        if($post=Yii::$app->request->post()){
            $user_id=Yii::$app->request->post('id');
          // print_r($post);die;
            unset($post['radio']);
            $res = \Yii::$app->db->createCommand()->update('lg_type', $post,"id=".$user_id)->execute();
            if($res){
                echo "<script>alert('修改成功');location.href='?r=type/index'</script>";
            }else{
                echo "<script>alert('修改失败');location.hlref='?r=type/type'</script>";
            }
        }else{
            $id=Yii::$app->request->get('id');
            $showObj = new Query();//实例化Query查询类
            $res = $showObj->select("*")->from("lg_type")->where("id=".$id)->one();
            $showObj = new Query();//实例化Query查询类
            $ast = $showObj->select("*")->from("lg_type")->all();
            $tree =$this-> actionSubtree($ast,0,1);
            return $this->render('type_upd.html',['arr'=>$res,'data'=>$tree]);
        }
    }


    //分类删除
   public function actionDel(){

       $id=Yii::$app->request->post('type_id');
     //  echo $id;die;
       $showObj = new Query();//实例化Query查询类
       $typeData = $showObj->select("*")->from("lg_type")->where("parent_id=".$id)->all();
    //  print_r($typeData);
       if($typeData)
       {
           echo 1;die;
       }
       else
       {
           $res = \Yii::$app->db->createCommand()->delete('lg_type', "id=".$id)->execute();
           if($res){
               echo 0;die;
           }
       }
    }
    //分类添加
 public function actionT_add()
 {
     if($post=Yii::$app->request->post()){
         unset($post['radio']);
         $res = \Yii::$app->db->createCommand()->insert('lg_type', $post)->execute();
         if($res){
             echo "<script>alert('添加成功');location.href='?r=type/index'</script>";
         }else{
             echo "<script>alert('添加失败');location.href='?r=type/type'</script>";
         }
     }else{
         $showObj = new Query();//实例化Query查询类
         $ast = $showObj->select("*")->from("lg_type")->all();
         $tree =$this-> actionSubtree($ast,0,1);
         return $this->render('type_add.html',['data'=>$tree]);
     }
 }



}
