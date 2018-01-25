<?php

namespace backend\controllers;

use app\models\LgMember;
use Yii;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\Response;
use yii\db\Query;//首先在开头加上这句话
use yii\base\Exception;
use yii\web\NotFoundHttpException;
use common\controllers\MyController;
use yii\data\Pagination;
use app\models\FoodMember;
/**
 * Default controller for the `admin` module
 */
class DefaultController extends MyController
{
    /**
     * Renders the index view for the module
     * @return string
     */
    
    public $enableCsrfValidation = false;
    public $layout = false;
    //登陆页面
    public function actionIndex()
    {
         return $this->renderPartial('index.html');
    }

    //管理员信息
    public function actionUser_login()
    {
//        $session = Yii::$app->session;
//        $admin_name=$session['admin_user']['username'];
        $id=Yii::$app->request->get('id');
        $showObj = new Query();//实例化Query查询类
        $res = $showObj->select("*")->from("lgg_admin")->where("id='".$id."'")->one();
        if($res){
            return $this->render('form-element.html',['arr'=>$res]);
        }
    }
    //管理员添加
    public function actionUser()
    {
        if($post=Yii::$app->request->post()) {
            $post['create_time']=date("Y-m-d H:i:s");
            $post['role_id']=1;
            $post['password']=md5($post['password']);
            $res = \Yii::$app->db->createCommand()->insert('lgg_admin', $post)->execute();
            if($res){
                echo "<script>alert('添加成功');location.href='?r=home/list'</script>";
            }else{
                echo "<script>alert('添加失败');location.href='?r=home/list'</script>";
            }

        }else{
            return $this->render('element.html');
        }
    }

    //管理员修改
    public function actionGnew()
    {
         if(Yii::$app->request->post()){
             $post=Yii::$app->request->post();
             $id=Yii::$app->request->post('id');
             $post['role_id']=1;
             $post['last_time']=date("Y-m-d H:i;s");
             $res = \Yii::$app->db->createCommand()->update('lgg_admin', $post,"id=".$id)->execute();
             if($res){
                 echo "<script>alert('修改成功');location.href='?r=home/list'</script>";
             }else{
                 echo "<script>alert('修改失败');location.href='?r=default/user_login'</script>";
             }
         }
    }

    //管理员删除
    public function actionUser1_del()
    {
        $id=Yii::$app->request->get('id');
        $res = \Yii::$app->db->createCommand()->delete('lgg_admin', "id=".$id)->execute();
        if($res){
            echo "<script>alert('删除成功');location.href='?r=home/list'</script>";
        }else{
            echo "<script>alert('删除失败');location.href='?r=home/list'</script>";
        }
    }


//会员添加
    public function actionAdd_list(){

        if($post=Yii::$app->request->post()) {
       // echo 1;die;
            $post['time']=date("Y-m-d H:i:s");
            $res = \Yii::$app->db->createCommand()->insert('lg_member', $post)->execute();
            if($res){
                echo "<script>alert('添加成功');location.href='?r=default/account'</script>";
            }else{
                echo "<script>alert('修改失败');location.href='?r=default/add_list'</script>";
            }
        }else{
            return $this->render('add_list.html');
        }
    }
//会员列表
    public function actionAccount(){
      //  echo 1;die;
        // $kw = $this->get('keywords');
        
        //$showObj = new Query();//实例化Query查询类

        // $data=$arr->find()->where(['like','true_name',$kw]);
        // $pages = new Pagination(['totalCount'=>$data->count(),'pageSize'=>'5']);
        //$res = $showObj->offset($pages->offset)->limit($pages->limit)->select("*")->from("food_member")->where("status=1")->all();
        
        //$res = $showObj->select("*")->from("food_member")->where("status=1")->all();

       // print_r($res);die;
       //return $this->render('table-static.html',['arr'=>$res,'pages'=>$pages]);
       
       $model = new LgMember();
        $reach = $model::find();
        //判断搜索语句
        if($keywords = Yii::$app->request->get('name')){
             print_r($keywords);
            $reach->where(['like','true_name',$keywords]);
        }
        $pagination = new Pagination([
        'defaultPageSize' => 3,//每页显示多少
        'totalCount' => $reach->count(),//总数据数
        ]);


        $list = $reach
                    ->offset($pagination->offset)
                    ->limit($pagination->limit)
                    ->asArray()
                    ->all();
                    // echo $list->createCommand()->getRawSql();die;
        // var_dump($list);
        return $this->render('table-static.html',['arr'=>$list,
                                        'pagination'=>$pagination,
                                    ]);


       //return $this->render('table-static.html',['arr'=>$res]);
    }
//会员修改
    public function actionMember_upd(){
        // if($post=Yii::$app->request->post()){
        //     $user_id=Yii::$app->request->post('user_id');
        //     unset($post['true_name']);
        //     unset($post['user_id']);
        //     $res = \Yii::$app->db->createCommand()->update('food_member', $post,"user_id=".$user_id)->execute();
        //     if($res){
        //         echo "<script>alert('修改成功');location.href='?r=default/account'</script>";
        //     }else{
        //         echo "<script>alert('修改失败');location.href='?r=default/account'</script>";
        //     }
        // }else{
        //     $id=Yii::$app->request->get('id');
        //     $showObj = new Query();//实例化Query查询类
        //     $res = $showObj->select("user_id,true_name,mobile,contact_addr,sex,email")->from("food_member")->where("user_id=".$id)->one();
        //     // print_r($res);die;
        //     return $this->render('member_upd.html',['arr'=>$res]);
        // }
        $id=$_GET['id'];
        $model=new LgMember();
        $info=$model->find()->where(['user_id'=>"$id"])->one();
        return $this->renderPartial('member_upd.html',['arr'=>$info]);
    }
    public function actionUpdate(){
        $model=new LgMember();
        $data=$_POST;
        //print_r($id);die;
        $id=$data['user_id'];
        $true_name=$data['true_name'];
        $sex=$data['sex'];
        $mobile=$data['mobile'];
        $email=$data['email'];
        $contact_addr=$data['contact_addr'];

        $User=$model->findOne($id);
        // print_r($User);die;
        $User->true_name=$true_name;
        $User->sex=$sex;
        $User->mobile=$mobile;
        $User->email=$email;
        $User->contact_addr=$contact_addr;
        $res=$User->update();
        if($res){
            echo "<script>alert('修改成功');location.href='?r=default/account'</script>";
        }else{
            echo "<script>alert('修改失败');location.href='?r=default/account'</script>";
        }
    }
    public function actionMember_del(){
            $id=Yii::$app->request->get('id');
                $post=array(
                    'status'=>'2'
                );
             $res =  \Yii::$app->db->createCommand()->delete('lg_member', "user_id=" . $id)->execute();
            if($res){
                echo "<script>alert('删除成功');location.href='?r=default/account'</script>";
            }else{
                echo "<script>alert('删除失败');location.href='?r=default/account'</script>";
            }

    }
    public function actionFromout(){
        //   echo 1;die;
        $session = Yii::$app->session;
        if($session->remove('admin_user')){
            echo "<script>alert('退出成功');location.href='?r=home/index'</script>";
        }else{
            echo "<script>alert('退出失败');location.href='?r=default/tong'</script>";
        }
    }
    public function actionTong(){
        //   echo 1;die;
        return $this->render('chart.html');
    }


