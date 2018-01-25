<?php 
 
 namespace frontend\controllers;
 header('content-type:text/html;charset=utf-8');
 use yii;
 use yii\web\Controller;
 use yii\web\Cookie;
 use frontend\models\Lg_resume;
 use Curl;
 /**
 *   简历模块
 */
 class ResumeController extends Controller
 {
 	 public $enableCsrfValidation = false; // 防止csrf攻击
 	 public $layout = "newlayout";
   // public $layout = false;
 	/**
 	 *  展示简历页面
 	 */
 	public function actionIndex()
 	{
       $layout = "newlayout";
        $cookie = \Yii::$app->request->cookies;
        //判断一个Cookie是否存在
        if(!$cookie->has('username')){
            //直接返回Cookie的值
          return $this->redirect('?r=login/index');
        }
         // 获取用户信息
         $cookie = Yii::$app->request->cookies;

         $username = $cookie->getValue('username');
         $data = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();

        $userInfo = Yii::$app->db->createCommand("select * from lg_resume where user_id=".$data['user_id'])->queryOne();
        $lg_expect=Yii::$app->db->createCommand("select * from lg_expect where user_id=".$data['user_id'])->queryOne();
        // var_dump($lg_expect);die;
        $lg_project=Yii::$app->db->createCommand("select *from lg_projectexperience where user_id=".$data['user_id'])->queryOne();
        //var_dump($lg_project);die;
        $lg_education=Yii::$app->db->createCommand("select *from lg_educationalbackground where user_id=".$data['user_id'])->queryOne();
        $lg_textarea=Yii::$app->db->createCommand("select *from lg_textarea where user_id=".$data['user_id'])->queryOne();
        $lg_worklink=Yii::$app->db->createCommand("select *from lg_worklink where user_id=".$data['user_id'])->queryOne();
        $lg_experience=Yii::$app->db->createCommand("select *from lg_experience where user_id=".$data['user_id'])->queryOne();

       return $this->render('index',['info'=>$userInfo,'expect'=>$lg_expect,'project'=>$lg_project,'education'=>$lg_education,'textarea'=>$lg_textarea,'work_link'=>$lg_worklink,'experience'=>$lg_experience,'username'=>$username,'data'=>$data]);
 	}
    
      //期望工作
      public function actionExpect(){
          $data = Yii::$app->request->post();
          $arrr=Yii::$app->db->createCommand("select * from lg_expect where user_id='".$data['user_id']."'")->queryOne();
          if(!empty($arrr)){
            $sql="UPDATE `lg_expect` SET `expectCity`='".$data['expectCity']."', `current`='".$data['current']."', `expectPosition`='".$data['expectPosition']."', `expectSalary`='".$data['expectSalary']."' WHERE (`user_id`='".$data['user_id']."')";
            $command=Yii::$app->db->createCommand($sql);
            $command->execute();
            echo json_encode("修改成功");
          }else{
            $sql="INSERT INTO `lg_expect` ( `expectCity`, `expectSalary`,`expectPosition`,`user_id`,`current`) VALUES ";
            $data="('".implode("','", $data)."')";
            $sql=$sql.$data;
            $command=Yii::$app->db->createCommand($sql);
            $command->execute();
            echo json_encode("保存成功");
          }
      }
      //工作经历
      public function actionExprience(){
          $data = Yii::$app->request->post();
          $arrr=Yii::$app->db->createCommand("select * from lg_experience where user_id='".$data['user_id']."'")->queryOne();
          if(!empty($arrr)){
            $sql="UPDATE `lg_experience` SET `companyName`='".$data['companyName']."', `positionName`='".$data['positionName']."', `YearStart`='".$data['YearStart']."', `MonthStart`='".$data['MonthStart']."', `YearEnd`='".$data['YearEnd']."', `MonthEnd`='".$data['MonthEnd']."' WHERE (`user_id`='".$data['user_id']."')";
            $command=Yii::$app->db->createCommand($sql);
            $command->execute();
            echo json_encode("修改成功");
          }else{
            $sql="INSERT INTO `lg_experience` ( `companyName`, `positionName`,`user_id`,`YearStart`,`MonthStart`,`YearEnd`,`MonthEnd`) VALUES ";
            $data="('".implode("','", $data)."')";
            $sql=$sql.$data;
            $command=Yii::$app->db->createCommand($sql);
            $command->execute();
            echo json_encode("保存成功");
          }
      }
      //项目经验
      public function actionProjectexprience(){
          $data = Yii::$app->request->post();
          $arrr=Yii::$app->db->createCommand("select * from lg_projectExperience where user_id='".$data['user_id']."'")->queryOne();
          if(!empty($arrr)){
            $sql="UPDATE `lg_projectExperience` SET `projectName`='".$data['projectName']."', `thePost`='".$data['thePost']."', `YearStart`='".$data['YearStart']."', `MonthStart`='".$data['MonthStart']."', `YearEnd`='".$data['YearEnd']."', `MonthEnd`='".$data['MonthEnd']."', `projectDescription`='".$data['projectDescription']."' WHERE (`user_id`='".$data['user_id']."')";
            $command=Yii::$app->db->createCommand($sql);
            $command->execute();
            echo json_encode("修改成功");
          }else{
            $sql="INSERT INTO `lg_projectExperience` ( `projectName`, `thePost`,`user_id`,`YearStart`,`MonthStart`,`YearEnd`,`MonthEnd`,`projectDescription`) VALUES ";
            $data="('".implode("','", $data)."')";
            $sql=$sql.$data;
            $command=Yii::$app->db->createCommand($sql);
            $command->execute();
            echo json_encode("保存成功");
          }
      }
      //教育背景
      public function actionEducational(){
          $data = Yii::$app->request->post();
          $arrr=Yii::$app->db->createCommand("select * from lg_educationalBackground where user_id='".$data['user_id']."'")->queryOne();
          if(!empty($arrr)){
            $sql="UPDATE `lg_educationalBackground` SET `schoolName`='".$data['schoolName']."', `degree`='".$data['degree']."', `user_id`='".$data['user_id']."', `professionalName`='".$data['professionalName']."', `schoolYearEnd`='".$data['schoolYearEnd']."', `schoolYearStart`='".$data['schoolYearStart']."' WHERE (`user_id`='".$data['user_id']."')";
            $command=Yii::$app->db->createCommand($sql);
            $command->execute();
            echo json_encode("修改成功");
          }else{
            $sql="INSERT INTO `lg_educationalBackground` ( `schoolName`, `degree`,`user_id`,`professionalName`,`schoolYearEnd`,`schoolYearStart`) VALUES ";
            $data="('".implode("','", $data)."')";
            $sql=$sql.$data;
            $command=Yii::$app->db->createCommand($sql);
            $command->execute();
            echo json_encode("保存成功");
          }
      }
      //自我描述
      public function actionWord_count(){
          
          $data = Yii::$app->request->post();
          $arrr=Yii::$app->db->createCommand("select * from lg_textarea where user_id='".$data['user_id']."'")->queryOne();
          
          if(!empty($arrr)){
            $sql="UPDATE `lg_textarea` SET `selfDescription`='".$data['content']."' WHERE (`user_id`='".$data['user_id']."')";
            $command=Yii::$app->db->createCommand($sql);
            $command->execute();
            echo json_encode("修改成功");
          }else{
            $sql="INSERT INTO `lg_textarea` (`selfDescription`,`user_id`) VALUES ";
            $data="('".implode("','", $data)."')";
            $sql=$sql.$data;
            $command=Yii::$app->db->createCommand($sql);
            $command->execute();
            echo json_encode("保存成功");
          }
      }
      //作品展示
      public function actionWorklink(){
          $data = Yii::$app->request->post();
          $arrr=Yii::$app->db->createCommand("select * from lg_worklink where user_id='".$data['user_id']."'")->queryOne();
          if(!empty($arrr)){
            $sql="UPDATE `lg_worklink` SET `worklink`='".$data['worklink']."', `user_id`='".$data['user_id']."', `s_textarea`='".$data['s_textarea']."' WHERE (`user_id`='".$data['user_id']."')";
            $command=Yii::$app->db->createCommand($sql);
            $command->execute();
            echo json_encode("修改成功");
          }else{
            $sql="INSERT INTO `lg_worklink` ( `worklink`, `s_textarea`,`user_id`) VALUES ";
            $data="('".implode("','", $data)."')";
            $sql=$sql.$data;
            $command=Yii::$app->db->createCommand($sql);
            $command->execute();
            echo json_encode("保存成功");
          }
      }
      //基本信息修改
      public function actionBtn_profile_save(){
          $data = Yii::$app->request->post();
          // var_dump($data);die;
          $arrr=Yii::$app->db->createCommand("select * from lg_resume where id='".$data['user_id']."'")->queryOne();
          if(!empty($arrr)){
            // echo 1;die;
            $sql="UPDATE `lg_resume` SET `real_name`='".$data['name']."', `sex`='".$data['sex']."', `topDegree`='".$data['education']."', `workyear`='".$data['education_year']."', `email`='".$data['email']."', `tel`='".$data['tell']."', `currentState`='".$data['currentState']."' WHERE (`user_id`='".$data['user_id']."')";
            $command=Yii::$app->db->createCommand($sql);
            $command->execute();
            echo json_encode("修改成功");
          }else{
            // echo 2;die;
            $res = Yii::$app->db->createCommand()->insert('lg_resume',[
                 'user_id' => $data['user_id'],
                 'real_name'=> $data['name'],
                 'sex' => $data['sex'],
                 'topDegree' => $data['education'],
                 'workyear' => $data['education_year'],
                 'tel' => $data['tell'],
                 'email'=> $data['email'],
                 'currentState' => $data['currentState']
                ])->execute();
            if($res){
            echo json_encode("保存成功");
            }
          }
      }

      // 预览简历
      
      public function actionPreview()
      {
          $layout = false;
          // 获取用户信息
          // $user =  $this->actionGetuserinfo();
           // 获取用户信息
          $cookie = Yii::$app->request->cookies;
          $username =  $cookie->getValue('username');
          $user = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();
          
          // 基本信息
          $resume = Yii::$app->db->createCommand("select * from lg_resume where user_id='".$user['user_id']."'")->queryOne();

          // 期望工作
          $expect = Yii::$app->db->createCommand("select * from lg_expect where user_id='".$user['user_id']."'")->queryOne();

          // 工作经历
          $experience = Yii::$app->db->createCommand("select * from lg_experience where user_id='".$user['user_id']."'")->queryOne();

          // 项目经验
          $projectExperience = Yii::$app->db->createCommand("select * from lg_projectExperience where user_id='".$user['user_id']."'")->queryOne();

          // 教育背景
          $educationalBackground = Yii::$app->db->createCommand("select * from lg_educationalBackground where user_id='".$user['user_id']."'")->queryOne();

          // 自我描述
          $textarea = Yii::$app->db->createCommand("select * from lg_textarea where user_id='".$user['user_id']."'")->queryOne();

          // 作品展示
          $worklink = Yii::$app->db->createCommand("select * from lg_worklink where user_id='".$user['user_id']."'")->queryOne();
          
          // 数组合并
          // $data = array_merge($resume,$expect,$experience,$projectExperience,$educationalBackground,$textarea,$worklink);
          // var_dump($data);die;
          // return $this->render('preview',['data'=>$data,'user'=>$user]);
          return $this->render('preview',['user'=>$user,'resume'=>$resume,'expect'=>$expect,'experience'=>$experience,'projectExperience'=>$projectExperience,'educationalBackground'=>$educationalBackground,'textarea'=>$textarea,'worklink'=>$worklink]);
      }

      //  获取用户信息
      public function actionGetuserinfo()
      {
         // 获取用户信息
          $cookie = Yii::$app->request->cookies;
          $username =  $cookie->getValue('username');
          $data = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();
          
          return $data;
      }


      // 导出
      public function actionExport()
      {
          // 接收导出类型
          $type = $_GET['type'];

          switch ($type) {
            case '1': $this->actionWord();break;
            case '2': $this->actionHtml();break;
            default:die("暂时还不能生成此格式");break;
          }
      }

      // word格式
      public function actionWord()
      {
          $layout = false;
          // 获取用户的信息
          $user = $this->actionGetuserinfo();
          // var_dump($user);die;
          $path_cookie = dirname(__FILE__).'/text';
         $url = 'http://www.yii.com/index.php?r=resume/preview';
         // $curl = new Curl();
         // $result = $curl->get_content($url);
         // 初始化
         $ch = curl_init();
         // 设置选项，包括url
         curl_setopt($ch, CURLOPT_URL, $url);
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
         // 使用提交后的得到cookie数据做参数
         curl_setopt($ch, CURLOPT_COOKIEFILE, $path_cookie);

         //执行并获取HTML文档内容
      $result = curl_exec($ch);
      //释放curl句柄
      curl_close($ch);
      //打印获得的数据
      var_dump($result);die;
      // echo $result;
          $filename='呵呵'; //文件名
          file_put_contents($filename,$result);      
         // $date=date("Ymd-H:i:m");
         $date = $user['username'];
         Header( "Content-type:  application/octet-stream "); 
         Header( "Accept-Ranges:  bytes "); 
         Header( "Accept-Length: " .filesize($filename));
         header( "Content-Disposition:  attachment;  filename= {$date}.doc"); 
         readfile($filename); 

      }

      // HTML格式
      public function actionHtml()
      {
         echo 2;
      }
      public function actionDelivery(){
         $cookie = \Yii::$app->request->cookies;
         $name = $cookie->getValue('username');
         $user_id=Yii::$app->db->createCommand("select user_id from lg_user where username = '$name'")->queryOne();
         $id=$user_id['user_id'];
         $arr=Yii::$app->db->createCommand("select * from lg_getjob where user_id = '$id'")->queryAll();
         foreach($arr as $key =>$val){
          $date=Yii::$app->db->createCommand("select post,money,site,releases from lg_intro where id = ".$val['job_id'])->queryOne();
          $list[]=$date;
         }
           return $this->render('delivery',['list'=>$list,'arr'=>$arr]);
      }

      public function actionCollections(){
        $cookie = Yii::$app->request->cookies;
      $username = $cookie->getValue('username');
      $data = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();
       $user_id=$data['user_id'];
       $res=Yii::$app->db->createCommand("select job_id from lg_connections where user_id= '$user_id'")->queryAll();
       $date=array();
       foreach($res as $key =>$val){
         $a=Yii::$app->db->createCommand("select * from lg_intro where id = ".$val['job_id'])->queryOne();
         $date[]=$a;
       }
        return $this->render('collections',['res'=>$date]);
      }
      public function actionDellove(){
        $cookie = Yii::$app->request->cookies;
        $username = $cookie->getValue('username');
        $data = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();
        $user_id=$data['user_id'];
        $job_id=$_POST['id'];
        $res=Yii::$app->db->createCommand("delete from lg_connections where job_id ='$job_id' and user_id = '$user_id'")->execute();
        echo $res;
      }
      public function actionAddlove(){
        $cookie = Yii::$app->request->cookies;
        $username = $cookie->getValue('username');
        $data = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();
        $user_id=$data['user_id'];
        $job_id=$_POST['id'];
        $a=Yii::$app->db->createCommand("select * from lg_getjob where user_id= '$user_id' and job_id = '$job_id'")->queryOne();
        if($a){
          echo "0";die;
        }
        $res=Yii::$app->db->createCommand("insert into lg_getjob (user_id,job_id) values ('$user_id','$job_id')")->execute();
        echo $res;
      }
 }
?>