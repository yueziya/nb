
<?php 
   
   /**
   *  curl分装
   */
   class Curl
   {
   	
   	  //获取数据
		public function get_content($url){
			
			return $this->_curl_init($url, 1);	
		}

		//初始化信息
		public function _curl_init($url, $return = 0){
             
			$ch = curl_init();

			//设置url
			curl_setopt($ch, CURLOPT_URL, $url);

			//设置是否抛出浏览器
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, $return);

			//设置浏览器头信息
			curl_setopt($ch,CURLOPT_HEADER,0);

			//伪装头信息
			curl_setopt($ch,CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);

			//执行并且获取返回结果
			$data = curl_exec($ch);
            var_dump($data);die;
			if($return) return $data;
		}

		//get获取数据
		function c_get($url, $data = array()){


			$ch = curl_init();

			//设置url
			curl_setopt($ch, CURLOPT_URL, $url);

			//设置是否抛出浏览器
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

			//设置浏览器头信息
			curl_setopt($ch,CURLOPT_HEADER,0);

			//伪装头信息
			curl_setopt($ch,CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);

			//执行并且获取返回结果
			return $data = curl_exec($ch);
		}

		public static function c_post($url = '', $data = ''){
			// var_dump($url);die;
			$curlobj = curl_init(); //初始化
			//获取URL地址
			curl_setopt($curlobj,CURLOPT_URL,$url);
			curl_setopt($curlobj, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检查
			//启用时会将头文件的信息作为数据流输出
			curl_setopt($curlobj,CURLOPT_HEADER,0);//不直接输出
			curl_setopt($curlobj,CURLOPT_RETURNTRANSFER,1);
			//在HTTP请求中包含一个"User-Agent: "头的字符串
			curl_setopt($curlobj,CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);//指定POST方式传值
			curl_setopt($curlobj,CURLOPT_POST,1);
			curl_setopt($curlobj,CURLOPT_POSTFIELDS,$data);
			//设置 HTTP 头字段的数组
			$str = curl_exec($curlobj); //执行
			curl_close($curlobj); //执行完毕释放curl
			// var_dump($str);die;
			return $str;
		}
        
        function http_post_upload($url, $data)
        {
        	// 初始一个会话
        	$ch = curl_init();
            // 设置curl参数
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        	curl_setopt($ch, CURLOPT_POST, 1);
        	// curl_setopt($ch, CURLOPT_SAFE_UPLOAD, true);
        	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
             // 执行
             $a = curl_exec($ch);
             curl_close($ch);
             return $a;
        }

		function get_img($url){

			$data = _curl_init($url);

			$filename = date('YmdHis').rand(1111,9999).'.jpg';

			$tp = @fopen('./images/'.$filename, 'a');
			fwrite($tp, $data);
			fclose($tp);
		}


		// curl_setopt(CH, CURLOPT_POST, 1);
		// curl_setopt(CH, CURLOPT_POSTFIELDS, $data);
   }
 ?>