    public function actionIstong(){
        //$id=Yii::$app->request->post('id');
        $command = \Yii::$app->db->createCommand("SELECT id,name FROM food_type");
        $user_arr= $command->queryAll();
        //print_r($user_arr);die;
        $date = date("Y-m-d 00:00:00");
        $three_day = date("Y-m-d H:i:s",strtotime($date . ' -1 day'));
        $day_day = date("Y-m-d H:i:s",strtotime($date . ' +1 day'));
        $sql="SELECT COUNT(*) as sun,fd.time,ft.name,ft.id FROM food_type ft INNER JOIN food_attr_name fan
on ft.id=fan.type_id INNER JOIN food_ding fd on fd.p_id=fan.id where fd.`time`  between '$three_day' and '$date' GROUP BY ft.`name` ORDER BY ft.id ";
        $command = \Yii::$app->db->createCommand("$sql");
        $user_q= $command->queryAll();

        $command = \Yii::$app->db->createCommand("SELECT COUNT(*) as sun,fd.time,ft.name,ft.id FROM food_type ft INNER JOIN food_attr_name fan
on ft.id=fan.type_id INNER JOIN food_ding fd on fd.p_id=fan.id where fd.`time`  between '$date' and '$day_day' GROUP BY ft.`name` ORDER BY ft.id ");
        $user_day= $command->queryAll();
        foreach($user_arr as $ks=>$vs){
            $user_arr[$ks]['sun']=intval(0);
            $user_arr[$ks]['time']=0;
        }
        $users_day=$user_arr;
        //
        foreach($users_day as $k=>$v)
        {
            foreach($user_day as $key=>$val)
            {
                if($v['id'] == $val['id'])
                {
                    $users_day[$k] = $val;
                }
            }
        }
        ////////
        foreach($user_arr as $k=>$v)
        {
            foreach($user_q as $key=>$val)
            {
                if($v['id'] == $val['id'])
                {
                    $user_arr[$k] = $val;
                }
            }
        }
        $a=array();
        $s=array();
        $q_day=array();
        foreach($user_arr as $k=>$v){
            $a[]=$v['name'];
            $s[]=$v['sun'];
        }
        foreach($users_day as $k=>$v){
            $q_day[]=$v['sun'];
        }
//print_r($user_arr);die;
     echo json_encode(array('code'=>$a,'s'=>$s,'qday'=>$q_day));


//            //第二步处理成和（插件中）的数据一样

//        echo json_encode($tmp);
    }



}
