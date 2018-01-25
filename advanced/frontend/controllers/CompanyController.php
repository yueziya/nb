<?php 
  
  namespace frontend\controllers;
  header('content-type:text/html;charset=utf-8');
  use yii;
  use yii\web\controller;
  use yii\web\Cookie;
  use yii\web\Session;
  /**
  *  公司展示
  */
  class CompanyController extends Controller
  {
  	public $enableCsrfValidation = false;
  	public $layout = 'newlayout';
     
     // 展示公司
     public function actionIndex()
     {
        return $this->render('companylist');
     }

     /**
      *  我的公司主页
      */
     public function actionMyindex()
     {
         // 获取用户信息
         $cookie = Yii::$app->request->cookies;

         $username = $cookie->getValue('username');
         $data = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();

         // 判断此用户是否注册过公司
         $sql = "SELECT * FROM `lg_company` WHERE uid =".$data['user_id'];  
         $companyInfo = Yii::$app->db->createCommand($sql)->queryOne();
         if($companyInfo){
            //该用户已经有公司了
            return $this->render('company',['companyInfo'=>$companyInfo]);
          }else{
            //该用户没有注册公司
           return $this->render('no');
          }
     }

     /**
      *  公司注册首页1
      */
     public function actionIndex01()
     {
        // 判断是否post
        if(Yii::$app->request->isPost){

          // 获取数据
          $data = Yii::$app->request->post();
          // print_r($data);die;
          if(!empty($data['name'])){
            // echo 2;die;
            $file = $_FILES['file'];
            $path = "uploads/company/".$file['name'];
             // 
            $res = move_uploaded_file($_FILES['file']['tmp_name'],$path);
            if($res){
               // 先把数据存入session
                $session = Yii::$app->session;
                $data['logo'] = $path;          
                $session['index01'] = $data;
                $this->redirect(['company/tag']);
            } 

          }else{
            echo "<script>alert('请填写基本信息')</script>";
             return $this->render('index01');
          }

         
        }else{

          return $this->render('index01');
        }
     }

     /**
     * 注册标签2
     */
    public function actionTag()
    {
         // 判断是否post
        if(Yii::$app->request->post()){
          $labels = Yii::$app->request->post();
                $session = Yii::$app->session;
              //print_r($labels);die;
                $session['index02'] = $labels;
                echo 1;
        }else{

          return $this->render('tag');
        }
    }

      /**
       * 创始团队3
       */
      public function actionIndex04()
      {
         // 判断是否post
        if(Yii::$app->request->post()){
              //获取post数据
                $form_data = Yii::$app->request->post();
                // var_dump($form_data);die;
                //文件上传
                $user_file = $_FILES['user_file'];
                //定义一个文件上传路径
                $path = "uploads/founder/".$user_file['name'];
              //将临时文件上传到根目录
               // print_r($user_file);die;
               $res = move_uploaded_file($_FILES['user_file']['tmp_name'],$path);
               if($res){
                 $form_data['user_file'] = $path;
                  $session = Yii::$app->session;

                  $session['index03'] = $form_data;
                  //$this->layout = 'header';
                  $this->redirect(['company/index02']);
               }
             
        }else{

          return $this->render('founder');
        }
      }


    /**
     * 公司产品4
     */
    public function actionIndex02()
    {
       // 判断是否post
      if(Yii::$app->request->post()){
            //获取post数据
              $form_data = Yii::$app->request->post();
              
              //文件上传
              $user_file = $_FILES['product_file'];
              //定义一个文件上传路径
              $path = "uploads/product/".$user_file['name'];
            //将临时文件上传到根目录
            //print_r($img_info['tmp_name']);die;
             $res = move_uploaded_file($_FILES['product_file']['tmp_name'],$path);
             if($res){
              $form_data['product_file'] = $path;
              $session = Yii::$app->session;

              $session['index04'] = $form_data;

             $this->redirect(['company/index03']);
             }
            
        
            }else{

        return $this->render('index02');
      }
    }

    /**
     * 公司介绍5
     */
    public function actionIndex03()
    {

      if(Yii::$app->request->post()){
         //获取post数据
              $form_data = Yii::$app->request->post();

                // 获取用户信息
             $cookie = Yii::$app->request->cookies;

             $username = $cookie->getValue('username');
             $data = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();
             // var_dump($data['user_id']);die;
             
              $session = Yii::$app->session;
              $form_data['uid'] = $data['user_id'];
              $session['index05'] = $form_data;
             
            
              //die;
              $a = $session['index01'];
              $b = $session['index02'];
              $c = $session['index03'];
              $d = $session['index04'];
              $e = $session['index05'];
              // var_dump($e);die;
              $data = array_merge($a,$b,$c,$d,$e);
              // var_dump($data);die;
              $res = Yii::$app->db->createCommand()->insert("lg_company",$data)->execute();

              if($res){
                 return $this->redirect('?r=company/myindex');
              }
        
            }else{

              return $this->render('index03');
           }
    }

  	/**
  	 *  发布职位
  	 */
  	public function actionCreate()
  	{  
       //  获取 用户id
        $cookie = \Yii::$app->request->cookies;
        //判断一个Cookie是否存在
        if($cookie->has('username')){
            //直接返回Cookie的值
          $username = $cookie->getValue('username');
          // 获取用户id
          $user = Yii::$app->db->createCommand("select user_id from lg_user where username='$username'")->queryOne();

        }
  		if(Yii::$app->request->isPost){
        // echo 1;die;
  			$data = Yii::$app->request->post();
  			$money = $data['salaryMin'].'k-'.$data['salaryMax'].'k';
  			// print_r($data);die;
	  		$res = Yii::$app->db->createCommand()->insert('lg_intro',[  
	  			'user_id' => $user['user_id'],
			    'post' => $data['positionName'],
          'site' => $data['workAddress'],
	             'money' => $money,
	             'year' => $data['workYear'],
	             'study' => $data['education'],
               'releases' => date('Y-m-d H:i:s'),
	             'develop' => $data['positionAdvantage'],
	             'working_address' => $data['positionAddress'],
	             'work_nature' => $data['jobNature'],
			])->execute();
			if($res){
         $id = Yii::$app->db->getLastInsertID();
				 return $this->render('success',['id'=>$id]);
			}
  		}else{

        // 查询判断是否已注册过公司
          $info = Yii::$app->db->createCommand("select * from lg_company where uid=".$user['user_id'])->queryAll();
        if($info){
          return $this->render('create');
        }else{
         //该用户没有注册公司
           return $this->render('no');
        }
  			
  		}
  		
  	}

  	/**
  	 *  成功
  	 */
  	public function actionSuccess()
  	{
  		return $this->render('success');
  	}

    public function actionCaninter(){
      static $arr=array();
      $cookie = Yii::$app->request->cookies;
      $username = $cookie->getValue('username');
      $data = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();
       $id=$data['user_id'];
       // $c_id=Yii::$app->db->createCommand("select c_id from lg_company where uid= ".$id)->queryOne();
       $job_id=Yii::$app->db->createCommand("select * from lg_intro where user_id= ".$id)->queryAll();
       foreach($job_id as $key =>$val){
        $user_id=Yii::$app->db->createCommand("select user_id from lg_getjob where job_id= ".$val['id']." and status = 0")->queryAll();
        
         foreach($user_id as $k =>$v){
              $aa=Yii::$app->db->createCommand("select *from lg_resume where user_id= ".$v['user_id'])->queryOne();
              $arr[]=$aa;

         }
       }
       //var_dump($job_id);die;
      return $this->render('caninter',['arr'=>$arr,'job_id'=>$job_id]);
    }

    public function actionCaninterone(){
      $cookie = Yii::$app->request->cookies;
      $username = $cookie->getValue('username');
      $data = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();
       $id=$data['user_id'];
       // $c_id=Yii::$app->db->createCommand("select c_id from lg_company where uid= ".$id)->queryOne();
       $job_id=Yii::$app->db->createCommand("select * from lg_intro where user_id= ".$id)->queryAll();
       foreach($job_id as $key =>$val){
        $user_id=Yii::$app->db->createCommand("select user_id from lg_getjob where job_id= ".$val['id']." and status = 1")->queryAll();
        $arr=array();
         foreach($user_id as $k =>$v){
              $aa=Yii::$app->db->createCommand("select *from lg_resume where user_id= ".$v['user_id'])->queryOne();
              $arr[]=$aa;

         }
       }
       //var_dump($job_id);die;
      return $this->render('caninterone',['arr'=>$arr,'job_id'=>$job_id]);
    }
    public function actionCanintertwo(){
      $cookie = Yii::$app->request->cookies;
      $username = $cookie->getValue('username');
      $data = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();
       $id=$data['user_id'];
       // $c_id=Yii::$app->db->createCommand("select c_id from lg_company where uid= ".$id)->queryOne();
       $job_id=Yii::$app->db->createCommand("select * from lg_intro where user_id= ".$id)->queryAll();
       foreach($job_id as $key =>$val){
        $user_id=Yii::$app->db->createCommand("select user_id from lg_getjob where job_id= ".$val['id']." and status = 2")->queryAll();
        $arr=array();
         foreach($user_id as $k =>$v){
              $aa=Yii::$app->db->createCommand("select *from lg_resume where user_id= ".$v['user_id'])->queryOne();
              $arr[]=$aa;

         }
       }
       //var_dump($job_id);die;
      return $this->render('canintertwo',['arr'=>$arr,'job_id'=>$job_id]);
    }

    public function actionUpdajob(){
      $user_id=$_POST['user_id'];
      $job_id=$_POST['job_id'];
      $aa=Yii::$app->db->createCommand("update lg_getjob set status = 1 where user_id = ".$user_id."  and  job_id = ".$job_id)->execute();
      echo $aa;

    }

    public function actionUpdajobs(){
      $user_id=$_POST['user_id'];
      $job_id=$_POST['job_id'];
      $aa=Yii::$app->db->createCommand("update lg_getjob set status = 2 where user_id = ".$user_id."  and  job_id = ".$job_id)->execute();
      echo $aa;

    }

    public function actionPositions(){
      $cookie = Yii::$app->request->cookies;
      $username = $cookie->getValue('username');
      $data = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();
       $id=$data['user_id'];
       // $c_id=Yii::$app->db->createCommand("select c_id from lg_company where uid= ".$id)->queryOne();
       $job_id=Yii::$app->db->createCommand("select *from lg_intro where user_id= ".$id." and status = 1")->queryAll();
       //var_dump($job_id);die;
      return $this->render('positions',['job'=>$job_id]);
    }
    public function actionPositionsthree(){
      $cookie = Yii::$app->request->cookies;
      $username = $cookie->getValue('username');
      $data = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();
       $id=$data['user_id'];
       // $c_id=Yii::$app->db->createCommand("select c_id from lg_company where uid= ".$id)->queryOne();
       $job_id=Yii::$app->db->createCommand("select *from lg_intro where user_id= ".$id)->queryAll();
       //var_dump($job_id);die;
      return $this->render('positionsthree',['job'=>$job_id]);
    }
    public function actionPositionstwo(){
      $cookie = Yii::$app->request->cookies;
      $username = $cookie->getValue('username');
      $data = Yii::$app->db->createCommand("select * from lg_user where username='".$username."'")->queryOne();
       $id=$data['user_id'];
       // $c_id=Yii::$app->db->createCommand("select c_id from lg_company where uid= ".$id)->queryOne();
       $job_id=Yii::$app->db->createCommand("select *from lg_intro where user_id= ".$id." and status = 0")->queryAll();
       //var_dump($job_id);die;
      return $this->render('positionstwo',['job'=>$job_id]);
    }
    public function actionUpdastatus(){
      $id=$_POST['id'];
      if($_POST['status']==1){
      $res=Yii::$app->db->createCommand("update lg_intro set status = 0 where id =".$id)->execute();
        }
        if($_POST['status']==0){
      $res=Yii::$app->db->createCommand("update lg_intro set status = 1 where id =".$id)->execute();
        }
      if($res){
        echo "1";
      }else{
        echo "0";
      }
    }
    public function actionDelstatus(){
      $id=$_POST['id'];
      $res=Yii::$app->db->createCommand("update lg_intro set status = 2 where id =".$id)->execute();
      if($res){
        echo "1";
      }else{
        echo "0";
      }
    }
  }
?>