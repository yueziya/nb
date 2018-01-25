<?php
   namespace frontend\controllers;
   header('content-type:text/html;charset=utf-8');
   use yii;
   use yii\web\Controller;
   use yii\web\Cookie;
   use Helper;
   use frontend\models\UploadForm;
   use yii\web\UploadedFile;
   use yii\data\Pagination;
   use frontend\models\Lg_intro;
   use yii\data\ArrayDataProvider;
   use frontend\models\GetJobs;
   /**
    * 展示页面
    * @return [type] [description]
    */
   class IndexController extends Controller
   {
       public $enableCsrfValidation = false;
   	   public $layout = "newlayout";
   	   
       /**
        * 展示页面
        */
	   public function actionIndex()
     {
        $cookie = \Yii::$app->request->cookies;
        //判断一个Cookie是否存在
        if(!$cookie->has('username')){
            //直接返回Cookie的值
          return $this->redirect('?r=login/index');
        }
        
        $job = Yii::$app->db->createCommand("select * from lg_intro where status = 1 ORDER BY `host` desc LIMIT 15")->queryAll();
        $job1=Yii::$app->db->createCommand("select * from lg_intro where status = 1 ORDER BY `id` desc LIMIT 15")->queryAll();
        // var_dump($job['post']);die;

        if(!empty($_GET['city'])){
           // 轮播图片
         $file = Yii::$app->db->createCommand("select * from lg_lunbo where area='".$_GET['city']."'")->queryAll();
         // var_dump($file);die;
       }else{
          $file ="";
       }
       $time=date("Y-m-d H:i:s",time()-(7*3600*24));
       $son=date("Y-m-d H:i:s",time());
       // 无限分类
       $data = Yii::$app->db->createCommand('select * from lg_postion')->queryAll();
       // $data1= Yii::$app->db->createCommand("select *from lg_intro where  'release' between '$time' and '$son' order by 'release' desc")->queryAll();
       // var_dump($data1);die;
       $helper = new Helper();
        // $id = 22;
        $da = $helper->getsson($data);

        return $this->render('index',['data'=>$da,'file'=>$file,'job'=>$job,'job1'=>$job1]);
     }

     public function actionBo()
     {     
      $model = new UploadForm();

         // 判断是否有值 并且是否符合规则     && $model->validate()
          if (Yii::$app->request->isPost) {
            $model->file = UploadedFile::getInstances($model, 'file');
            //var_dump($model->file);die;
            if ($model->file) {
                foreach ($model->file as $file) {
                 // var_dump($file);die;
                  // $file->saveAs('uploads/' . $file->baseName . '.' . $file->extension);
                  $rand = rand(1000,9999);
                   $file->saveAs('uploads/' . $file->baseName .$rand. '.' . $file->extension);
                   $img_str[] = 'uploads/'.$file->baseName .$rand. '.' . $file->extension;
                }
                
                  $data = Yii::$app->request->post();
                // var_dump($_POST['UploadForm']);die;
                $_POST = $data['UploadForm'];
                // var_dump($_POST['area']);die;
                foreach($img_str as $v){
                  $res = Yii::$app->db->createCommand()->insert('lg_lunbo',['imgs'=>$v,'area'=>$_POST['area']])->execute();
                }
                 //判断是否上传成功
                if($res){
                  return $this->redirect('?r=index/bo');
                }
                return $this->goBack();
            }
        }
        else
        {
            return $this->render('lun', ['model' => $model]);
        }

        
      }

      /**
       *  职位搜索
       */
      public function actionSearch()
      { 
          
         // echo 1;die;
         $keyword = $_GET['keyword'];         
         
         // 定义一个恒成立
         $where = '1=1';
         if(!empty($keyword)){
            $where .= " and post like '%".$keyword."%'";
         }  

         if(isset($_GET['city'])){
             $city = $_GET['city'];

             if(!empty($city) && $city != '全国'){
               $where .= " and site like '%".$city."%'";
             }
          }      
             // 根据关键字查出相应的数据
             $connection = Yii::$app->db;
             $sql = "select * from lg_intro where $where";
            $command = $connection->createCommand($sql)->queryAll();

            $pages = new Pagination(['totalCount' => count($command),'defaultPageSize'=>1]);
            // var_dump($pages);die;
              $list = $connection->createCommand($sql." limit ".$pages->limit." offset ".$pages->offset."")->queryAll();
                              

         return $this->render('list',['list'=>$list,'pages' => $pages,'keyword'=>$keyword]);
      }

      

      /**
       *  查看详情
       */
      public function actionLook()
      {
         // 缓存MemCache
         $id = $_GET['id'];
         
         $mem = Yii::$app->cache->get($id);

         // 判断是否存在 
         if($mem){
             $data = $mem;
         }else{
           $data = Yii::$app->db->createCommand("select * from lg_intro where id=".$id)->queryOne();

           // 存入数据
           Yii::$app->cache->set($id,$data);
         }
          // 渲染页面
          return $this->render('jobdetail',['data'=>$data]);
      }
      public function actionGetjob(){
        $company_id=Yii::$app->request->get('company_id');
        $cookie = \Yii::$app->request->cookies;
         $name = $cookie->getValue('username');
         //var_dump($name);die;
        // var_dump($user_info);die;
        $user_id=Yii::$app->db->createCommand("select user_id from lg_user where username = '$name'")->queryOne();
        $id=$user_id['user_id'];
       // var_dump($id);die;
        $lg_project=Yii::$app->db->createCommand("select *from lg_projectexperience where user_id = '$id'")->queryOne();
        $lg_education=Yii::$app->db->createCommand("select *from lg_educationalbackground where user_id = '$id'")->queryOne();
        $lg_textarea=Yii::$app->db->createCommand("select *from lg_textarea where user_id = '$id'")->queryOne();
        $lg_worklink=Yii::$app->db->createCommand("select *from lg_worklink where user_id = '$id'")->queryOne();
        $lg_resume=Yii::$app->db->createCommand("select *from lg_resume where user_id = '$id'")->queryOne();
        $lg_experience=Yii::$app->db->createCommand("select *from lg_experience where user_id = '$id'")->queryOne();
        
        $arr=Yii::$app->db->createCommand("select *from lg_getjob where user_id = '$id' and job_id ='$company_id'")->queryAll();
        if($arr){
          echo "2";die;
        }

        if($lg_project && $lg_education && $lg_textarea && $lg_worklink && $lg_resume && $lg_experience){
          $res=Yii::$app->db->createCommand("insert into lg_getjob (user_id,job_id,status) values ('$id','$company_id','0')")->execute();
        echo "3";die;
        }
        echo "1";die;
      }
      public function actionAddlove(){
        //echo "1";
        $job_id=$_POST['id'];
        $cookie = Yii::$app->request->cookies;
        $username = $cookie->getValue('username');
        $data = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();
        $user_id=$data['user_id'];
        $res=Yii::$app->db->createCommand("select * from lg_connections where job_id ='$job_id' and user_id = '$user_id'")->queryOne();
        if($res){
          echo "0";die;
        }
        $ress=Yii::$app->db->createCommand("insert into lg_connections (job_id,user_id) values ('$job_id','$user_id')")->execute();
        var_dump($ress);
        
      }
   }
?>
